import { ActionTypes } from "./actions";

export interface ITransaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  created_at: string;
}

interface ITransactionState {
  transactions: ITransaction[]
}

export interface ITransactionsReducer {
  type: ActionTypes
  payload: any
}

export const init = (initialState?: ITransaction[]): ITransactionState => {
  return {
    transactions: initialState || []
  }
}

export const transactionsReducer = (state: ITransactionState, action: ITransactionsReducer): ITransactionState => {
  switch (action.type) {
    case ActionTypes.SET_TRANSACTIONS_ACTION:
      return {
        transactions: action.payload.transactions
      }
    case ActionTypes.RESET:
      return init(action.payload)
    default: 
      return state
    }
}