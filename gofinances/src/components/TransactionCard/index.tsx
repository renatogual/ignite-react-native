import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles'

interface Category {
  name: string
  icon: string
}

export interface TransactionCardProps {
  type: 'positive' | 'negative'
  title: string
  amount: string
  category: Category
  date: string
}

interface Props {
  data: TransactionCardProps
}

export function TransactionCard({ data }: Props) {
  const amountFormated =
    data.type === 'negative' ? `- ${data.amount}` : data.amount

  return (
    <Container>
      <Title>{data.title}</Title>
      <Amount type={data.type}>{amountFormated}</Amount>

      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  )
}