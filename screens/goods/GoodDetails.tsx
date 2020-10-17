import React from 'react'
import { Layout, Text, Button } from '@ui-kitten/components'

import { StyleSheet, View, Image, ScrollView } from 'react-native'
import { GoodsListScreenProps } from '../../types/navigation'
import { useAppState } from '../../app/state'

export interface IGoodProps {
  id: string
  icon: string
  name: string
  price: string
  location: string
  description?: string
  categories?: string[]
}

export function GoodDetails(props: GoodsListScreenProps<'GoodDetails'>) {
  const { selectedGoodId, goodList } = useAppState()
  const { name, description = '', icon, price, location, categories = [] } = goodList[
    +selectedGoodId - 1
  ]

  return (
    <Layout style={styles.container}>
      <View style={{ width: '100%', height: 266 }}>
        <Image
          source={{
            uri: icon,
          }}
          style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
        />
      </View>
      <ScrollView>
        <View style={{ padding: 6, paddingTop: 0, flex: 1, flexShrink: 1 }}>
          <Text style={{ fontSize: 32, fontWeight: '600', marginBottom: 6 }}>{name}</Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '800',
              marginBottom: 12,
              textDecorationLine: 'underline',
            }}
          >
            {price} ₽
          </Text>
          <Text style={{ color: '#a3a3a3', marginBottom: 6 }}>{location}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ width: '40%', color: '#a6a6a6' }}>Категория:</Text>
            <Text style={{ width: '60%' }}>{categories[0]}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ width: '40%', color: '#a6a6a6' }}>Подкатегория:</Text>
            <Text style={{ width: '60%' }}>{categories[1]}</Text>
          </View>
          <Text style={{ marginVertical: 6 }}>{description}</Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button style={styles.button}>Позвонить</Button>
        <Button
          style={{ ...styles.button, backgroundColor: '#2384de' }}
          onPress={() => {
            props.navigation.push('Чат')
          }}
        >
          Написать
        </Button>
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0,
    flexShrink: 0,
    flexBasis: 60,
    flexDirection: 'row',
    padding: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  button: {
    backgroundColor: '#4fde94',
    borderWidth: 0,
    height: 40,
    width: '45%',
  },
})
