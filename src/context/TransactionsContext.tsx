import React, { createContext, useEffect } from "react";
import * as TransactionsActions from "../reducers/transactions/actions";
import {
  ITransaction,
  transactionsReducer,
} from "../reducers/transactions/transactions";

interface ITransactionContextData {
  transactions: ITransaction[];
}

export const TransactionContext = createContext({} as ITransactionContextData);

const TransactionProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [transactionsState, dispatch] = React.useReducer(transactionsReducer, {
    transactions: [],
  });

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3333/transactions");
      const data: ITransaction[] = await response.json();

      dispatch(TransactionsActions.setTransactionsAction(data));
    })();
  }, []);

  return (
    <TransactionContext.Provider
      value={{ transactions: transactionsState.transactions }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
