import React from 'react'
import { View, ImageBackground, Text, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Style, TextColors } from '../style'
import Pokeball from '../../assets/images/Pokeball.png'
import IconButton from './IconButton'
import Filter from './svgs/Filter'
import Input from './Input'
import { Locale } from '../utils'
import Animated, { Extrapolate, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated'

interface Props {
  showFilter: () => void
  updateSearch: (value: string) => void
  scrollY: SharedValue<number>
}

const HomeHeader: React.FC<Props> = ({showFilter, updateSearch, scrollY}) => {
  const width = Dimensions.get('screen').width

  const textStyle = useAnimatedStyle(() => {
    const top = interpolate(scrollY.value, [0, 400], [0, -200], Extrapolate.CLAMP)
    return {
      top: top
    }
  })

  const inputStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, [0, 400], [0, 1], Extrapolate.CLAMP)
    const top = -150 * scale
    const inputWidth = width - 40 - scale * 40
    return {
      top: top,
      width: inputWidth
    }
  })

  const headerStyle = useAnimatedStyle(() => {
    const height = interpolate(scrollY.value, [0, 400], [240, 90], Extrapolate.CLAMP)
    return {
      height: height
    }
  })

  return (
    <Animated.View style={[Style.homeHeaderContainer, headerStyle]}>
      <ImageBackground source={Pokeball} resizeMode='cover' style={Style.homeHeader}>
        <LinearGradient colors={['#FFFFFFD0', 'white']} style={Style.headerGradient}>
          <View style={Style.homeActionRow}>
            {/*<IconButton Icon={Games} trigger={() => {}} color={TextColors.black} size={20}/>
            <IconButton Icon={Sort} trigger={() => {}} color={TextColors.black} size={20}/>*/}
            <IconButton Icon={Filter} trigger={showFilter}  color={TextColors.black} size={20}/>
          </View>
          <Animated.View style={textStyle}>
            <Text style={Style.appName}>Homedex</Text>
            <Text style={Style.description}>{Locale.home.description}</Text>
          </Animated.View>
          <Animated.View style={inputStyle}>
            <Input onValueChange={updateSearch} placeholder={Locale.home.searchPlaceholder}/>
          </Animated.View>
        </LinearGradient>
      </ImageBackground>
    </Animated.View>
  )
}

export default HomeHeader
