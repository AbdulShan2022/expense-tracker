"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface TransactionData {
  text: string;
  amount: number;
}
interface TransationResult {
  data?: TransactionData;
  error?: string;
}

async function addTransation(formData: FormData): Promise<TransationResult> {
  const textValue = formData.get('text');
  const amountValue = formData.get('amount');
  const typeValue = formData.get('type');

  // Get logged in user
  const { userId } = auth();

  // Check for user
  if (!userId) {
    return { error: "User not found" };
  }

  // check for text and amount
  if (!textValue || textValue === '' || !amountValue) {
    return { error: 'Text or amount is missing' };
  }

  const text: string = textValue.toString(); // Ensure text is a string
  const amount: number = typeValue === 'expense' ? -parseFloat(amountValue.toString()) : parseFloat(amountValue.toString()); // Parse amount as number
  try {
    const transactionData: TransactionData = await db.transaction.create({
      data: { text, amount, userId },
    });

    revalidatePath("/");
    return { data: transactionData };
  } catch (error) {
    return { error: 'Transaction failed' };
  }
  // await db.transaction.create({ data: transactionData })
}

export default addTransation;
