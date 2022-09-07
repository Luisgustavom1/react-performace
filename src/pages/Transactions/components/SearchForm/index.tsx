import { useContext } from "react";
import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchFormContainer } from "./styles";
import * as TransictionsAction from '../../../../reducers/transactions/actions'
import { TransactionContext } from "../../../../context/TransactionsContext";

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export const SearchForm = () => {
  const { dispatchAsyncReducer } = useContext(TransactionContext);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  const handleSearchTransactions = async (data: SearchFormInputs) => {
    await dispatchAsyncReducer(TransictionsAction.loadTransactionsAction(data.query));

    return;
  };

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register("query")}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
};
