import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Style } from '../../style'
import PokemonCard from '../PokemonCard'
import { pokemon } from '../../data'
import { getName, getLocale, getDeviceDataLocale, getDeviceUILocale } from '../../utils'
import { StatusBar } from 'expo-status-bar'
import Modal from 'react-native-modal'
import TypeFilter from '../TypeFilter'
import Pokemon from '../../classes/Pokemon'
import { TouchableWithoutFeedback } from 'react-native'
import Filters from '../../classes/Filters'
import FilterButton from '../FilterButton'
import accent from 'remove-accents'
import HomeHeader from '../HomeHeader'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import Toggle from '../svgs/Toggle'
import Dynamax from '../svgs/Dynamax'
import Mega from '../svgs/Mega'
import PaldeanForm from '../svgs/PaldeanForms'

interface Props {
  navigation: any
}

const Home: React.FC<Props> = ({navigation}) => {
  const [pokemonList, setPokemonList] = React.useState(pokemon)
  const [filterVisible, setFilterVisible] = React.useState(false)
  const [lockTypeFilter, setLockTypeFilter] = React.useState(false)
  const [filters, setFilters] = React.useState(new Filters())
  const [UILocale, setUILocale] = React.useState(getDeviceUILocale())
  const [dataLocale, setDataLocale] = React.useState(getDeviceDataLocale())

  const scrollY = useSharedValue(0)

  React.useEffect(() => {
    filterPokemon(filters)
    async function refreshLocale () {
      await getLocale('UILocale', setUILocale)
      await getLocale('DataLocale', setDataLocale)
    }
    refreshLocale()
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
      if (p.form_type !== 'default') {
        if (p.form_type === 'mega') {
          if (!filters.mega)
            return
        } else if (p.form_type === 'gmax') {
          if (!filters.gigantamax)
            return
        } else if (p.form_type === 'alola') {
          if (!filters.alolan)
            return
        } else if (p.form_type === 'galar') {
          if (!filters.galarian)
            return
        } else if (p.form_type === 'hisui') {
          if (!filters.hisuian)
            return
        } else if (p.form_type === 'paldea') {
          if (!filters.paldean)
            return
        } else if (!filters.other)
          return
      }
      if (parseInt(search) > 0) {
        if (!p.dex_numbers.nat.toString().includes(search))
          return
      } else if (!accent.remove(getName(p.names, UILocale.locale).toLocaleLowerCase()).includes(search))
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

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y
    }
  })

  return (
    <View style={Style.container}>
      <HomeHeader showFilter={showFilter} updateSearch={updateSearch} scrollY={scrollY} navigation={navigation} UILocale={UILocale} setUILocale={setUILocale} setDataLocale={setDataLocale} dataLocale={dataLocale}/>
      <Animated.FlatList scrollEventThrottle={10}
        onScroll={scrollHandler} initialNumToRender={50} style={Style.pokemonList} data={pokemonList} keyExtractor={(item, index) => `${item.dex_numbers.nat}-${item.form_name}-${index}`} renderItem={({item, index}) => <PokemonCard navigation={navigation} pokemon={item} index={index} dataLocale={dataLocale} UILocale={UILocale}/>}/>
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
          <Text style={Style.modalName}>{UILocale.home.filters.filters}</Text>
          <Text style={Style.description}>{UILocale.home.filters.description}</Text>
          <View style={Style.modalSection}>
            <ScrollView>
              <TouchableWithoutFeedback>
                <View>
                  <Text style={Style.modalSectionName}>{UILocale.home.filters.types}</Text>
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
                  <Text style={Style.modalSectionName}>{UILocale.home.filters.forms.forms}</Text>
                  <View style={Style.filterContainer}>
                    <FilterButton name={UILocale.home.filters.forms.mega} filters={filters} setFilters={setFilters} property='mega' filterPokemon={filterPokemon} SVG={Mega}/>
                    <FilterButton name={UILocale.home.filters.forms.gigantamax} filters={filters} setFilters={setFilters} property='gigantamax' filterPokemon={filterPokemon} SVG={Dynamax}/>
                    <FilterButton name={UILocale.home.filters.forms.alolan} filters={filters} setFilters={setFilters} property='alolan' filterPokemon={filterPokemon} SVG={Toggle}/>
                    <FilterButton name={UILocale.home.filters.forms.galarian} filters={filters} setFilters={setFilters} property='galarian' filterPokemon={filterPokemon} SVG={Toggle}/>
                  </View>
                  <View style={Style.filterContainer}>
                    <FilterButton name={UILocale.home.filters.forms.hisuian} filters={filters} setFilters={setFilters} property='hisuian' filterPokemon={filterPokemon} SVG={Toggle}/>
                    <FilterButton name={UILocale.home.filters.forms.paldean} filters={filters} setFilters={setFilters} property='paldean' filterPokemon={filterPokemon} SVG={PaldeanForm}/>
                    <FilterButton name={UILocale.home.filters.forms.other} filters={filters} setFilters={setFilters} property='other' filterPokemon={filterPokemon} SVG={Toggle}/>
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
