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
import UILocale from './classes/UILocale'
import frUI from '../assets/locale/fr_ui.json'
import enUI from '../assets/locale/en_ui.json'
import frData from '../assets/locale/fr_data.json'
import enData from '../assets/locale/en_data.json'
import { NativeModules, Platform } from 'react-native'
import AsyncStorage  from '@react-native-async-storage/async-storage'
import DataLocale from './classes/DataLocale'
import Filters from './classes/Filters'

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

export function getTypeName(type: number, dataLocale: DataLocale) : string {
  switch (type) {
    case 2:
      return dataLocale.types.fighting
    case 3:
      return dataLocale.types.flying
    case 4:
      return dataLocale.types.poison
    case 5:
      return dataLocale.types.ground
    case 6:
      return dataLocale.types.rock
    case 7:
      return dataLocale.types.bug
    case 8:
      return dataLocale.types.ghost
    case 9:
      return dataLocale.types.steel
    case 10:
      return dataLocale.types.fire
    case 11:
      return dataLocale.types.water
    case 12:
      return dataLocale.types.grass
    case 13:
      return dataLocale.types.electric
    case 14:
      return dataLocale.types.psychic
    case 15:
      return dataLocale.types.ice
    case 16:
      return dataLocale.types.dragon
    case 17:
      return dataLocale.types.dark
    case 18:
      return dataLocale.types.fairy
  }
  return dataLocale.types.normal
}

export function getName(names: Name[], language: string) : string {
  const asked = names.find(n => n.language === language)
  if (asked === undefined)
    return names.find(n => n.language === 'en')!.name
  return asked.name
}

export function getEggGroupName(eggGroup: number, dataLocale: DataLocale) : string {
  switch (eggGroup) {
    case 2:
      return dataLocale.egg_groups.water_1
    case 3:
      return dataLocale.egg_groups.water_2
    case 4:
      return dataLocale.egg_groups.water_3
    case 5:
      return dataLocale.egg_groups.bug
    case 6:
      return dataLocale.egg_groups.flying
    case 7:
      return dataLocale.egg_groups.fairy
    case 8:
      return dataLocale.egg_groups.grass
    case 9:
      return dataLocale.egg_groups.human_like
    case 10:
      return dataLocale.egg_groups.mineral
    case 11:
      return dataLocale.egg_groups.amorphous
    case 12:
      return dataLocale.egg_groups.dragon
    case 13:
      return dataLocale.egg_groups.ditto
    case 14:
      return dataLocale.egg_groups.no_egg
    case 15:
      return dataLocale.egg_groups.field
    default:
      return dataLocale.egg_groups.monster
  }
}

export function fixId (pokemon: Pokemon) : string {
  if (pokemon.dex_numbers.nat < 10)
    return `000${pokemon.dex_numbers.nat}`
  if (pokemon.dex_numbers.nat < 100)
    return `00${pokemon.dex_numbers.nat}`
  if (pokemon.dex_numbers.nat < 1000)
    return `0${pokemon.dex_numbers.nat}`
  else
    return pokemon.dex_numbers.nat.toString()
}

export function getDeviceUILocale () : UILocale {
  const deviceLanguage = Platform.OS === 'ios' ?
    NativeModules.SettingsManager.settings.AppleLocale ||
    NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13+
    : NativeModules.I18nManager.localeIdentifier
  if (deviceLanguage.startsWith('fr_')) {
    return frUI
  } else {
    return enUI
  }
}

export function getDeviceDataLocale () : DataLocale {
  const deviceLanguage = Platform.OS === 'ios' ?
    NativeModules.SettingsManager.settings.AppleLocale ||
    NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13+
    : NativeModules.I18nManager.localeIdentifier
  if (deviceLanguage.startsWith('fr_')) {
    return frData
  } else {
    return enData
  }
}

export async function getLocale (localeType: string, setLanguage: (value: React.SetStateAction<any>) => void) : Promise<void> {
  const locale = await AsyncStorage.getItem(localeType)
  if (locale === null) {
    let deviceLocale
    if (localeType === 'UILocale') {
      deviceLocale = getDeviceUILocale()
    } else {
      deviceLocale = getDeviceDataLocale()
    }
    await AsyncStorage.setItem(localeType, deviceLocale.locale)
  } else {
    if (localeType === 'UILocale') {
      await setUILocale(locale as unknown as string, setLanguage)
    } else {
      await setDataLocale(locale as unknown as string, setLanguage)
    }
  }
}

export async function setUILocale (localeName: string, setLanguage: (value: React.SetStateAction<any>) => void): Promise<UILocale> {
  await AsyncStorage.setItem('UILocale', localeName)
  switch (localeName) {
    case 'fr':
      setLanguage(frUI)
      return frUI
    default:
      setLanguage(enUI)
      return enUI
  }
}

export async function setDataLocale (localeName: string, setLanguage: (value: React.SetStateAction<any>) => void): Promise<DataLocale> {
  await AsyncStorage.setItem('DataLocale', localeName)
  switch (localeName) {
    case 'fr':
      setLanguage(frData)
      return frData
    default:
      setLanguage(enData)
      return enData
  }
}

export async function getFilters (setFilters: (value: React.SetStateAction<any>) => void) : Promise<void> {
  const filters = await AsyncStorage.getItem('filters')
  if (filters !== null) {
    setFilters(JSON.parse(filters) as Filters)
  } else {
    await setFiltersInStorage(new Filters(), setFilters, true)
  }
}

export async function setFiltersInStorage (filters: Filters, setFilters: (value: React.SetStateAction<any>) => void, update: boolean = false) : Promise<void> {
  filters.search = ''
  if (update) {
    setFilters(filters)
  }
  await AsyncStorage.setItem('filters', JSON.stringify(filters))
}
