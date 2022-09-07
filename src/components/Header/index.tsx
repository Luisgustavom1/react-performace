import * as Dialog from "@radix-ui/react-dialog";

import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import LogoImg from "../../assets/Logo.svg";
import { NewTransactionModal } from "../NewTransactionModal";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={LogoImg} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Novo transação</NewTransactionButton>
          </Dialog.Trigger>
          
          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
};
export default Header;
