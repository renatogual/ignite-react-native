import { useState } from 'react'
import { Modal } from 'react-native'
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles'

import { Input } from '../../components/Forms/Input'
import { Button } from '../../components/Forms/Button'
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton'
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton'
import { CategorySelect } from '../CategorySelect'

export function Register() {
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type)
  }

  function handleCategorySelectModalOpen() {
    setCategoryModalOpen(true)
  }

  function handleCategorySelectModalClose() {
    setCategoryModalOpen(false)
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder='Nome' />
          <Input placeholder='Valor' />

          <TransactionsTypes>
            <TransactionTypeButton
              type='up'
              title='Income'
              onPress={() => handleTransactionTypeSelect('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton
              type='down'
              title='Outcome'
              onPress={() => handleTransactionTypeSelect('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionsTypes>

          <CategorySelectButton
            title={category.name}
            onPress={() => handleCategorySelectModalOpen()}
          />
        </Fields>

        <Button title='Enviar' />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCategorySelectModalClose}
        />
      </Modal>
    </Container>
  )
}
