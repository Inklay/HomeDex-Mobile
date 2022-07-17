import React from 'react'
import { ImageBackground, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { style } from './src/style'
import Pokeball from './assets/images/Pokeball.png'
import IconButton from './src/components/IconButton'
import Games from './src/components/svgs/games'
import Sort from './src/components/svgs/sort'
import Filter from './src/components/svgs/filter'

export default function App() {
  return (
    <View style={style.container}>
      <ImageBackground source={Pokeball} resizeMode="cover" style={style.homeHeader}>
        <LinearGradient colors={['#FFFFFFD0', 'white']} style={style.headerGradient}>
          <View style={style.homeActionRow}>
            <IconButton Icon={Games}/>
            <IconButton Icon={Sort}/>
            <IconButton Icon={Filter}/>
          </View>
          <Text style={style.appName}>Homedex</Text>
        </LinearGradient>
      </ImageBackground>
    </View>
  )
}
