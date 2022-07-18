import { StyleSheet, Dimensions } from 'react-native'

const { height } = Dimensions.get('screen')

export class TextColors {
  static white = 'white'
  static black = '#17171B'
  static grey = '#747476'
  static number = '#17171B99'
}

export class BackgroundColors {
  static white = 'white'
  static inputDefault = '#f2f2f2'
  static inputPressed = '#e2e2e2'
  static modal = '#17171B80'
}

export enum TypeBackgroundColors {
  bug = '#8BD674',
  dark = '#6F6E78',
  dragon = '#7383B9',
  electric = '#F2CB55',
  fairy = '#EBA8C3',
  fighting = '#EB4971',
  fire = '#FFA756',
  flying = '#83A2E3',
  ghost = '#8571BE',
  grass = '#8BBE8A',
  ground = '#F78551',
  ice = '#91D8DF',
  normal = '#B5B9C4',
  poison = '#9F6E97',
  psychic = '#FF6568',
  rock = '#D4C294',
  steel = '#4C91B2',
  water = '#58ABF6',
}

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColors.white,
    justifyContent: 'space-between'
  },

  homeHeader: {
    width: '100%',
    height: height / 4,
  },

  headerGradient: {
    width: '100%',
    height: height / 4 + 1,
    paddingHorizontal: 40
  },

  appName: {
    fontSize: 32,
    fontWeight: "700",
    color: TextColors.black
  },

  homeActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 37.5,
    marginTop: 42.5,
  },

  homeActionRowIcon: {
    marginLeft: 25
  },

  description: {
    color: TextColors.grey,
    fontSize: 16,
    marginTop: 10
  },

  inputWrapper: {
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 22,
    borderRadius: 10,
    marginTop: 25,
    flexDirection: 'row',
    alignItems:'center'
  },

  input: {
    width: '100%',
    marginLeft: 12,
  },

  pokemonCard: {
    borderRadius: 10,
    width: '100%',
    padding: 20,
    marginVertical: 15,
  },

  pokemonNumber: {
    color: TextColors.number,
    fontSize: 12,
    fontWeight: "700",
  },

  pokemonList: {
    paddingHorizontal: 40,
    maxHeight: height * 0.75
  },

  homeHeaderContainer: {
    height: 316
  },

  pokemonName: {
    color: TextColors.white,
    fontSize: 26,
    fontWeight: "700",
  }
})
