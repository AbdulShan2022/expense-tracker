"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

interface BalanceResult {
  income?: number;
  expense?: number;
  error?: string;
}

async function getIncomeExpense(): Promise<BalanceResult> {
  const { userId } = auth();
  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
    });
    const amounts = transactions.map((transaction) => transaction.amount);
    const income = amounts
      .filter((amount) => amount > 0)
      .reduce((acc, amount) => acc + amount, 0);
    const expense = amounts
      .filter((amount) => amount < 0)
      .reduce((acc, amount) => acc + amount, 0);
    const balance = income - expense;

    return { income, expense: Math.abs(expense) };
  } catch (error) {
    return { error: "Transaction failed" };
  }
}
export default getIncomeExpense;
