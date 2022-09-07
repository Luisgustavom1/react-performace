import { useContext } from "react";
import { TransactionContext } from "../context/TransactionsContext";

export const useSummary = () => {
  const { transactions } = useContext(TransactionContext);
  const summary = transactions.reduce(
    (acc, current) => {
      if (current.type === "income") {
        acc.income += current.price;
        acc.total += current.price;
        return acc;
      }
      acc.outcome += current.price;
      acc.total -= current.price;

      return acc;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    }
  );
  return summary
}