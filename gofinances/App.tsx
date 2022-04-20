import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components'
import AppLoading from 'expo-app-loading'

import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'

import theme from './src/global/styles/theme'

import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './src/routes/app.routes'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        {/* Para deixar os icones do status bar em branco devido o header ser colorido */}
        <StatusBar
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  )
}
