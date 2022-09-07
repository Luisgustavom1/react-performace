import { ITransaction, ITransactionsReducer } from "./transactions"

export enum ActionTypes {
  SET_TRANSACTIONS_ACTION = 'SET_TRANSACTIONS_ACTION',
  LOAD_ALL_TRANSACTIONS = 'LOAD_ALL_TRANSACTIONS',
  RESET = 'RESET'
}

export const setTransactionsAction = (transactions: ITransaction[]): ITransactionsReducer => {
  return {
    type: ActionTypes.SET_TRANSACTIONS_ACTION,
    payload: {
      transactions
    }
  }
}

export const loadTransactionsAction = (q?: string): ITransactionsReducer => {
  return {
    type: ActionTypes.LOAD_ALL_TRANSACTIONS,
    payload: {
      searchParams: q
    }
  }
}

export const resetTransactionsAction = (initialState: ITransaction[]) => {
  return {
    type: ActionTypes.RESET,
    payload: {
      transactions: initialState
    }
  }
}