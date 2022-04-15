import { FlatList } from 'react-native'
import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from './styles'

import { Button } from '../../components/Forms/Button'

import { categories } from '../../utils/categories'

interface Category {
  key: string
  name: string
}

interface Props {
  category: Category
  setCategory: (category: Category) => void
  closeSelectCategory: () => void
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: Props) {
  function handleSelectCategory(category: Category) {
    setCategory(category)
  }

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleSelectCategory(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button title='selecionar' onPress={closeSelectCategory} />
      </Footer>
    </Container>
  )
}
