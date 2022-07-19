import React from 'react'
import { ImageBackground, Text, View, FlatList, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Style } from './src/style'
import Pokeball from './assets/images/Pokeball.png'
import IconButton from './src/components/IconButton'
import Games from './src/components/svgs/Games'
import Sort from './src/components/svgs/Sort'
import Filter from './src/components/svgs/Filter'
import Input from './src/components/Input'
import PokemonCard from './src/components/PokemonCard'
import { pokemon } from './src/data'
import { getName } from './src/utils'

export default function App() {

  const [pokemonList, setPokemonList] = React.useState(pokemon.filter(p => p.is_default == true))
  
  function updatePokemonList(value: string) {
    value = value.toLocaleLowerCase()
    if (parseInt(value) > 0)
      setPokemonList(pokemon.filter(p => p.is_default == true && p.id.toString().includes(value)))
    else
      setPokemonList(pokemon.filter(p => p.is_default == true && getName(p.names, 'fr').toLocaleLowerCase().includes(value)))
  }

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
            <Input onValueChange={updatePokemonList} placeholder='What pokémon are you looking for ?'/>
          </LinearGradient>
        </ImageBackground>
      </View>
      <FlatList style={Style.pokemonList} data={pokemonList} keyExtractor={(item, index) => `${item.id}-${item.form_name}-${index}`} renderItem={({item, index}) => <PokemonCard pokemon={item} index={index}/>}/>
    </View>
  )
}
