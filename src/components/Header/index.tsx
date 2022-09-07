import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";

import LogoImg from "../../assets/Logo.svg";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={LogoImg} alt="" />

        <NewTransactionButton>Novo transação</NewTransactionButton>
      </HeaderContent>
    </HeaderContainer>
  );
};
export default Header;
