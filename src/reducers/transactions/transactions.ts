import React from 'react'
import * as TransactionsActions from './actions'

export interface ITransaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  created_at: string
}

export interface ITransactionState {
  transactions: ITransaction[]
}

export interface ITransactionsReducer {
  type: TransactionsActions.ActionTypes
  payload: any
}

export const init = (initialState?: ITransaction[]): ITransactionState => {
  return {
    transactions: initialState || [],
  }
}

export const transactionsReducer = (
  state: ITransactionState,
  action: ITransactionsReducer,
): ITransactionState => {
  switch (action.type) {
    case TransactionsActions.ActionTypes.SET_TRANSACTIONS_ACTION:
      return {
        transactions: action.payload.transactions,
      }
    case TransactionsActions.ActionTypes.RESET:
      return init(action.payload)
    default:
      return state
  }
}

export const dispatchTransactionsAsyncReducer = async (
  state: ITransactionState,
  action: ITransactionsReducer,
  dispatch: React.Dispatch<ITransactionsReducer>,
) => {
  switch (action.type) {
    case TransactionsActions.ActionTypes.LOAD_ALL_TRANSACTIONS: {
      const url = new URL('http://localhost:3333/transactions')
      const searchParams = action.payload.searchParams

      if (searchParams) {
        url.searchParams.append('q', searchParams)
        url.searchParams.append('_sort', 'createdAt')
        url.searchParams.append('_order', 'desc')
      }

      const response = await fetch(url.href)
      const data: ITransaction[] = await response.json()

      return dispatch(TransactionsActions.setTransactionsAction(data))
    }
    case TransactionsActions.ActionTypes.CREATE_NEW_TRANSACTION: {
      const response = await fetch('http://localhost:3333/transactions', {
        method: 'POST',
        body: JSON.stringify(action.payload.newTransaction),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const newTransaction: ITransaction = await response.json()

      return dispatch(
        TransactionsActions.setTransactionsAction([
          ...state.transactions,
          newTransaction,
        ]),
      )
    }
    default:
      return dispatch(action)
  }
}
