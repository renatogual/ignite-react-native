import { Container, Amount, Title } from './styles'

interface Props {
  name: string
  color: string
  total: number
}

export function HistoryCard({ name, color, total }: Props) {
  const totalFormatted = total.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <Container color={color}>
      <Title>{name}</Title>
      <Amount>{totalFormatted}</Amount>
    </Container>
  )
}
