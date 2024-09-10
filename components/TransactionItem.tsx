"use client";
import { Transaction } from "@/types/Transaction";
import { addCommasToNumber } from "@/lib/utils";
import { toast } from "react-toastify";
import deleteTransaction from "@/app/actions/deleteTransaction";
import { Trash } from 'lucide-react';


const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const sign = transaction.amount < 0 ? "-" : "+";

  const handleDeleteTransaction = async (transactionId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );
    if (!confirmDelete) return;

    const { message, error } = await deleteTransaction(transactionId);
    if (error) {
      toast.error(error);
    }
    toast.success(message);
  };

  return (
    <li className={transaction.amount < 0 ? "minus" : "plus"}>
      <div className="list-item">
        <div className="list-item-text">
          <div>{transaction.text} </div>
          <div>
            {sign}${addCommasToNumber(Math.abs(transaction.amount))}
          </div>
        </div>
        <span className="date">
          {new Date(transaction.createdAt).toLocaleString()}
        </span>
      </div>
      <Trash className="delete-btn" onClick={() => handleDeleteTransaction(transaction.id)} />
      {/* <button
        onClick={() => handleDeleteTransaction(transaction.id)}
        className="delete-btn"
      >
        X
      </button> */}
    </li>
  );
};

export default TransactionItem;
