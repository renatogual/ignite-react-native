import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { RectButton } from 'react-native-gesture-handler'

interface ButtonProps {
  color?: string
}

interface ButtonTitleProps {
  light?: boolean
}

export const Container = styled(RectButton) <ButtonProps>`
  width: 100%;

  margin-bottom: 8px;
  padding: 19px;
  align-items: center;
  justify-content: center;

  background-color: ${({ color, theme }) => color ? color : theme.colors.main};
`

export const Title = styled.Text <ButtonTitleProps>`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme, light }) => light ? theme.colors.header : theme.colors.shape};
`