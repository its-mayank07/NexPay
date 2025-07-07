"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "../db";


async function createOnrampTransaction(amount : number,provider : string) {
    const session = await getServerSession(authOptions);

    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }
    // Since we are creating a transaction, we need to ensure that the user is authenticated and has a valid session
    const token = (Math.random()*1000).toString();
    const userId = session.user.id;
    await prisma.onRampTransaction.create({
        data : {
            userId: Number(userId),
            amount: amount,
            provider : provider,
            status : "Processing",
            token : token,
            startTime : new Date()

        }
    });
    return {
        message : "Transaction added successfully",
        data : {
        token : token,
        amount : amount,
        provider : provider,
        status : "Processing",
        startTime : new Date()
        }

    }
}

export default createOnrampTransaction;