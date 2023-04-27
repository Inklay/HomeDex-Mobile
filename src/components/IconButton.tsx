import React from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import { SvgProps } from 'react-native-svg'
import { Style } from '../style'

interface Props {
  Icon: ({ ...props }: SvgProps & SvgProps) => JSX.Element
  trigger: () => void
  color: string
  size: number
}

const IconButton: React.FC<Props> = ({Icon, trigger, color, size}) => {
  return (
    <TouchableWithoutFeedback onPress={trigger}>
      <View style={Style.homeActionRowIcon} >
        <Icon color={color} height={size} width={size}/>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default IconButton
