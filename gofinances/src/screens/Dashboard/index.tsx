import { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
} from './styles'

import { HighlightCard } from '../../components/HighlightCard'
import {
  TransactionCard,
  TransactionCardProps,
} from '../../components/TransactionCard'

export interface DataListProps extends TransactionCardProps {
  id: string
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([])

  const loadStorageData = useCallback(async () => {
    const storageKey = '@gofinances:transactions'

    const response = await AsyncStorage.getItem(storageKey)

    const transactions = response ? JSON.parse(response) : []

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        const amount = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(Number(item.amount))

        const date = new Date(item.date)
        const dateFormatted = date.toLocaleDateString('pt-BR')

        return {
          id: item.id,
          name: item.name,
          category: item.category,
          type: item.type,
          amount,
          date: dateFormatted,
        }
      }
    )

    console.log(transactionsFormatted)

    setData(transactionsFormatted)
  }, [])

  useEffect(() => {
    loadStorageData()
  }, [])

  useFocusEffect(
    useCallback(() => {
      loadStorageData()
    }, [])
  )

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: 'https://avatars.githubusercontent.com/u/65026455?v=4',
              }}
            />

            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Renato</UserName>
            </User>
          </UserInfo>

          <LogoutButton>
            <Icon name='power' />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          title='Entradas'
          amount='R$ 17.400,00'
          lastTransaction='Última entrada dia 13 de abril'
          type='up'
        />
        <HighlightCard
          title='Saídas'
          amount='R$ 1.259,00'
          lastTransaction='Última entrada dia 03 de abril'
          type='down'
        />
        <HighlightCard
          title='Entradas'
          amount='R$ 16.141,00'
          lastTransaction='01 à 16 de abril'
          type='total'
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
          ListEmptyComponent={() => <Title>Não há transações ainda</Title>}
        />
      </Transactions>
    </Container>
  )
}
