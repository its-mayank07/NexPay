import express from "express";
import db from "@repo/db/client";
import { z } from "zod";

const app = express();
app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
  const webhookSchema = z.object({
    token: z.string(),
    user_identifier: z.string(),
    amount: z.string(),
  });

  const parseResult = webhookSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      message: "Invalid request body",
      errors: parseResult.error.errors,
    });
  }

  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  const existingTx = await db.onRampTransaction.findFirst({
    where: { token: paymentInformation.token },
  });

  if (!existingTx) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  if (existingTx.status.toLowerCase() === "success") {
    return res.status(200).json({ message: "Transaction already processed" });
  }

  try {
    await db.$transaction(async (tx) => {
      // Lock the user's balance
      await tx.$queryRaw`
        SELECT * FROM "Balance"
        WHERE "userId" = ${Number(paymentInformation.userId)}
        FOR UPDATE
      `;

      // ✅ Use upsert to create or update
      await tx.balance.upsert({
        where: { userId: Number(paymentInformation.userId) },
        update: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
        create: {
          userId: Number(paymentInformation.userId),
          amount: Number(paymentInformation.amount),
          locked: 0,
        },
      });

      // ✅ Mark the transaction as Success
      await tx.onRampTransaction.update({
        where: { id: existingTx.id },
        data: { status: "Success" },
      });
    });

    return res.json({ message: "Captured" });
  } catch (e) {
    console.error("Webhook processing error:", e);
    return res.status(500).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(3003);
