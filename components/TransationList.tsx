import getTransations from "@/app/actions/getTransations";
import { Transaction } from "@/types/Transaction";
import TransactionItem from "./TransactionItem";
const TransationList = async () => {
  const { transactions, error } = await getTransations();

  if (error) {
    return <p className="error">{error}</p>;
  }
  if (!transactions) {
    return <p>No transactions found</p>;
  }
  return (
    <>
      {transactions.length > 0 ? (
        <>
          <h3>Transation List</h3>
          <ul className="list">
            {transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </ul>
        </>
      ) : (
        <p>No transactions found</p>
      )}
    </>
  );
};

export default TransationList;
