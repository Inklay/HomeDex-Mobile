import React from 'react'
import { View } from 'react-native'
import Pokemon from '../../classes/Pokemon'

interface Props {
  navigation: any,
  pokemon: Pokemon
}

const PokemonScreen: React.FC<Props> = ({navigation, pokemon}) => {
  return (
    <View>
      
    </View>
  )
}

export default PokemonScreen