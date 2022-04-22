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

import { useAuth } from '../../hooks/auth'

export interface TransactionsProps extends TransactionCardProps {
  id: string
}

interface HighlightCardProps {
  total: number
  lastTransaction: string
}

interface HighlightCardData {
  entries: HighlightCardProps
  outputs: HighlightCardProps
}

export function Dashboard() {
  const { user, signOut } = useAuth()

  const [transactions, setTransactions] = useState<TransactionsProps[]>([])
  const [highlightCardData, setHighlightCardData] = useState<HighlightCardData>(
    {} as HighlightCardData
  )

  function formattedDate(
    transactions: TransactionsProps[],
    type: 'up' | 'down'
  ) {
    if (transactions.length === 0) {
      return ''
    } else {
      const transactionsFiltered: any = transactions
        .filter((transaction) => transaction.type === type)
        .slice(-1)
        .pop()?.date

      return new Date(transactionsFiltered).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    }
  }

  const loadStorageData = useCallback(async () => {
    const storageKey = `@gofinances:transactions_user:${user.id}`
    const response = await AsyncStorage.getItem(storageKey)
    const transactions = response ? JSON.parse(response) : []

    let totalEntries = 0
    let totalOutputs = 0

    const transactionsFormatted: TransactionsProps[] = transactions.map(
      (item: TransactionsProps) => {
        if (item.type === 'up') {
          totalEntries += Number(item.amount)
        } else {
          totalOutputs += Number(item.amount)
        }

        const date = new Date(item.date)
        const dateFormatted = date.toLocaleDateString('pt-BR')

        return {
          id: item.id,
          name: item.name,
          category: item.category,
          type: item.type,
          amount: item.amount,
          date: dateFormatted,
        }
      }
    )

    const lastTransactionEntriesDate = formattedDate(transactions, 'up')

    const lastTransactionOutputsDate = formattedDate(transactions, 'down')

    setTransactions(transactionsFormatted)
    setHighlightCardData({
      entries: {
        total: totalEntries,
        lastTransaction: lastTransactionEntriesDate,
      },
      outputs: {
        total: totalOutputs,
        lastTransaction: lastTransactionOutputsDate,
      },
    })
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
                uri: user.photo,
              }}
            />

            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>{user.name}</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={signOut}>
            <Icon name='power' />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          title='Entradas'
          amount={highlightCardData?.entries?.total}
          lastTransaction={
            highlightCardData?.entries?.lastTransaction
              ? `Última entrada dia ${highlightCardData?.entries?.lastTransaction}`
              : 'Não há transações'
          }
          type='up'
        />
        <HighlightCard
          title='Saídas'
          amount={highlightCardData?.outputs?.total}
          lastTransaction={
            highlightCardData?.outputs?.lastTransaction
              ? `Última saída dia ${highlightCardData?.outputs?.lastTransaction}`
              : 'Não há transações'
          }
          type='down'
        />
        <HighlightCard
          title='Entradas'
          amount={
            highlightCardData?.entries?.total -
            highlightCardData?.outputs?.total
          }
          lastTransaction={
            highlightCardData?.outputs?.lastTransaction
              ? `01 à ${highlightCardData?.outputs?.lastTransaction}`
              : 'Não há transações'
          }
          type='total'
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={transactions?.reverse()}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
          ListEmptyComponent={() => <Title>Não há transações ainda</Title>}
        />
      </Transactions>
    </Container>
  )
}
