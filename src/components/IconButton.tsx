import React from 'react'
import {TouchableWithoutFeedback} from 'react-native-gesture-handler'
import { SvgProps } from 'react-native-svg'
import { TextColors, Style } from '../style'

interface Props {
  Icon: ({ ...props }: SvgProps & SvgProps) => JSX.Element
}

const IconButton: React.FC<Props> = ({Icon}) => {
  return (
    <TouchableWithoutFeedback style={Style.homeActionRowIcon}>
      <Icon color={TextColors.black} height="20" width="20"/>
    </TouchableWithoutFeedback>
  )
}

export default IconButton
