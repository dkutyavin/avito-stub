import { StackNavigationProp } from '@react-navigation/stack'

// goods lsit
export type GoodListStackParamList = {
  GoodList: undefined
  GoodDetails: undefined
  GoodChat: undefined
}

type GoodsListScreenNavigationProp<T extends keyof GoodListStackParamList> = StackNavigationProp<
  GoodListStackParamList,
  T
>

export type GoodsListScreenProps<T extends keyof GoodListStackParamList> = {
  navigation: GoodsListScreenNavigationProp<T>
}
