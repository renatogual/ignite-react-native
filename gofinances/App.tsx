import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components'
import AppLoading from 'expo-app-loading'
import { NavigationContainer } from '@react-navigation/native'

import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'

import theme from './src/global/styles/theme'

import { AppRoutes } from './src/routes/app.routes'
import { SignIn } from './src/screens/SignIn'

import { AuthProvider } from './src/hooks/auth'

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

        <AuthProvider>
          <SignIn />
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  )
}
