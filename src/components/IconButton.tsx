import React from 'react'
import { TouchableNativeFeedback, View } from 'react-native'
import { SvgProps } from 'react-native-svg'
import { TextColors, Style } from '../style'

interface Props {
  Icon: ({ ...props }: SvgProps & SvgProps) => JSX.Element
  trigger: () => void
  color: string
  size: number
}

const IconButton: React.FC<Props> = ({Icon, trigger, color, size}) => {
  return (
    <TouchableNativeFeedback onPress={trigger}>
      <View style={Style.homeActionRowIcon} >
        <Icon color={color} height={size} width={size}/>
      </View>
    </TouchableNativeFeedback>
  )
}

export default IconButton
