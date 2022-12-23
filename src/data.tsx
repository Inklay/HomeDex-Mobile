import data from '../assets/data/data.json'
import Pokemon from './classes/Pokemon'
import { Ability } from './classes/Ability'

const dataTypped = data as {'pokemon': Pokemon[], 'abilities': Ability[]}

export const pokemon = dataTypped.pokemon as Pokemon[]
export const abilities = dataTypped.abilities as Ability[]
