import React from 'react'
import { TouchableNativeFeedback, View } from 'react-native'
import { SvgProps } from 'react-native-svg'
import { TextColors, Style } from '../style'

interface Props {
  Icon: ({ ...props }: SvgProps & SvgProps) => JSX.Element
  trigger: () => void
}

const IconButton: React.FC<Props> = ({Icon, trigger}) => {
  return (
    <TouchableNativeFeedback onPress={trigger}>
      <View style={Style.homeActionRowIcon} >
        <Icon color={TextColors.black} height="20" width="20"/>
      </View>
    </TouchableNativeFeedback>
  )
}

export default IconButton
