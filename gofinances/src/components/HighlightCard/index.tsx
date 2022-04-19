import {
  Container,
  Header,
  Title,
  Icon,
  Content,
  Amount,
  LastTransaction,
} from './styles'

interface Props {
  type: 'up' | 'down' | 'total'
  title: string
  amount: number
  lastTransaction: string
}

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
  total: 'dollar-sign',
}

export function HighlightCard({ type, title, amount, lastTransaction }: Props) {
  const amountFormatted = Number(amount).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>

      <Content>
        <Amount type={type}>{amountFormatted}</Amount>
        <LastTransaction type={type}>{lastTransaction}</LastTransaction>
      </Content>
    </Container>
  )
}
