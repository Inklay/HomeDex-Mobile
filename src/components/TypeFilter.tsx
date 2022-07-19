import React from 'react'
import { View } from 'react-native'
import { BackgroundColors, Style } from '../style'
import { getTypeColor, getTypeSVG } from '../utils'

interface Props {
  type: number,
  active: boolean,
  locked: boolean
}

const TypeFilter: React.FC<Props> = ({type, active, locked}) => {
  const TypeSVG = getTypeSVG(type)

  let backgroundColor = BackgroundColors.white as string
  if (active)
    backgroundColor = getTypeColor(type)
  else if (locked)
    backgroundColor = BackgroundColors.inputPressed as string

  let SVGColor = getTypeColor(type)
  if (active)
    SVGColor = BackgroundColors.white as string
  return (
    <View style={[
      Style.typeFilter, {
        backgroundColor: backgroundColor,
      }
    ]}>
      <TypeSVG height={35} width={35} color={SVGColor}/>
    </View>
  )
}

export default TypeFilter
