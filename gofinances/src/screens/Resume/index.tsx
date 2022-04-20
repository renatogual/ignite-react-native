import { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { VictoryPie } from 'victory-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { addMonths, subMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { HistoryCard } from '../../components/HistoryCard'

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { categories } from '../../utils/categories'

import {
  Container,
  Content,
  Header,
  Title,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
} from './styles'
import { useFocusEffect } from '@react-navigation/native'

export interface TransactionData {
  type: 'up' | 'down'
  name: string
  amount: string
  category: string
  date: string
}

interface CategoryData {
  key: string
  name: string
  color: string
  total: number
  percent: string
}

export function Resume() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

  const handleDateChange = (action: 'prev' | 'next') => {
    if (action === 'prev') {
      setSelectedDate(subMonths(selectedDate, 1))
    } else {
      setSelectedDate(addMonths(selectedDate, 1))
    }
  }

  const loadData = useCallback(async () => {
    const storageKey = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(storageKey)
    const responseFormatted = response ? JSON.parse(response) : []

    const outputs = responseFormatted.filter(
      (output: TransactionData) =>
        output.type === 'down' &&
        new Date(output.date).getMonth() === selectedDate.getMonth() &&
        new Date(output.date).getFullYear() === selectedDate.getFullYear()
    )

    const outputsTotal = outputs.reduce(
      (acc: number, output: TransactionData) => {
        return acc + output.amount
      },
      0
    )

    const totalByCategory: CategoryData[] = []

    categories.forEach((category) => {
      let categorySum = 0

      outputs.forEach((output: TransactionData) => {
        if (output.category === category.key) {
          categorySum += Number(output.amount)
        }
      })

      if (categorySum > 0) {
        const percent = `${((categorySum / outputsTotal) * 100).toFixed(0)}%`

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          percent,
        })
      }
    })

    setTotalByCategories(totalByCategory)
  }, [selectedDate])

  // useEffect(() => {
  //   loadData()
  // }, [selectedDate])

  useFocusEffect(
    useCallback(() => {
      loadData()
    }, [selectedDate])
  )

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >
        <MonthSelect>
          <MonthSelectButton onPress={() => handleDateChange('prev')}>
            <MonthSelectIcon name='chevron-left' />
          </MonthSelectButton>

          <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

          <MonthSelectButton onPress={() => handleDateChange('next')}>
            <MonthSelectIcon name='chevron-right' />
          </MonthSelectButton>
        </MonthSelect>

        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            x='percent'
            y='total'
            colorScale={totalByCategories.map((item) => item.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: '#fff',
              },
            }}
            labelRadius={50}
          />
        </ChartContainer>

        {totalByCategories.map(({ key, name, color, total }) => (
          <HistoryCard {...{ key, name, color, total }} />
        ))}
      </Content>
    </Container>
  )
}
