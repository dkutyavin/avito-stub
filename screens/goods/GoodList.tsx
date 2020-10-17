import React from 'react'
import { Image } from 'react-native'
import { useAppState } from '../../app/state'

import { Layout, Text, Input } from '@ui-kitten/components'

import { StyleSheet, View, TouchableWithoutFeedback, Dimensions, ScrollView } from 'react-native'
import { GoodsListScreenProps } from '../../types/navigation'
import { IGoodProps } from './GoodDetails'

export function GoodList(props: GoodsListScreenProps<'GoodList'>) {
  const { searchPhrase, setSearchPhrase, goodList } = useAppState()
  const { navigation } = props

  return (
    <Layout style={styles.container}>
      <Input
        onChangeText={(nextValue) => setSearchPhrase(nextValue)}
        value={searchPhrase}
        placeholder="Найти в Москве"
      />
      <ScrollView>
        <View style={styles.goodWrap}>
          {goodList
            .filter((good) => !searchPhrase || good.name.includes(searchPhrase))
            .map((good) => (
              <GoodPanel key={good.id} data={good} navigation={navigation} />
            ))}
        </View>
      </ScrollView>
    </Layout>
  )
}

interface IGoodPanelProps {
  data: IGoodProps
  navigation: any
}

function GoodPanel(props: IGoodPanelProps) {
  const { setSelectedGoodId } = useAppState()
  const { id = '1', name, icon, price, location } = props.data

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setSelectedGoodId(id)
        props.navigation.push('О товаре')
      }}
    >
      <View style={styles.goodPanel}>
        <View style={{ height: 120, width: '100%' }}>
          <Image
            source={{
              uri: icon,
            }}
            style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
          />
        </View>
        <View style={{ padding: 6 }}>
          <Text>{name}</Text>
          <Text style={{ color: '#a3a3a3', fontSize: 12, marginBottom: 4 }}>{location}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 4 }}>
            <Text style={{ fontWeight: '700' }}>{price} ₽</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 6,
    backgroundColor: '#f4f4f4',
  },
  goodWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  goodPanel: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 4,
    overflow: 'hidden',
    minWidth: 0.5 * Dimensions.get('window').width - 12 - 6,
    maxWidth: 0.5 * Dimensions.get('window').width,
    display: 'flex',
    margin: 3,
  },
})
