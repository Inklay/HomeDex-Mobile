import React from 'react'
import { View } from 'react-native'
import { Style } from '../style'

interface Props {
  stat: number
  color: string
}

const StatBar: React.FC<Props> = ({stat, color}) => {
  return (
    <View style={Style.statBarContainer}>
      <View style={Style.statBarBackground}>
        <View style={[Style.statBar, {backgroundColor: color, width: 130 * (stat / 255)}]}/>
      </View>
    </View>
  )
}

export default StatBar
