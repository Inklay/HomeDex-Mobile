import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/components/Screens/Home'
import PokemonScreen from './src/components/Screens/PokemonScreen'
import React from 'react'
import { getLocale } from './src/utils'

export default function App() {
  const Stack = createNativeStackNavigator()
  //getLocale()

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="PokemonScreen" component={PokemonScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
