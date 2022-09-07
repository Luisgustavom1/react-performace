import { ITransaction, ITransactionsReducer } from "./transactions"

export enum ActionTypes {
  SET_TRANSACTIONS_ACTION = 'SET_TRANSACTIONS_ACTION',
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

export const resetTransactionsAction = (initialState: ITransaction[]) => {
  return {
    type: ActionTypes.RESET,
    payload: {
      transactions: initialState
    }
  }
}