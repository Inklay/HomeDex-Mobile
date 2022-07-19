import React from 'react'
import { ImageBackground, Text, View, FlatList, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Style, TextColors } from './src/style'
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
import Pokemon from './src/classes/Pokemon'

export default function App() {

  const [pokemonList, setPokemonList] = React.useState(pokemon.filter(p => p.is_default == true))
  const [filterVisible, setFilterVisible] = React.useState(false)
  const [typeFilter, setTypeFilter] = React.useState([] as number[])
  const [search, setSearch] = React.useState('')
  const [lockTypeFilter, setLockTypeFilter] = React.useState(false)

  function updateSearch(value: string) {
    const cleanedValue = value.toLocaleLowerCase()
    setSearch(cleanedValue)
    filterPokemon(cleanedValue, typeFilter)
  }

  function addType(value: number) {
    const newValue = [...typeFilter, value]
    setTypeFilter(newValue)
    filterPokemon(search, newValue)
    if (newValue.length === 2)
      setLockTypeFilter(true)
  }

  function removeType(value: number) {
    const newValue = [...typeFilter]
    const index = newValue.indexOf(value)
    if (index > -1) 
      newValue.splice(index, 1)
    setTypeFilter(newValue)
    filterPokemon(search, newValue)
    if (newValue.length === 1)
      setLockTypeFilter(false)
  }

  function filterPokemon(search: string, types: number[]) {
    let list: Pokemon[] = []
    pokemon.forEach(p => {
      if (!p.is_default ||
        (parseInt(search) > 0 && !p.id.toString().includes(search)) &&
        !getName(p.names, 'fr').toLocaleLowerCase().includes(search))
        return
      for (let i = 0; i < types.length; i++) {
        if ((p.types.length === 2 && p.types[0] !== types[i] && p.types[1] !== types[i]) ||
        (p.types.length === 1 && p.types[0] !== types[i]))
          return
      }
      list.push(p)
    })
    setPokemonList(list)
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
              {/*<IconButton Icon={Games} trigger={() => {}} color={TextColors.black} size={20}/>*/}
              <IconButton Icon={Sort} trigger={() => {}} color={TextColors.black} size={20}/>
              <IconButton Icon={Filter} trigger={showFilter}  color={TextColors.black} size={20}/>
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
                    <TypeFilter active={typeFilter.find(t => t === idx + 1) !== undefined} add={addType} remove={removeType} type={idx + 1} locked={lockTypeFilter} key={`type-filter-${idx}`}/>
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
