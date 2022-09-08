/* eslint-disable no-unused-vars */
import { ITransaction, ITransactionsReducer } from './transactions'

export enum ActionTypes {
  SET_TRANSACTIONS_ACTION = 'SET_TRANSACTIONS_ACTION',
  CREATE_NEW_TRANSACTION = 'CREATE_NEW_TRANSACTION',
  LOAD_ALL_TRANSACTIONS = 'LOAD_ALL_TRANSACTIONS',
  RESET = 'RESET',
}

export const setTransactionsAction = (
  transactions: ITransaction[],
): ITransactionsReducer => {
  return {
    type: ActionTypes.SET_TRANSACTIONS_ACTION,
    payload: {
      transactions,
    },
  }
}

interface ICreateTransactionInput {
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  created_at: string
}

export const createNewTransactionAction = (
  newTransactionData: ICreateTransactionInput,
): ITransactionsReducer => {
  return {
    type: ActionTypes.CREATE_NEW_TRANSACTION,
    payload: {
      newTransaction: newTransactionData,
    },
  }
}

export const loadTransactionsAction = (q?: string): ITransactionsReducer => {
  return {
    type: ActionTypes.LOAD_ALL_TRANSACTIONS,
    payload: {
      searchParams: q,
    },
  }
}

export const resetTransactionsAction = (initialState: ITransaction[]) => {
  return {
    type: ActionTypes.RESET,
    payload: {
      transactions: initialState,
    },
  }
}
