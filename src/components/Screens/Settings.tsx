import React from 'react'
import { Text, View, TouchableWithoutFeedback, Linking } from 'react-native'
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

  function openGithub () {
    Linking.openURL('https://github.com/Inklay/HomeDex-Mobile')
  }

  function openPatreon () {
    Linking.openURL('https://www.patreon.com/inklay')
  }

  return (
    <View style={Style.container}>
      <View style={Style.settingsHeader}>
        <TouchableWithoutFeedback onPress={() => {navigation.goBack()}}>
          <LeftArrow style={Style.backIcon} color={BackgroundColors.black} height={20} width={20}/>
        </TouchableWithoutFeedback>
        <Text style={Style.settingsHeaderText}>{UILocale.settings.settings}</Text>
      </View>
      <View style={Style.settingsContainer}>
        <View style={Style.settingsContent}>
          <Text style={Style.settingsSectionHeader}>{UILocale.settings.language.languages}</Text>
          <View style={{ marginHorizontal: 20 }}>
            <TouchableWithoutFeedback onPress={showUILanguagePicker}>
              <View>
                <Text style={Style.settingsSectionItem}>{UILocale.settings.language.interface}</Text>
                <Text style={Style.settingsSectionItemDescription}>{UILocale.settings.language.interfaceDescription}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={showDataLanguagePicker}>
              <View>
                <Text style={Style.settingsSectionItem}>{UILocale.settings.language.data}</Text>
                <Text style={Style.settingsSectionItemDescription}>{DataLocale.name}{"\n\n"}{UILocale.settings.language.dataDescription}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={Style.settingsContent}>
          <Text style={Style.settingsSectionHeader}>{UILocale.settings.links.links}</Text>
          <View style={{ marginHorizontal: 20 }}>
            <Text style={Style.settingsSectionItem}>Github</Text>
            <TouchableWithoutFeedback onPress={openGithub}>
              <Text style={Style.settingsSectionItemDescription}>{UILocale.settings.links.githubDescription}</Text>
            </TouchableWithoutFeedback>
            <Text style={Style.settingsSectionItem}>Patreon</Text>
            <TouchableWithoutFeedback onPress={openPatreon}>
              <Text style={Style.settingsSectionItemDescription}>{UILocale.settings.links.patreonDescription}</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={Style.settingsContent}>
          <Text style={[
            Style.settingsSectionHeader,
            { marginBottom: 10 }
          ]}>{UILocale.settings.credits.credits}</Text>
          <View style={{ marginHorizontal: 20 }}>
            <Text style={Style.settingsSectionItemDescription}>
              {UILocale.settings.credits.nintendo}
              {"\n\n"}
              {UILocale.settings.credits.bulbapedia}
              {"\n\n"}
              {UILocale.settings.credits.pokepedia}
              {"\n\n"}
              {UILocale.settings.credits.flavioFarias}
            </Text>
          </View>
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
        <Picker.Item label="Deutsch" value="de"/>
        <Picker.Item label="English" value="en"/>
        <Picker.Item label="Español" value="es"/>
        <Picker.Item label="Français" value="fr"/>
        <Picker.Item label="Italiano" value="it"/>
        <Picker.Item label="日本語" value="ja"/>
        <Picker.Item label="한국인" value="ko"/>
        <Picker.Item label="简体中文" value="zh"/>
      </Picker>
    </View>
  )
}

export default Settings
