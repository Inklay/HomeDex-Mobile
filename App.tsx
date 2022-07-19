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
import { pokemon } from './src/data'
import { getName } from './src/utils'
import { StatusBar } from 'expo-status-bar'
import Modal from 'react-native-modal'

export default function App() {

  const [pokemonList, setPokemonList] = React.useState(pokemon.filter(p => p.is_default == true))
  const [filterVisible, setFilterVisible] = React.useState(false)
  
  function updatePokemonList(value: string) {
    value = value.toLocaleLowerCase()
    if (parseInt(value) > 0)
      setPokemonList(pokemon.filter(p => p.is_default == true && p.id.toString().includes(value)))
    else
      setPokemonList(pokemon.filter(p => p.is_default == true && getName(p.names, 'fr').toLocaleLowerCase().includes(value)))
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
            <Input onValueChange={updatePokemonList} placeholder='What pokémon are you looking for ?'/>
          </LinearGradient>
        </ImageBackground>
      </View>
      <FlatList style={Style.pokemonList} data={pokemonList} keyExtractor={(item, index) => `${item.id}-${item.form_name}-${index}`} renderItem={({item, index}) => <PokemonCard pokemon={item} index={index}/>}/>
      <StatusBar translucent={true}/>
      <Modal
        isVisible={filterVisible}
        onBackdropPress={() => setFilterVisible(false)}
        onBackButtonPress={() => setFilterVisible(false)}
        swipeDirection='down'
        onSwipeComplete={() => setFilterVisible(false)}
        animationInTiming={250}
        animationOutTiming={250}
        style={Style.bottomModal}
        useNativeDriverForBackdrop={true}
      >
        <View style={Style.modalContainer}>
          <Text>
            test
          </Text>
        </View>
      </Modal>
    </View>
  )
}
