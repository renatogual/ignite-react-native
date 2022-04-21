import { RFValue } from 'react-native-responsive-fontsize'

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from './styles'

import SignInSocialButton from '../../components/SignInSocialButton'

import { useAuth } from '../../hooks/auth'

import LogoSvg from '../../assets/logo.svg'
import GoogleSvg from '../../assets/google.svg'
import AppleSvg from '../../assets/apple.svg'
import { Alert, Platform } from 'react-native'

export function SignIn() {
  const { signInWithGoogle, signInWithApple } = useAuth()

  const inIos = Platform.OS === 'ios'

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle()
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possível conectar a conta Google')
    }
  }

  async function handleSignInWithApple() {
    try {
      await signInWithApple()
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possível conectar a conta Apple')
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples {'\n'}
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title='Entrar com Google'
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          {inIos && (
            <SignInSocialButton
              title='Entrar com Apple'
              svg={AppleSvg}
              onPress={handleSignInWithApple}
            />
          )}
        </FooterWrapper>
      </Footer>
    </Container>
  )
}
