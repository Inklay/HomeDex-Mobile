import React from 'react'
import { TextInput, View } from 'react-native'
import { BackgroundColors, Style, TextColors } from '../style'
import Search from './svgs/Search'

interface Props {
  placeholder: string
  onValueChange: (value: string) => void
}

const Input: React.FC<Props> = ({placeholder, onValueChange}) => {
  const [backgroundColor, setBackgroundColor] = React.useState(BackgroundColors.inputDefault)

  function OnFocus() {
    setBackgroundColor(BackgroundColors.inputPressed)
  }

  function OnLostFocus() {
    setBackgroundColor(BackgroundColors.inputDefault)
  }

  return (
    <View style={[
      Style.inputWrapper, {
        backgroundColor: backgroundColor
      }
    ]}>
      <Search color={TextColors.grey} height="16" width="16"/>
      <TextInput onChangeText={text => onValueChange(text)} placeholder={placeholder} style={Style.input} onFocus={() => OnFocus()} onBlur={() => OnLostFocus()} />
    </View>
  )
}

export default Input