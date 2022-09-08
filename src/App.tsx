import { ThemeProvider } from 'styled-components'
import TransactionProvider from './context/TransactionsContext'
import { Transactions } from './pages/Transactions'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/theme/default'

export function App() {
  return (
    <TransactionProvider>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />

        <Transactions />
      </ThemeProvider>
    </TransactionProvider>
  )
}
