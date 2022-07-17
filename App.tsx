import React from 'react'
import { ImageBackground, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Style } from './src/style'
import Pokeball from './assets/images/Pokeball.png'
import IconButton from './src/components/IconButton'
import Games from './src/components/svgs/Games'
import Sort from './src/components/svgs/Sort'
import Filter from './src/components/svgs/Filter'
import Input from './src/components/Input'

export default function App() {
  return (
    <View style={Style.container}>
      <ImageBackground source={Pokeball} resizeMode="cover" style={Style.homeHeader}>
        <LinearGradient colors={['#FFFFFFD0', 'white']} style={Style.headerGradient}>
          <View style={Style.homeActionRow}>
            <IconButton Icon={Games}/>
            <IconButton Icon={Sort}/>
            <IconButton Icon={Filter}/>
          </View>
          <Text style={Style.appName}>Homedex</Text>
          <Text style={Style.description}>Search for Pokémon by name or by national pokédex number.</Text>
          <Input placeholder='What pokémon are you looking for ?'/>
        </LinearGradient>
      </ImageBackground>
    </View>
  )
}
