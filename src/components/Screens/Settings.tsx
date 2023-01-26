import React from 'react'
import { Text, View, TouchableWithoutFeedback } from 'react-native'
import { setUILocale, setDataLocale } from '../../utils'
import { BackgroundColors, Style } from '../../style'
import LeftArrow from '../svgs/LeftArrow'
import { Picker } from '@react-native-picker/picker'
import UILocale from '../../classes/UILocale'
import DataLocale from '../../classes/DataLocale'

interface Props {
  navigation: any
  route : {
    params: {
      setUILocale: (value: React.SetStateAction<any>) => void
      setDataLocale: (value: React.SetStateAction<any>) => void
      UILocale: UILocale
      dataLocale: DataLocale
    }
  }
}

const Settings: React.FC<Props> = ({navigation, route}) => {
  const setUILocaleParam = route.params.setUILocale
  const setDataLocaleParam = route.params.setDataLocale

  const UILanguagePickerRef = React.useRef()
  const DataLanguagePickerRef = React.useRef()
  const [UILanguage, ___] = React.useState(route.params.UILocale.locale)
  const [DataLanguage, __] = React.useState(route.params.dataLocale.locale)
  const [UILocale, setUILocaleState] = React.useState(route.params.UILocale)
  const [DataLocale, setDataLocaleState] = React.useState(route.params.dataLocale)

  function showUILanguagePicker () {
    if (UILanguagePickerRef.current !== undefined) {
      (UILanguagePickerRef.current as Picker<string>).focus()
    }
  }

  async function updateUILanguage (localeName: string) {
    const locale = await setUILocale(localeName, setUILocaleParam)
    setUILocaleState(locale)
  }

  function showDataLanguagePicker () {
    if (DataLanguagePickerRef.current !== undefined) {
      (DataLanguagePickerRef.current as Picker<string>).focus()
    }
  }

  async function updateDataLanguage (localeName: string) {
    const locale = await setDataLocale(localeName, setDataLocaleParam)
    setDataLocaleState(locale)
  }

  return (
    <View style={Style.container}>
      <View style={Style.settingsHeader}>
        <TouchableWithoutFeedback onPress={() => {navigation.goBack()}}>
          <LeftArrow style={Style.backIcon} color={BackgroundColors.black} height={20} width={20}/>
        </TouchableWithoutFeedback>
        <Text style={Style.settingsHeaderText}>{UILocale.settings.settings}</Text>
      </View>
      <View style={Style.settingsContent}>
        <Text style={Style.settingsSectionHeader}>{UILocale.settings.language.languages}</Text>
        <View style={{
          marginHorizontal: 20
        }}>
          <Text style={Style.settingsSectionItem}>{UILocale.settings.language.interface}</Text>
          <TouchableWithoutFeedback onPress={showUILanguagePicker}>
            <Text style={Style.settingsSectionItemDescription}>{UILocale.settings.language.interfaceDescription}</Text>
          </TouchableWithoutFeedback>
          <Text style={Style.settingsSectionItem}>{UILocale.settings.language.data}</Text>
          <TouchableWithoutFeedback onPress={showDataLanguagePicker}>
            <Text style={Style.settingsSectionItemDescription}>{DataLocale.name}{"\n\n"}{UILocale.settings.language.dataDescription}</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <Picker
        ref={UILanguagePickerRef}
        selectedValue={UILanguage}
        onValueChange={(itemValue) =>
          updateUILanguage(itemValue as unknown as string)
        }
      >
        <Picker.Item label="English" value="en"/>
        <Picker.Item label="Français" value="fr"/>
      </Picker>
      <Picker
        ref={DataLanguagePickerRef}
        selectedValue={DataLanguage}
        onValueChange={(itemValue) =>
          updateDataLanguage(itemValue as unknown as string)
        }
      >
        <Picker.Item label="English" value="en"/>
        <Picker.Item label="Français" value="fr"/>
      </Picker>
    </View>
  )
}

export default Settings
