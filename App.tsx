import React from 'react'
import { ImageBackground, Text, View, FlatList, ScrollView, Switch } from 'react-native'
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
import { TouchableOpacity } from 'react-native-gesture-handler'
import Filters from './src/classes/Filters'
import FilterButton from './src/components/FilterButton'

export default function App() {

  const [pokemonList, setPokemonList] = React.useState(pokemon.filter(p => p.is_default == true))
  const [filterVisible, setFilterVisible] = React.useState(false)
  const [lockTypeFilter, setLockTypeFilter] = React.useState(false)
  const [filters, setFilters] = React.useState(new Filters())

  function updateSearch(value: string) {
    const cleanedValue = value.toLocaleLowerCase()
    const newValue = {...filters}
    newValue.search = cleanedValue
    setFilters(newValue)
    filterPokemon(newValue)
  }

  function addType(value: number) {
    const newValue = {...filters}
    newValue.types.push(value)
    setFilters(newValue)
    filterPokemon(newValue)
    if (newValue.types.length === 2)
      setLockTypeFilter(true)
  }

  function removeType(value: number) {
    const newValue = {...filters}
    const index = newValue.types.indexOf(value)
    if (index > -1) 
      newValue.types.splice(index, 1)
      setFilters(newValue)
    filterPokemon(newValue)
    if (newValue.types.length === 1)
      setLockTypeFilter(false)
  }

  function filterPokemon(filters: Filters) {
    let list: Pokemon[] = []
    pokemon.forEach(p => {
      if (!p.is_default) {
        if (p.form_name.includes('mega')) {
          if (!filters.mega)
            return
        } else if (p.form_name.includes('gmax')) {
          if (!filters.gigantamax)
            return
        } else if (p.form_name === 'alola') {
          if (!filters.alolan)
            return
        } else if (p.form_name === 'galar') {
          if (!filters.galarian)
            return
        } else if (p.form_name === 'hisui') {
          if (!filters.hisuian)
            return
        } else if (!filters.forms)
          return
      }
      if (parseInt(filters.search) > 0) {
        if (!p.id.toString().includes(filters.search))
          return
      } else if (!getName(p.names, 'fr').toLocaleLowerCase().includes(filters.search))
        return
      for (let i = 0; i < filters.types.length; i++) {
        if (p.types.length ===2) {
          if (p.types[0] !== filters.types[i] && p.types[1] !== filters.types[i])
            return
        } else if (p.types[0] !== filters.types[i])
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
            <ScrollView horizontal>
              <TouchableOpacity style={{flexDirection: 'row'}}>
                {
                  types.map((__, idx) => {
                    return (
                      <TypeFilter active={filters.types.find(t => t === idx + 1) !== undefined} add={addType} remove={removeType} type={idx + 1} locked={lockTypeFilter} key={`type-filter-${idx}`}/>
                    )
                  })
                }
                </TouchableOpacity>
              </ScrollView>
              <Text style={Style.modalSectionName}>Forms</Text>
              <ScrollView horizontal>
                <TouchableOpacity style={{flexDirection: 'row'}}>
                  <FilterButton name='Mega evolution' filters={filters} setFilters={setFilters} property='mega' filterPokemon={filterPokemon}/>
                  <FilterButton name='Gigantamax' filters={filters} setFilters={setFilters} property='gigantamax' filterPokemon={filterPokemon}/>
                  <FilterButton name='Alolan forms' filters={filters} setFilters={setFilters} property='alolan' filterPokemon={filterPokemon}/>
                  <FilterButton name='Galarian forms' filters={filters} setFilters={setFilters} property='galarian' filterPokemon={filterPokemon}/>
                  <FilterButton name='Hisuian forms' filters={filters} setFilters={setFilters} property='hisuian' filterPokemon={filterPokemon}/>
                  <FilterButton name='Other forms' filters={filters} setFilters={setFilters} property='other' filterPokemon={filterPokemon}/>
                </TouchableOpacity>
              </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  )
}
