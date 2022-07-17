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

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColors.white,
  },

  homeHeader: {
    width: '100%',
    height: height / 4,
    flex: 1
  },

  headerGradient: {
    width: '100%',
    height: height / 4 + 1,
    paddingHorizontal: 40
  },

  appName: {
    fontSize: 32,
    fontWeight: 'bold',
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
  }
})
