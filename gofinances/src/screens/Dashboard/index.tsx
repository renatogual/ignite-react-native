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
  const [transactions, setTransactions] = useState<TransactionsProps[]>([])
  const [highlightCardData, setHighlightCardData] = useState<HighlightCardData>(
    {} as HighlightCardData
  )

  const loadStorageData = useCallback(async () => {
    const storageKey = '@gofinances:transactions'
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

    const lastTransactionEntriesDate = new Date(
      transactions
        .filter((transaction: TransactionsProps) => transaction.type === 'up')
        .slice(-1)
        .pop()?.date
    ).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })

    const lastTransactionOutputsDate = new Date(
      transactions
        .filter((transaction: TransactionsProps) => transaction.type === 'down')
        .slice(-1)
        .pop()?.date
    ).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })

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
          amount={highlightCardData?.entries?.total}
          lastTransaction={`Última entrada dia ${highlightCardData?.entries?.lastTransaction}`}
          type='up'
        />
        <HighlightCard
          title='Saídas'
          amount={highlightCardData?.outputs?.total}
          lastTransaction={`Última saída dia ${highlightCardData?.outputs?.lastTransaction}`}
          type='down'
        />
        <HighlightCard
          title='Entradas'
          amount={
            highlightCardData?.entries?.total -
            highlightCardData?.outputs?.total
          }
          lastTransaction={`01 à ${highlightCardData?.outputs?.lastTransaction}`}
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
