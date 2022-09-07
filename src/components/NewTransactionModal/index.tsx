import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from "./styles";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const newTransactionModalForm = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(["income", "outcome"]),
});

type NewTransactionModalForm = z.infer<typeof newTransactionModalForm>;

export const NewTransactionModal = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm<NewTransactionModalForm>({
    resolver: zodResolver(newTransactionModalForm),
  });

  const handleCreateNewTransaction = async (data: NewTransactionModalForm) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("query", data);
    return;
  };

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
            {...register("description")}
            type="text"
            placeholder="Descrição"
            name="description"
            required
          />
          <input
            {...register("price", { valueAsNumber: true })}
            type="text"
            placeholder="Preço"
            name="price"
            required
          />
          <input
            {...register("category")}
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
  );
};
