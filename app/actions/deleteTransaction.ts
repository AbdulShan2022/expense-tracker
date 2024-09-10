"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface BalanceResult {
  message?: string;
  error?: string;
}

async function deleteTransaction(transactionId: string): Promise<BalanceResult> {
  const { userId } = auth();
  if (!userId) {
    return { error: "User not found" };
  }

  try {
    await db.transaction.delete({
      where: {
        id: transactionId,
        userId,
      },
    })

    revalidatePath("/");
    return { message: "Transaction deleted successfully" };
  } catch (error) {
    return { error: "Transaction failed" };
  }
}
export default deleteTransaction;
