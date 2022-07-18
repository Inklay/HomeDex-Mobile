import { StyleSheet, Dimensions } from 'react-native'

const { height } = Dimensions.get('screen')

export enum TextColors {
  white = 'white',
  black = '#17171B',
  grey = '#747476',
  number = '#17171B99'
}

export enum BackgroundColors {
  white = 'white',
  inputDefault = '#f2f2f2',
  inputPressed = '#e2e2e2',
  modal = '#17171B80'
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

export enum TypeColors {
  bug = '#8CB230',
  dark = '#58575F',
  dragon = '#0F6AC0',
  electric = '#EED535',
  fairy = '#ED6EC7',
  fighting = '#D04164',
  fire = '#FD7D24',
  flying = '#748FC9',
  ghost = '#556AAE',
  grass = '#62B957',
  ground = '#DD7748',
  ice = '#61CEC0',
  normal = '#9DA0AA',
  poison = '#A552CC',
  psychic = '#EA5D60',
  rock = '#BAAB82',
  steel = '#417D9A',
  water = '#4A90DA'
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
    maxHeight: height - 316
  },

  homeHeaderContainer: {
    height: 316
  },

  pokemonName: {
    color: TextColors.white,
    fontSize: 26,
    fontWeight: "700",
  },

  typeName: {
    borderRadius: 3,
    padding: 5,
    flexDirection: 'row',
    width: '',
    marginRight: 15
  },

  typeNameText: {
    fontSize: 12,
    fontWeight: '400',
    color: TextColors.white,
    marginLeft: 5,
  },

  pokemonTypesName: {
    marginTop: 5,
    flexDirection: 'row',
  },

  cardDots: {
    position: 'absolute',
    left: 90,
    top: -15
  },
})
