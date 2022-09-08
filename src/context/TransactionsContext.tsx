import React, { useEffect } from 'react'
import { createContext } from 'use-context-selector'
import * as TransactionsActions from '../reducers/transactions/actions'
import {
  dispatchTransactionsAsyncReducer,
  ITransaction,
  ITransactionsReducer,
  transactionsReducer,
} from '../reducers/transactions/transactions'

interface ITransactionContextData {
  transactions: ITransaction[]
  dispatch: React.Dispatch<ITransactionsReducer>
}

export const TransactionContext = createContext({} as ITransactionContextData)

const TransactionProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [transactionsState, dispatch] = React.useReducer(transactionsReducer, {
    transactions: [],
  })

  useEffect(() => {
    dispatchTransactionsAsyncReducer(
      transactionsState,
      TransactionsActions.loadTransactionsAction(),
      dispatch,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <TransactionContext.Provider
      value={{
        transactions: transactionsState.transactions,
        dispatch,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export default TransactionProvider
