import data from '../assets/data/data.json'
import Pokemon from './classes/Pokemon'
import Ability from './classes/Ability'
import { Type } from './classes/Type'

export const pokemon = data.pokemon as Pokemon[]
export const types = data.types as Type[]
export const stats = data.stats
export const eggGroups = data.egg_groups
export const abilities = data.abilities as Ability[]
