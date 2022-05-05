import styled, { css } from 'styled-components/native'
import { TextInput } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

interface Props {
  isFocused: boolean
}

export const Container = styled.View`
  flex-direction: row;

  
`

export const IconContainer = styled.View<Props>`
  height: 56px;
  width: 55px;

  justify-content: center;
  align-items: center;

  margin-right: 2px;

  background-color: ${({ theme }) => theme.colors.background_secondary};

  border-bottom-width: 2px;
  border-bottom-color: transparent

  ${({ isFocused, theme }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `}
`

export const InputText = styled(TextInput) <Props>`
  flex: 1;

  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background_secondary};

  padding: 0 23px;

  border-bottom-width: 2px;
  border-bottom-color: transparent

  ${({ isFocused, theme }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `}
`