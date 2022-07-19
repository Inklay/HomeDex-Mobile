import React from 'react'
import { View, Text } from 'react-native'
import { BackgroundColors, Style } from '../style'
import { getName, getTypeColor, getTypeSVG } from '../utils'
import { types } from '../data'

interface Props {
  type: number
}

const TypeName: React.FC<Props> = ({type}) => {
  const TypeSVG = getTypeSVG(type)
  return (
    <View style={[
      Style.typeName, {
        backgroundColor: getTypeColor(type)
      }
    ]}>
      <TypeSVG height={15} width={15} color={BackgroundColors.white}/>
      <Text style={Style.typeNameText}>{getName(types[type - 1], 'fr')}</Text>
    </View>
  )
}

export default TypeName