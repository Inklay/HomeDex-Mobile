import React from 'react'
import { View, Text } from 'react-native'
import { BackgroundColors, Style } from '../style'
import { getName, getTypeColor, getTypeName, getTypeSVG } from '../utils'

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
      <Text style={Style.typeNameText}>{getTypeName(type)}</Text>
    </View>
  )
}

export default TypeName
