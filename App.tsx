import React from 'react'
import { ImageBackground, Text, View, FlatList } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Style } from './src/style'
import Pokeball from './assets/images/Pokeball.png'
import IconButton from './src/components/IconButton'
import Games from './src/components/svgs/Games'
import Sort from './src/components/svgs/Sort'
import Filter from './src/components/svgs/Filter'
import Input from './src/components/Input'
import PokemonCard from './src/components/PokemonCard'
import data from './assets/data/data.json'

export default function App() {

  const [pokemonList] = React.useState(data.pokemon.filter(p => p.is_default == true))

  return (
    <View style={Style.container}>
      <View style={Style.homeHeaderContainer}>
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
      <FlatList style={Style.pokemonList} data={pokemonList} keyExtractor={(item, index) => `${item.id}-${item.form_name}-${index}`} renderItem={({item}) => <PokemonCard pokemon={item}/>}/>
    </View>
  )
}
