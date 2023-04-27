import React from 'react'
import { TouchableWithoutFeedback, View, Text } from 'react-native'
import Filters from '../classes/Filters'
import { Style, BackgroundColors, TextColors } from '../style'
import { FilterProps } from './svgs/FilterProps'

interface Props {
  name: string
  filters: Filters
  updateFilter: (value: Filters) => void
  property: string
  SVG: ({ ...props }: FilterProps) => JSX.Element
}

const FilterButton: React.FC<Props> = ({name, filters, updateFilter, property, SVG}) => {
  const [isActive, setActive] = React.useState(filters[property])
  const [backgroundColor, setBackgroundColor] = React.useState(getBackgroundColor(filters[property]))
  const [SVGColor, setSVGColor] = React.useState(getSVGColor(filters[property]))

  function pressed() {
    setBackgroundColor(getBackgroundColor(!isActive))
    setSVGColor(getSVGColor(!isActive))
    const newValue = {...filters}
    newValue[property] = !filters[property]
    updateFilter(newValue)
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
      <View style={{
        height: 55,
        justifyContent: 'center'
      }}>
        <Text style={[Style.description, {
          textAlign: 'center'
        }]}>
          {name}
        </Text>
      </View>
      <View style={[
        Style.typeFilter, {
          backgroundColor: backgroundColor,
        }
      ]}>
        <TouchableWithoutFeedback onPress={pressed}>
          <View>
            <SVG height={40} width={40} color={SVGColor}/>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

export default FilterButton
