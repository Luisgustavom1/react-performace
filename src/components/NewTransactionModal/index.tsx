import * as Dialog from '@radix-ui/react-dialog'
import * as z from 'zod'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as TransactionActions from '../../reducers/transactions/actions'
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import { TransactionContext } from '../../context/TransactionsContext'
import { dispatchTransactionsAsyncReducer } from '../../reducers/transactions/transactions'
import { useContextSelector } from 'use-context-selector'

const newTransactionModalForm = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionModalForm = z.infer<typeof newTransactionModalForm>

export const NewTransactionModal = () => {
  const { transactions, dispatch } = useContextSelector(
    TransactionContext,
    (context) => {
      return {
        transactions: context.transactions,
        dispatch: context.dispatch,
      }
    },
  )
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
    reset,
  } = useForm<NewTransactionModalForm>({
    resolver: zodResolver(newTransactionModalForm),
  })

  const handleCreateNewTransaction = async (data: NewTransactionModalForm) => {
    await dispatchTransactionsAsyncReducer(
      { transactions },
      TransactionActions.createNewTransactionAction({
        ...data,
        created_at: new Date().toISOString(),
      }),
      dispatch,
    )

    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form action="" onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            {...register('description')}
            type="text"
            placeholder="Descrição"
            name="description"
            required
          />
          <input
            {...register('price', { valueAsNumber: true })}
            type="text"
            placeholder="Preço"
            name="price"
            required
          />
          <input
            {...register('category')}
            type="text"
            placeholder="Categoria"
            name="category"
            required
          />

          <Controller
            name="type"
            control={control}
            render={(props) => (
              <TransactionType
                onValueChange={props.field.onChange}
                value={props.field.value}
              >
                <TransactionTypeButton variant="income" value="income">
                  <ArrowCircleUp size={24} />
                  Entrada
                </TransactionTypeButton>

                <TransactionTypeButton variant="outcome" value="outcome">
                  <ArrowCircleDown size={24} />
                  Saída
                </TransactionTypeButton>
              </TransactionType>
            )}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>

        <Dialog.Description />
      </Content>
    </Dialog.Portal>
  )
}
