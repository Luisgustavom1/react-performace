import styled from "styled-components";

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1128px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  // margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${props => props.theme.colors['gray-700']};

    &:first-child {
      border-radius: 6px 0 0 6px;
    }

    &:last-child {
      border-radius: 0 6px 6px 0;
    }
  }
`

interface PriceHighLightProps {
  variant: 'income' | 'outcome';
} 

export const PriceHighLight = styled.span<PriceHighLightProps>`
  color: ${props => props.theme.colors[props.variant === 'income' ? 'green-300' : 'red-300']}
`;


