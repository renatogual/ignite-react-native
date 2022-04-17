import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Platform } from 'react-native'
import { useTheme } from 'styled-components'
import { MaterialIcons } from '@expo/vector-icons'

import { Dashboard } from '../screens/Dashboard'
import { Register } from '../screens/Register'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  const theme = useTheme()

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          height: 88,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        },
      }}
    >
      <Screen
        name='Listagem'
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons {...{ size, color }} name='format-list-bulleted' />
          ),
        }}
      />
      <Screen
        name='Cadastrar'
        component={Register}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons {...{ size, color }} name='attach-money' />
          ),
        }}
      />
      <Screen
        name='Resumo'
        component={Register}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons {...{ size, color }} name='pie-chart' />
          ),
        }}
      />
    </Navigator>
  )
}
