import * as React from 'react'

import { IGoodProps } from '../screens/goods/GoodDetails'

const AppStateContext = React.createContext<State>(null as any)

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const value = useStateValue()

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

const defaultUser = {
  firstName: 'Василий',
  lastName: 'Богданов',
  patronymic: 'Маратович',
}

function useStateValue() {
  const [user, setUser] = React.useState<typeof defaultUser & Record<string, any>>(defaultUser)
  const [isRegistered, setIsRegistered] = React.useState(false)
  const [searchPhrase, setSearchPhrase] = React.useState('')
  const [selectedGoodId, setSelectedGoodId] = React.useState('')
  const [currentMessage, setCurrentMessage] = React.useState('')
  const [currentChat, setCurrentChat] = React.useState<
    Array<{ type: 'client' | 'seller'; message: string }>
  >([])

  const saveToUser = (newFields: Partial<typeof user>) => {
    setUser((prev) => ({ ...prev, ...newFields }))
  }

  const value = {
    isRegistered,
    register: () => setIsRegistered(true),
    user,
    saveToUser,
    searchPhrase,
    setSearchPhrase,
    selectedGoodId,
    setSelectedGoodId,
    goodList,
    sellerAnswers,
    currentMessage,
    setCurrentMessage,
    currentChat,
    setCurrentChat,
  }

  return value
}

export function useAppState() {
  return React.useContext(AppStateContext)
}

type State = ReturnType<typeof useStateValue>

const goodList: IGoodProps[] = [
  {
    id: '1',
    icon: 'https://www.velostrana.ru/upload/models/velo/45139/big.jpg',
    name: 'Велосипед Merida',
    price: '17 900,00',
    location: 'Москва, Бибирево',
    categories: ['велосипеды', 'Merida'],
    description:
      'Продаю велосипед Merida Silex 600 в связи с покупкой нового. Состояние отличное, есть следы экплуатации',
  },
  {
    id: '2',
    icon: 'https://www.icases.ru/upload/iblock/de2/de2c157885c0cb5a1a2544396b8ec317.jpg',
    name: 'Sony Playstation 4',
    price: '21 200,00',
    location: 'Пермь',
    categories: ['игровые приставки', 'Sony Playstation'],
    description: 'Отдаю вместе с 4 играми, купил ПК',
  },
  {
    id: '3',
    icon:
      'https://otziv-otziv.ru/assets/cache/images/product/4/39/otzyvy-microsoft-xbox-one-500-gb-10399366-600x600-e37.jpg',
    name: 'XBox One 512 Gb',
    price: '13 500,00',
    location: 'Москва, Красносельская',
    categories: ['игровые приставки', 'XBox'],
    description:
      'Продаю в связи с покупкой новой консоли, цена без игр, за каждую игру еще 1000р сверху',
  },
  {
    id: '4',
    icon:
      'https://appleyug.ru/wp-content/uploads/2019/11/whatsapp-image-2019-11-13-at-11.18.35-e1573636388350.jpeg',
    name: 'Чехлы для iPhone 11',
    price: '500,00',
    location: 'Мытищи, Московская обл.',
    categories: ['чехлы для телефонов', 'iPhone'],
    description: 'В наличии большой выбор чехлов на айфоны 11 поколения',
  },
  {
    id: '5',
    icon: 'https://static.my-shop.ru/product/3/135/1347695.jpg',
    name: 'Лопата совковая',
    price: '400,00',
    location: 'Москва, МЦК ЗИЛ',
    categories: ['садовый инструмент', 'лопаты'],
    description: 'Лопаты на любой вкус для оперативной работы с грунтом и другими материалами',
  },
  {
    id: '6',
    icon:
      'https://m-strana.ru/upload/resize_cache/sprint.editor/4c6/758_467_2/4c6bc50a081df551f40d53efb48feecd.jpg',
    name: 'Ракетное топливо',
    price: '31 000,00',
    location: 'Москва, Орехово',
    categories: ['ГСМ', 'ракетное топливо'],
    description:
      'Несимметричный диметил-гидразин для любительского ракетостроения жидкостных двигателей',
  },
  {
    id: '7',
    icon: 'https://smena-auto.ru/userfiles/shop/large/2470_remont-elektroreyki-skoda-octavi.jpg',
    name: 'Skoda Octavia A7 2015 гв 150 л.с.',
    price: '820 000,00',
    location: 'Москва, Проспект Вернадского',
    categories: ['легковые автомобили', 'Skoda'],
    description:
      'Продаю в связи с ипотекой. Машина ухожена и обслужена по регламенту. Пробег родной, готов на любые ' +
      'проверки. Только летняя эксплуатация, в машине не курили, не возили животных и детей. На 90к поменян ремень ГРМ ' +
      ', тормозные колодки в круг, масло в коробке. Есть притёртости по правой стороне, царапина от ключа вдоль двери,' +
      ' 4-5 сколов на капоте, но это возрастные изменения. За машину не стыдно, обоснованный' +
      ' торг у капота',
  },
  {
    id: '8',
    icon: 'https://spb-k.ru/img/load/Profnastila1.jpg',
    name: 'Металлопрофиль на заказ',
    price: '1 800,00',
    location: 'Владивосток, посёлок Благовидный',
    categories: ['строительные материалы', 'металлический прокат'],
    description: 'Продаем прокат кровельный, технический, для жилого и нежилого строительства',
  },
]

const sellerAnswers = [
  'Здравствуйте, нет, менял год назад, протектор износился',
  'Сколы и царапины на раме, но без ржавчины',
  'Давайте завтра в 7 вечера около фонтана',
]
