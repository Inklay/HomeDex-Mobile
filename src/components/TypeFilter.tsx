import React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { BackgroundColors, Style } from '../style'
import { getTypeColor, getTypeSVG } from '../utils'

interface Props {
  active: boolean
  type: number,
  locked: boolean
  add: (type: number) => void
  remove: (type: number) => void
}

const TypeFilter: React.FC<Props> = ({active, type, locked, add, remove}) => {
  const [isActive, setActive] = React.useState(active)
  const [backgroundColor, setBackgroundColor] = React.useState(getBackgroundColor(active))
  const [SVGColor, setSVGColor] = React.useState(getSVGColor(active))

  React.useEffect(() => {
    setBackgroundColor(getBackgroundColor(isActive))
  }, [locked])

  const TypeSVG = getTypeSVG(type)

  function pressed() {
    if (!isActive && locked)
      return
    setBackgroundColor(getBackgroundColor(!isActive))
    setSVGColor(getSVGColor(!isActive))
    if (isActive)
      remove(type)
    else
      add(type)
    setActive(!isActive)
  }

  function getBackgroundColor(active: boolean): string {
    if (active)
      return getTypeColor(type)
    else if (locked)
      return BackgroundColors.inputPressed as string
    return BackgroundColors.white as string
  }

  function getSVGColor(active: boolean): string {
    if (active)
      return BackgroundColors.white as string
    return getTypeColor(type)
  }

  return (
    <View style={[
      Style.typeFilter, {
        backgroundColor: backgroundColor,
      }
    ]}>
      <TouchableWithoutFeedback onPress={pressed}>
        <TypeSVG height={35} width={35} color={SVGColor}/>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default TypeFilter
