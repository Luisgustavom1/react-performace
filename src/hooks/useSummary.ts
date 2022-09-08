import { useMemo } from 'react'
import { useContextSelector } from 'use-context-selector'
import { TransactionContext } from '../context/TransactionsContext'

export const useSummary = () => {
  const transactions = useContextSelector(
    TransactionContext,
    ({ transactions }) => transactions,
  )
  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, current) => {
        if (current.type === 'income') {
          acc.income += current.price
          acc.total += current.price
          return acc
        }
        acc.outcome += current.price
        acc.total -= current.price

        return acc
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )
  }, [transactions])
  return summary
}
