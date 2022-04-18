import { useEffect, useState } from 'react'
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles'

import { Button } from '../../components/Forms/Button'
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton'
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton'
import { CategorySelect } from '../CategorySelect'
import { InputForm } from '../../components/Forms/InputForm'
import { useNavigation } from '@react-navigation/native'

interface FormData {
  [name: string]: any
}

interface NavigationProps {
  navigate: (screen: string) => void
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('Preço é obrigatório'),
})

const initialCategoryValues = {
  key: 'category',
  name: 'Categoria',
}

export function Register() {
  const navigation = useNavigation<NavigationProps>()

  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [category, setCategory] = useState(initialCategoryValues)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
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

  // useEffect(() => {
  //   ;(async function removeStorage() {
  //     const storageKey = '@gofinances:transactions'

  //     const data = await AsyncStorage.getItem(storageKey)

  //     console.log('before -->>', data)

  //     await AsyncStorage.removeItem(storageKey)

  //     console.log('after -->>', data)
  //   })()
  // }, [])

  async function handleRegister(form: FormData) {
    if (!transactionType) Alert.alert('Selecione o tipo da transação')

    if (category.key === 'category') Alert.alert('Selecione a categoria')

    const newTransaction = {
      id: Math.random().toString(16).slice(2),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    }

    const storageKey = '@gofinances:transactions'

    try {
      const data = await AsyncStorage.getItem(storageKey)

      const dataFormatted: FormData[] = data ? JSON.parse(data) : []

      const newData = [...dataFormatted, newTransaction]

      await AsyncStorage.setItem(storageKey, JSON.stringify(newData))

      reset()
      setTransactionType('')
      setCategory(initialCategoryValues)
      navigation.navigate('Listagem')
    } catch (error) {
      console.log(error)
      Alert.alert('Ups, houve um erro ao fazer o novo registro')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name='name'
              control={control}
              placeholder='Nome'
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors.name && errors.name?.message}
            />
            <InputForm
              name='amount'
              control={control}
              placeholder='Preço'
              keyboardType='numeric'
              error={errors.amount && errors.amount?.message}
            />

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

          <Button title='Enviar' onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCategorySelectModalClose}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}
