import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { Providers } from './app/providers'
import { GoodChat } from './screens/goods/GoodChat'
import { GoodDetails } from './screens/goods/GoodDetails'
import { GoodList } from './screens/goods/GoodList'
import { GoodListStackParamList } from './types/navigation'

const { Navigator, Screen } = createStackNavigator<GoodListStackParamList>()

export default function App() {
  return (
    <Providers>
      <Navigator initialRouteName="Список товаров">
        <Screen name="Список товаров" component={GoodList} />
        <Screen name="О товаре" component={GoodDetails} />
        <Screen name="Чат" component={GoodChat} />
      </Navigator>
    </Providers>
  )
}
