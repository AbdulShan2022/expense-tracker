"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Transaction } from "@/types/Transaction";

interface BalanceResult {
  transactions?: Transaction[];
  error?: string;
}

async function getTransations(): Promise<BalanceResult> {
  const { userId } = auth();
  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return { transactions };
  } catch (error) {
    return { error: "Transaction failed" };
  }
}
export default getTransations;
