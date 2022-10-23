import React from 'react'
import { View } from 'react-native'
import { BackgroundColors, Style } from '../style'
import { getTypeColor, getTypeSVG } from '../utils'

interface Props {
  type: number
}

const TypeBadge: React.FC<Props> = ({type}) => {
  const TypeSVG = getTypeSVG(type)
  return (
    <View style={[
      Style.typeBadge, {
        backgroundColor: getTypeColor(type)
      }
    ]}>
      <TypeSVG height={20} width={20} color={BackgroundColors.white}/>
    </View>
  )
}

export default TypeBadge
