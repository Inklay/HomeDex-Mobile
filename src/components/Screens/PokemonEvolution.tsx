import React from 'react'
import { View, Text } from 'react-native'
import Pokemon from '../../classes/Pokemon'
import { BackgroundColors, Style } from '../../style'
import { getName, Locale } from '../../utils'
import Spacer from '../Spacer'
import StatBar from '../StatBar'
import TypeEffectiveness from '../TypeEffectiveness'

interface Props {
  pokemon: Pokemon
  color: string
}

const PokemonEvolution: React.FC<Props> = ({pokemon, color}) => {
  return (
    <View>
      <Text style={[Style.pokemonScreenTitle, {color: color}]}>{Locale.pokemonScreen.evo.chain}</Text>
      <Spacer/>
    </View>
  )
}

export default PokemonEvolution
