import React, { createContext, useCallback, useEffect } from "react";
import * as TransactionsActions from "../reducers/transactions/actions";
import {
  ITransaction,
  ITransactionsReducer,
  transactionsReducer,
} from "../reducers/transactions/transactions";

interface ITransactionContextData {
  transactions: ITransaction[];
  loadTransactions: (search: string) => Promise<void>;
}

export const TransactionContext = createContext({} as ITransactionContextData);

const TransactionProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [transactionsState, dispatch] = React.useReducer(transactionsReducer, {
    transactions: [],
  });

  const transactionsAsyncReducer = useCallback(
    async (action: ITransactionsReducer) => {
      switch (action.type) {
        case TransactionsActions.ActionTypes.LOAD_ALL_TRANSACTIONS:
          const url = new URL("http://localhost:3333/transactions");
          const searchParams = action.payload.searchParams;

          if (searchParams) {
            url.searchParams.append("q", searchParams);
          }
          
          const response = await fetch(url.href);
          const data: ITransaction[] = await response.json();

          return dispatch(TransactionsActions.setTransactionsAction(data));
        default:
          return dispatch(action);
      }
    },
    []
  );

  const loadTransactions = async (search?: string) => {
    await transactionsAsyncReducer(
      TransactionsActions.loadTransactionsAction(search)
    );
  };

  useEffect(() => {
    loadTransactions();
  }, []);
  return (
    <TransactionContext.Provider
      value={{
        transactions: transactionsState.transactions,
        loadTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
