declare module '*.svg' {
  import React from 'react'
  import { SvgProps } from 'react-native-svg'
  const SvgComponent: React.SFC<SvgProps>
  export default SvgComponent
}