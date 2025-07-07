"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "../db";
import type { Prisma } from "@prisma/client";

export async function p2pTransfer(to: string, amount: number) {
  try {
    const session = await getServerSession(authOptions);
    // Use email as unique identifier since 'id' is not present on session.user
    const fromUserEmail = session?.user?.email;

    if (!fromUserEmail) {
      return {
        message: "Authentication required",
        status: 401,
      };
    }

    // Find recipient by phone number
    const toUser = await prisma.user.findFirst({
      where: { number: to },
    });

    if (!toUser) {
      return {
        message: "Recipient not found",
        status: 404,
      };
    }

    // Find sender by email
    const fromUser = await prisma.user.findUnique({
      where: { email: fromUserEmail },
    });

    if (!fromUser) {
      return {
        message: "Sender not found",
        status: 404,
      };
    }

    if (fromUser.id === toUser.id) {
      return {
        message: "Cannot transfer to yourself",
        status: 400,
      };
    }

    // Ensure balances exist for both users
    await prisma.balance.upsert({
      where: { userId: fromUser.id },
      update: {},
      create: { userId: fromUser.id, amount: 0, locked: 0 },
    });

    await prisma.balance.upsert({
      where: { userId: toUser.id },
      update: {},
      create: { userId: toUser.id, amount: 0, locked: 0 },
    });

    // Transaction: lock both balances, check funds, update balances, record transfer
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Lock both balances for update
      await tx.$queryRaw`
        SELECT * FROM "Balance"
        WHERE "userId" IN (${fromUser.id}, ${toUser.id})
        FOR UPDATE
      `;

      const fromBalance = await tx.balance.findUnique({
        where: { userId: fromUser.id },
      });

      if (!fromBalance || fromBalance.amount < amount) {
        throw new Error("Insufficient funds");
      }

      await tx.balance.update({
        where: { userId: fromUser.id },
        data: { amount: { decrement: amount } },
      });

      await tx.balance.update({
        where: { userId: toUser.id },
        data: { amount: { increment: amount } },
      });

      await tx.p2pTransfer.create({
        data: {
          fromUserId: fromUser.id,
          toUserId: toUser.id,
          amount: amount,
          timestamp: new Date(),
        },
      });
    });

    return {
      message: "Transfer successful",
      status: 200,
    };
  } catch (error) {
    const err = error as Error;
    console.error("Transfer failed:", err.message);
    return {
      message: err.message || "Something went wrong",
      status: 500,
    };
  }
}
