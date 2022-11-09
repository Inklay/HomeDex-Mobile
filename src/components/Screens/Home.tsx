import React from 'react'
import { ImageBackground, Text, View, FlatList, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Style, TextColors } from '../../style'
import Pokeball from '../../../assets/images/Pokeball.png'
import IconButton from '../IconButton'
import Filter from '../svgs/Filter'
import Input from '../Input'
import PokemonCard from '../PokemonCard'
import { pokemon } from '../../data'
import { getName, Locale } from '../../utils'
import { StatusBar } from 'expo-status-bar'
import Modal from 'react-native-modal'
import TypeFilter from '../TypeFilter'
import Pokemon from '../../classes/Pokemon'
import { TouchableWithoutFeedback } from 'react-native'
import Filters from '../../classes/Filters'
import FilterButton from '../FilterButton'
import accent from 'remove-accents'

interface Props {
  navigation: any
}

const Home: React.FC<Props> = ({navigation}) => {
  const [pokemonList, setPokemonList] = React.useState(pokemon)
  const [filterVisible, setFilterVisible] = React.useState(false)
  const [lockTypeFilter, setLockTypeFilter] = React.useState(false)
  const [filters, setFilters] = React.useState(new Filters())

  React.useEffect(() => {
    filterPokemon(filters)
  }, [])

  function updateSearch(value: string) {
    const newValue = {...filters}
    newValue.search = value
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
    const search = accent.remove(filters.search.toLocaleLowerCase())
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
        } else if (!filters.other)
          return
      }
      if (parseInt(search) > 0) {
        if (!p.id.toString().includes(search))
          return
      } else if (!accent.remove(getName(p.names, Locale.locale).toLocaleLowerCase()).includes(search))
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
              {/*<IconButton Icon={Games} trigger={() => {}} color={TextColors.black} size={20}/>
              <IconButton Icon={Sort} trigger={() => {}} color={TextColors.black} size={20}/>*/}
              <IconButton Icon={Filter} trigger={showFilter}  color={TextColors.black} size={20}/>
            </View>
            <Text style={Style.appName}>Homedex</Text>
            <Text style={Style.description}>{Locale.home.description}</Text>
            <Input onValueChange={updateSearch} placeholder={Locale.home.searchPlaceholder}/>
          </LinearGradient>
        </ImageBackground>
      </View>
      <FlatList initialNumToRender={50} style={Style.pokemonList} data={pokemonList} keyExtractor={(item, index) => `${item.id}-${item.form_name}-${index}`} renderItem={({item, index}) => <PokemonCard navigation={navigation} pokemon={item} index={index}/>}/>
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
          <Text style={Style.modalName}>{Locale.home.filters.filters}</Text>
          <Text style={Style.description}>{Locale.home.filters.description}</Text>
          <View style={Style.modalSection}>
            <ScrollView>
              <TouchableWithoutFeedback>
                <View>
                  <Text style={Style.modalSectionName}>{Locale.home.filters.types}</Text>
                  <View style={Style.filterContainer}>
                    <TypeFilter active={filters.types.find(t => t === 1) !== undefined} add={addType} remove={removeType} type={1} locked={lockTypeFilter}/>
                    <TypeFilter active={filters.types.find(t => t === 2) !== undefined} add={addType} remove={removeType} type={2} locked={lockTypeFilter}/>
                    <TypeFilter active={filters.types.find(t => t === 3) !== undefined} add={addType} remove={removeType} type={3} locked={lockTypeFilter}/>
                    <TypeFilter active={filters.types.find(t => t === 4) !== undefined} add={addType} remove={removeType} type={4} locked={lockTypeFilter}/>
                  </View>
                  <View style={Style.filterContainer}>
                    <TypeFilter active={filters.types.find(t => t === 5) !== undefined} add={addType} remove={removeType} type={5} locked={lockTypeFilter}/>
                    <TypeFilter active={filters.types.find(t => t === 6) !== undefined} add={addType} remove={removeType} type={6} locked={lockTypeFilter}/>
                    <TypeFilter active={filters.types.find(t => t === 7) !== undefined} add={addType} remove={removeType} type={7} locked={lockTypeFilter}/>
                    <TypeFilter active={filters.types.find(t => t === 8) !== undefined} add={addType} remove={removeType} type={8} locked={lockTypeFilter}/>
                  </View>
                  <View style={Style.filterContainer}>
                    <TypeFilter active={filters.types.find(t => t === 9) !== undefined} add={addType} remove={removeType} type={9} locked={lockTypeFilter}/>
                    <TypeFilter active={filters.types.find(t => t === 10) !== undefined} add={addType} remove={removeType} type={10} locked={lockTypeFilter}/>
                    <TypeFilter active={filters.types.find(t => t === 11) !== undefined} add={addType} remove={removeType} type={11} locked={lockTypeFilter}/>
                    <TypeFilter active={filters.types.find(t => t === 12) !== undefined} add={addType} remove={removeType} type={12} locked={lockTypeFilter}/>
                  </View>
                  <View style={Style.filterContainer}>
                    <TypeFilter active={filters.types.find(t => t === 13) !== undefined} add={addType} remove={removeType} type={13} locked={lockTypeFilter}/>
                    <TypeFilter active={filters.types.find(t => t === 14) !== undefined} add={addType} remove={removeType} type={14} locked={lockTypeFilter}/>
                    <TypeFilter active={filters.types.find(t => t === 15) !== undefined} add={addType} remove={removeType} type={15} locked={lockTypeFilter}/>
                    <TypeFilter active={filters.types.find(t => t === 16) !== undefined} add={addType} remove={removeType} type={16} locked={lockTypeFilter}/>
                  </View>
                  <View style={Style.filterContainer}>
                    <TypeFilter active={filters.types.find(t => t === 17) !== undefined} add={addType} remove={removeType} type={17} locked={lockTypeFilter}/>
                    <TypeFilter active={filters.types.find(t => t === 18) !== undefined} add={addType} remove={removeType} type={18} locked={lockTypeFilter}/>
                  </View>
                  <Text style={Style.modalSectionName}>{Locale.home.filters.forms.forms}</Text>
                  <View style={Style.filterContainer}>
                    <FilterButton name={Locale.home.filters.forms.mega} filters={filters} setFilters={setFilters} property='mega' filterPokemon={filterPokemon}/>
                    <FilterButton name={Locale.home.filters.forms.gigantamax} filters={filters} setFilters={setFilters} property='gigantamax' filterPokemon={filterPokemon}/>
                    <FilterButton name={Locale.home.filters.forms.alolan} filters={filters} setFilters={setFilters} property='alolan' filterPokemon={filterPokemon}/>
                    <FilterButton name={Locale.home.filters.forms.galarian} filters={filters} setFilters={setFilters} property='galarian' filterPokemon={filterPokemon}/>
                  </View>
                  <View style={Style.filterContainer}>
                    <FilterButton name={Locale.home.filters.forms.hisuian} filters={filters} setFilters={setFilters} property='hisuian' filterPokemon={filterPokemon}/>
                    <FilterButton name={Locale.home.filters.forms.other} filters={filters} setFilters={setFilters} property='other' filterPokemon={filterPokemon}/>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Home
