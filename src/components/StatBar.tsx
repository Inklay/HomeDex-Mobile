import React from 'react'
import { View } from 'react-native'
import { Style } from '../style'

interface Props {
  stat: number
  color: string
}


const StatBar: React.FC<Props> = ({stat, color}) => {
  return (
    <View style={Style.StatBarContainer}>
      <View style={Style.StatBarBackground}>
        <View style={[Style.StatBar, {backgroundColor: color, width: 150 * (stat / 255)}]}/>
      </View>
    </View>
  )
}

export default StatBar
