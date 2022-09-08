import React, { useEffect } from 'react'
import { createContext } from 'use-context-selector'
import * as TransactionsActions from '../reducers/transactions/actions'
import { ICreateTransactionInput } from '../reducers/transactions/actions'
import {
  dispatchTransactionsAsyncReducer,
  ITransaction,
  transactionsReducer,
} from '../reducers/transactions/transactions'

interface ITransactionContextData {
  transactions: ITransaction[]
  createNewTransaction: (data: ICreateTransactionInput) => Promise<void>
  loadAllTransactions: (search: string) => Promise<void>
}

export const TransactionContext = createContext({} as ITransactionContextData)

const TransactionProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [transactionsState, dispatch] = React.useReducer(transactionsReducer, {
    transactions: [],
  })

  const loadAllTransactions = async (search?: string) => {
    return dispatchTransactionsAsyncReducer(
      transactionsState,
      TransactionsActions.loadTransactionsAction(search),
      dispatch,
    )
  }

  const createNewTransaction = async (data: ICreateTransactionInput) => {
    return dispatchTransactionsAsyncReducer(
      transactionsState,
      TransactionsActions.createNewTransactionAction(data),
      dispatch,
    )
  }

  useEffect(() => {
    loadAllTransactions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <TransactionContext.Provider
      value={{
        transactions: transactionsState.transactions,
        loadAllTransactions,
        createNewTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export default TransactionProvider
