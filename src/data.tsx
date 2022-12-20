import data from '../assets/data/data.json'
import Pokemon from './classes/Pokemon'
import { Ability } from './classes/Ability'
import { Type } from './classes/Type'
import { EggGroup } from './classes/EggGroup'

const dataTypped = data as {"pokemon": Pokemon[], "types": Type[], "egg_groups": EggGroup[], "abilities": Ability[]}

export const pokemon = dataTypped.pokemon as Pokemon[]
export const types = dataTypped.types as Type[]
export const eggGroups = dataTypped.egg_groups as EggGroup[]
export const abilities = dataTypped.abilities as Ability[]
