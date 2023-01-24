import { TypeBackgroundColors, TypeColors } from './style'
import { SvgProps } from 'react-native-svg'
import Bug from './components/svgs/Types/Bug'
import Dark from './components/svgs/Types/Dark'
import Dragon from './components/svgs/Types/Dragon'
import Electric from './components/svgs/Types/Electric'
import Fairy from './components/svgs/Types/Fairy'
import Fighting from './components/svgs/Types/Fighting'
import Fire from './components/svgs/Types/Fire'
import Flying from './components/svgs/Types/Flying'
import Ghost from './components/svgs/Types/Ghost'
import Grass from './components/svgs/Types/Grass'
import Ground from './components/svgs/Types/Ground'
import Ice from './components/svgs/Types/Ice'
import Normal from './components/svgs/Types/Normal'
import Poison from './components/svgs/Types/Poison'
import Psychic from './components/svgs/Types/Psychic'
import Rock from './components/svgs/Types/Rock'
import Steel from './components/svgs/Types/Steel'
import Water from './components/svgs/Types/Water'
import Name from './classes/Name'
import Pokemon from './classes/Pokemon'
import * as LocaleType from './classes/Locale'
import fr from '../assets/locale/fr.json'
import en from '../assets/locale/en.json'
import { NativeModules, Platform } from 'react-native'

export let Locale = en as LocaleType.default

export function getTypeBackgroundColor(type: number) : string {
  switch (type) {
    case 2:
      return TypeBackgroundColors.fighting
    case 3:
      return TypeBackgroundColors.flying
    case 4:
      return TypeBackgroundColors.poison
    case 5:
      return TypeBackgroundColors.ground
    case 6:
      return TypeBackgroundColors.rock
    case 7:
      return TypeBackgroundColors.bug
    case 8:
      return TypeBackgroundColors.ghost
    case 9:
      return TypeBackgroundColors.steel
    case 10:
      return TypeBackgroundColors.fire
    case 11:
      return TypeBackgroundColors.water
    case 12:
      return TypeBackgroundColors.grass
    case 13:
      return TypeBackgroundColors.electric
    case 14:
      return TypeBackgroundColors.psychic
    case 15:
      return TypeBackgroundColors.ice
    case 16:
      return TypeBackgroundColors.dragon
    case 17:
      return TypeBackgroundColors.dark
    case 18:
      return TypeBackgroundColors.fairy
  }
  return TypeBackgroundColors.normal
}

export function getTypeColor(type: number) : string {
  switch (type) {
    case 2:
      return TypeColors.fighting
    case 3:
      return TypeColors.flying
    case 4:
      return TypeColors.poison
    case 5:
      return TypeColors.ground
    case 6:
      return TypeColors.rock
    case 7:
      return TypeColors.bug
    case 8:
      return TypeColors.ghost
    case 9:
      return TypeColors.steel
    case 10:
      return TypeColors.fire
    case 11:
      return TypeColors.water
    case 12:
      return TypeColors.grass
    case 13:
      return TypeColors.electric
    case 14:
      return TypeColors.psychic
    case 15:
      return TypeColors.ice
    case 16:
      return TypeColors.dragon
    case 17:
      return TypeColors.dark
    case 18:
      return TypeColors.fairy
  }
  return TypeColors.normal
}

export function getTypeSVG(type: number) : ({ ...props }: SvgProps & SvgProps) => JSX.Element {
  switch (type) {
    case 2:
      return Fighting
    case 3:
      return Flying
    case 4:
      return Poison
    case 5:
      return Ground
    case 6:
      return Rock
    case 7:
      return Bug
    case 8:
      return Ghost
    case 9:
      return Steel
    case 10:
      return Fire
    case 11:
      return Water
    case 12:
      return Grass
    case 13:
      return Electric
    case 14:
      return Psychic
    case 15:
      return Ice
    case 16:
      return Dragon
    case 17:
      return Dark
    case 18:
      return Fairy
  }
  return Normal
}

export function getTypeName(type: number) : string {
  switch (type) {
    case 2:
      return Locale.types.fighting
    case 3:
      return Locale.types.flying
    case 4:
      return Locale.types.poison
    case 5:
      return Locale.types.ground
    case 6:
      return Locale.types.rock
    case 7:
      return Locale.types.bug
    case 8:
      return Locale.types.ghost
    case 9:
      return Locale.types.steel
    case 10:
      return Locale.types.fire
    case 11:
      return Locale.types.water
    case 12:
      return Locale.types.grass
    case 13:
      return Locale.types.electric
    case 14:
      return Locale.types.psychic
    case 15:
      return Locale.types.ice
    case 16:
      return Locale.types.dragon
    case 17:
      return Locale.types.dark
    case 18:
      return Locale.types.fairy
  }
  return Locale.types.normal
}

export function getName(names: Name[], language: string) : string {
  const asked = names.find(n => n.language === language)
  if (asked === undefined)
    return names.find(n => n.language === 'en')!.name
  return asked.name
}

export function getEggGroupName(eggGroup: number) : string {
  switch (eggGroup) {
    case 2:
      return Locale.egg_groups.water_1
    case 3:
      return Locale.egg_groups.water_2
    case 4:
      return Locale.egg_groups.water_3
    case 5:
      return Locale.egg_groups.bug
    case 6:
      return Locale.egg_groups.flying
    case 7:
      return Locale.egg_groups.fairy
    case 8:
      return Locale.egg_groups.grass
    case 9:
      return Locale.egg_groups.human_like
    case 10:
      return Locale.egg_groups.mineral
    case 11:
      return Locale.egg_groups.amorphous
    case 12:
      return Locale.egg_groups.dragon
    case 13:
      return Locale.egg_groups.ditto
    case 14:
      return Locale.egg_groups.no_egg
    case 15:
      return Locale.egg_groups.field
    default:
      return Locale.egg_groups.monster
  }
}

export function fixId(pokemon: Pokemon) : string {
  if (pokemon.dex_numbers.nat < 10)
    return `000${pokemon.dex_numbers.nat}`
  if (pokemon.dex_numbers.nat < 100)
    return `00${pokemon.dex_numbers.nat}`
  if (pokemon.dex_numbers.nat < 1000)
    return `0${pokemon.dex_numbers.nat}`
  else
    return pokemon.dex_numbers.nat.toString()
}

export function getLocale() : void {
  const deviceLanguage = Platform.OS === 'ios' ?
    NativeModules.SettingsManager.settings.AppleLocale ||
    NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13+
    : NativeModules.I18nManager.localeIdentifier
  
  if (deviceLanguage.startsWith('fr_'))
    Locale = fr as LocaleType.default
  else
    Locale = en as LocaleType.default
}
