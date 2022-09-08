import styled from 'styled-components'

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;

  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    background: ${(props) => props.theme.colors['gray-900']};
    color: ${(props) => props.theme.colors['gray-300']};
    padding: 1rem;

    &::placeholder {
      color: ${(props) => props.theme.colors['gray-500']};
    }
  }

  button {
    display: flex;
    align-item: center;
    gap: 0.75rem;

    border: 0;
    padding: 1rem;
    background: transparent;
    color: ${(props) => props.theme.colors['green-300']};
    border: 1px solid ${(props) => props.theme.colors['green-300']};
    font-weight: bold;
    border-radius: 4px;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: ${(props) => props.theme.colors['green-500']};
      border-color: ${(props) => props.theme.colors['green-500']};
      color: ${(props) => props.theme.colors.white};
      transition: all 0.2s;
    }
  }
`
