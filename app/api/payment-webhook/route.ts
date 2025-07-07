import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/db";
import type { Prisma } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const token = body.token;
    const amount = body.amount;
    const paymentStatus = body.status;


    if (!token) {
      return NextResponse.json(
        { message: "Token is missing" },
        { status: 400 }
      );
    }

    if (paymentStatus === "failure") {
      await prisma.onRampTransaction.update({
        where: { token },
        data: { status: "Failure" },
      });
      return NextResponse.json({ message: "Transaction failed" }, { status: 200 }); 
    }

    const existingTx = await prisma.onRampTransaction.findFirst({
      where: { token },
    });

    if (!existingTx) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }

    if (existingTx.status.toLowerCase() === "success") {
      return NextResponse.json(
        { message: "Transaction already processed" },
        { status: 200 }
      );
    }

    const userId = existingTx.userId;


    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Lock the balance row
      await tx.$queryRaw`
        SELECT * FROM "Balance"
        WHERE "userId" = ${Number(userId)}
        FOR UPDATE
      `;

      // Upsert balance
      await tx.balance.upsert({
        where: { userId: Number(userId) },
        update: {
          amount: {
            increment: Number(amount),
          },
        },
        create: {
          userId: Number(userId),
          amount: Number(amount),
          locked: 0,
        },
      });

      // Mark transaction as success
      await tx.onRampTransaction.update({
        where: { id: existingTx.id },
        data: { status: "Success" },
      });
    });

    return NextResponse.json({ message: "Captured" }, { status: 200 });

  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
