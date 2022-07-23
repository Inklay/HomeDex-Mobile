import React from 'react'
import { TouchableWithoutFeedback, View, Text } from 'react-native'
import Filters from '../classes/Filters'
import { Style, BackgroundColors, TextColors } from '../style'
import Toggle from './svgs/Toggle'

interface Props {
  name: string
  filters: Filters
  setFilters: (value: Filters) => void
  property: string
  filterPokemon: (filters: Filters) => void
}

const FilterButton: React.FC<Props> = ({name, filters, setFilters, property, filterPokemon}) => {
  const [isActive, setActive] = React.useState(filters[property])
  const [backgroundColor, setBackgroundColor] = React.useState(getBackgroundColor(filters[property]))
  const [SVGColor, setSVGColor] = React.useState(getSVGColor(filters[property]))

  function pressed() {
    setBackgroundColor(getBackgroundColor(!isActive))
    setSVGColor(getSVGColor(!isActive))
    const newValue = {...filters}
    newValue[property] = !filters[property]
    setFilters(newValue)
    filterPokemon(newValue)
    setActive(!isActive)
  }

  function getBackgroundColor(active: boolean): string {
    if (active)
      return BackgroundColors.enabled
    return BackgroundColors.white
  }

  function getSVGColor(active: boolean): string {
    if (active)
      return BackgroundColors.white
    return TextColors.grey
  }

  return (
    <View>
      <Text style={[Style.description, {
        marginBottom: 10,
        width: 65,
        textAlign: 'center'
      }]}>
        {name}
      </Text>
      <View style={[
        Style.typeFilter, {
          backgroundColor: backgroundColor,
        }
      ]}>
        <TouchableWithoutFeedback onPress={pressed}>
          <Toggle height={35} width={35} color={SVGColor}/>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

export default FilterButton