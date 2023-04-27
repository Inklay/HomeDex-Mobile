import React from 'react'
import { View, Text } from 'react-native'
import DataLocale from '../classes/DataLocale'
import { BackgroundColors, Style } from '../style'
import { getTypeColor, getTypeName, getTypeSVG } from '../utils'

interface Props {
  type: number,
  dataLocale: DataLocale
}

const TypeName: React.FC<Props> = ({type, dataLocale}) => {
  const TypeSVG = getTypeSVG(type)
  return (
    <View style={[
      Style.typeName, {
        backgroundColor: getTypeColor(type)
      }
    ]}>
      <TypeSVG height={15} width={15} color={BackgroundColors.white}/>
      <Text style={Style.typeNameText}>{getTypeName(type, dataLocale)}</Text>
    </View>
  )
}

export default TypeName
