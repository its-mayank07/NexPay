"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "../db";


export async function p2pTransfer(to: string, amount: number) {
  try {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;

    if (!from) {
      return {
        message: "Authentication required",
        status: 401,
      };
    }

    const toUser = await prisma.user.findFirst({
      where: { number: to },
    });

    if (!toUser) {
      return {
        message: "Recipient not found",
        status: 404,
      };
    }

    if (Number(from) === toUser.id) {
      return {
        message: "Cannot transfer to yourself",
        status: 400,
      };
    }
    // Ensure balances exist
    await prisma.balance.upsert({
      where: { userId: Number(from) },
      update: {},
      create: { userId: Number(from), amount: 0, locked: 0 },
    });

    await prisma.balance.upsert({
      where: { userId: toUser.id },
      update: {},
      create: { userId: toUser.id, amount: 0, locked: 0 },
    });

    await prisma.$transaction(async (tx: any) => {
      await tx.$queryRaw`
        SELECT * FROM "Balance"
        WHERE "userId" IN (${Number(from)}, ${toUser.id})
        FOR UPDATE
      `;

      const fromBalance = await tx.balance.findUnique({
        where: { userId: Number(from) },
      });

      if (!fromBalance || fromBalance.amount < amount) {
        throw new Error("Insufficient funds");
      }

      await tx.balance.update({
        where: { userId: Number(from) },
        data: { amount: { decrement: amount } },
      });

      await tx.balance.update({
        where: { userId: toUser.id },
        data: { amount: { increment: amount } },
      });
      await tx.p2pTransfer.create({
        data: {
          fromUserId: Number(from),
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
  } catch (error: any) {
    console.error("Transfer failed:", error.message);
    return {
      message: error.message || "Something went wrong",
      status: 500,
    };
  }
}
