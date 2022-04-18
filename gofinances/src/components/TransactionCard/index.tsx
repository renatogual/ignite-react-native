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

import { categories } from '../../utils/categories'

interface Category {
  name: string
  icon: string
}

export interface TransactionCardProps {
  type: 'up' | 'down'
  name: string
  amount: string
  category: Category
  date: string
}

interface Props {
  data: TransactionCardProps
}

export function TransactionCard({ data }: Props) {
  const amount = data.type === 'down' ? `- ${data.amount}` : data.amount

  const category = categories.filter(
    (category) => String(category.key) === String(data.category)
  )[0]

  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.type}>{amount}</Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  )
}
