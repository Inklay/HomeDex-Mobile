import React from 'react'
import { ImageBackground, Text, View, FlatList, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Style } from './src/style'
import Pokeball from './assets/images/Pokeball.png'
import IconButton from './src/components/IconButton'
import Games from './src/components/svgs/Games'
import Sort from './src/components/svgs/Sort'
import Filter from './src/components/svgs/Filter'
import Input from './src/components/Input'
import PokemonCard from './src/components/PokemonCard'
import { pokemon, types } from './src/data'
import { getName, getTypeColor } from './src/utils'
import { StatusBar } from 'expo-status-bar'
import Modal from 'react-native-modal'
import TypeFilter from './src/components/TypeFilter'

export default function App() {

  const [pokemonList, setPokemonList] = React.useState(pokemon.filter(p => p.is_default == true))
  const [filterVisible, setFilterVisible] = React.useState(false)
  const [typeFilter, setTypeFilter] = React.useState([] as number[])
  const [search, setSearch] = React.useState('')

  function updateSearch(value: string) {
    const cleanedValue = value.toLocaleLowerCase()
    setSearch(cleanedValue)
    filterPokemon(cleanedValue, typeFilter)
  }

  function addTypes(value: number) {
    const newValue = [...typeFilter, value]
    setTypeFilter(newValue)
    filterPokemon(search, newValue)
  }

  function filterPokemon(search: string, types: number[]) {
    if (parseInt(search) > 0)
      setPokemonList(pokemon.filter(p => p.is_default == true && p.id.toString().includes(search)))
    else
      setPokemonList(pokemon.filter(p => p.is_default == true && getName(p.names, 'fr').toLocaleLowerCase().includes(search)))
  }

  function showFilter() {
    setFilterVisible(true)
  }

  return (
    <View style={Style.container}>
      <View style={Style.homeHeaderContainer}>
        <ImageBackground source={Pokeball} resizeMode="cover" style={Style.homeHeader}>
          <LinearGradient colors={['#FFFFFFD0', 'white']} style={Style.headerGradient}>
            <View style={Style.homeActionRow}>
              {/*<IconButton Icon={Games}/>*/}
              <IconButton Icon={Sort} trigger={() => {}}/>
              <IconButton Icon={Filter} trigger={showFilter}/>
            </View>
            <Text style={Style.appName}>Homedex</Text>
            <Text style={Style.description}>Search for Pokémon by name or by national pokédex number.</Text>
            <Input onValueChange={updateSearch} placeholder='What pokémon are you looking for ?'/>
          </LinearGradient>
        </ImageBackground>
      </View>
      <FlatList style={Style.pokemonList} data={pokemonList} keyExtractor={(item, index) => `${item.id}-${item.form_name}-${index}`} renderItem={({item, index}) => <PokemonCard pokemon={item} index={index}/>}/>
      <StatusBar translucent/>
      <Modal
        isVisible={filterVisible}
        onBackdropPress={() => setFilterVisible(false)}
        onBackButtonPress={() => setFilterVisible(false)}
        swipeDirection='down'
        onSwipeComplete={() => setFilterVisible(false)}
        animationInTiming={250}
        animationOutTiming={250}
        style={Style.bottomModal}
        useNativeDriverForBackdrop
        propagateSwipe
      >
        <View style={Style.modalContainer}>
          <Text style={Style.modalName}>Filters</Text>
          <Text style={Style.description}>Use advanced search to explore Pokémon by type and forms</Text>
          <View style={Style.modalSection}>
            <Text style={Style.modalSectionName}>Types</Text>
            <ScrollView horizontal style={Style.typeFilterContainer}>
              {
                types.map((__, idx) => {
                  return (
                    <TypeFilter type={idx + 1} locked={false} active={false} key={`type-filter-${idx}`}/>
                  )
                })
              }
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  )
}
