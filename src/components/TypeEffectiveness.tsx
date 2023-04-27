import React from 'react'
import { View, Text } from 'react-native'
import { Style } from '../style'
import TypeBadge from './TypeBadge'

interface Props {
  type: number,
  effectiveness: number
}

const TypeEffectiveness: React.FC<Props> = ({type, effectiveness}) => {
  return (
    <View>
      <TypeBadge type={type}/>
      <Text style={Style.typeEffectivenessText}>{effectiveness}</Text>
    </View>
  )
}

export default TypeEffectiveness
