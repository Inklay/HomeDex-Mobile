import React from 'react'
import {TouchableWithoutFeedback} from 'react-native-gesture-handler'
import { SvgProps } from 'react-native-svg'
import { textColors, style } from '../style'

interface Props {
  Icon: ({ ...props }: SvgProps & SvgProps) => JSX.Element
}

const IconButton: React.FC<Props> = ({Icon}) => {
  return (
    <TouchableWithoutFeedback style={style.homeActionRowIcon}>
      <Icon color={textColors.black}/>
    </TouchableWithoutFeedback>
  )
}

export default IconButton
