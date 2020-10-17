import React, { useState } from 'react'
import {Input, Layout, Text} from '@ui-kitten/components'
import { TypingAnimation } from 'react-native-typing-animation';

import { StyleSheet, View, ScrollView, KeyboardAvoidingView } from 'react-native'
import { GoodsListScreenProps } from '../../types/navigation'
import {useAppState} from "../../app/state";

export function GoodChat(props: GoodsListScreenProps<'GoodChat'>) {
  const { selectedGoodId, goodList, currentMessage, setCurrentMessage, currentChat, setCurrentChat, sellerAnswers } = useAppState();
  const { name, price } = goodList[+selectedGoodId - 1];
  const [count, setCount] = useState(0);

  return (
    <Layout style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1, flexShrink: 1 }} behavior="height" keyboardVerticalOffset={88}>
        <View style={styles.header}>
          <Text style={{ fontSize: 24, color: 'white' }}>{name} ({price} ₽)</Text>
        </View>
        <View style={{ flex: 1, flexShrink: 1, padding: 6 }}>
          <ScrollView>
            {currentChat.map((item, i) => (
              <MessageItem
                key={item.message + i}
                message={item.message}
                type={item.type}
              />))}
          </ScrollView>
        </View>
        <View style={styles.typeWrap}>
          <Input
            onChangeText={nextValue => setCurrentMessage(nextValue)}
            onSubmitEditing={event => {
              const newCurrentChat = currentChat.concat([{ type: 'client', message: currentMessage }]);
              setCurrentChat(newCurrentChat);
              setCurrentMessage('');

              setTimeout(() => {
                const idx = newCurrentChat.filter(i => i.type === 'seller').length;
                const newCurrentChat2 =
                  newCurrentChat.concat([{ type: 'seller', message: '' }]);
                sellerAnswers[idx] && setCurrentChat(newCurrentChat2);

                setTimeout(() => {
                    newCurrentChat2[newCurrentChat2.length - 1].message = sellerAnswers[idx];
                  sellerAnswers[idx] && setCurrentChat(newCurrentChat2);
                  setCount(count + 1);
                }, 2000);
              }, 1000)


            }}
            value={currentMessage}
            placeholder="Написать..."
          />
        </View>
      </KeyboardAvoidingView>
    </Layout>
  )
}

const MessageItem = (props: any) => {
  const { type, message } = props;
  if(type === 'seller' && !message) {
    return (
      <View style={{ flex: 1, flexDirection: 'row', marginBottom: 6, justifyContent: 'flex-start' }}>
        <View style={{ minWidth: 40, height: 24, padding: 6, borderRadius: 4, maxWidth: '65%', backgroundColor: '#1c56de' }}>
          <TypingAnimation dotColor="white" />
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 6, justifyContent: type === 'client' ? 'flex-end': 'flex-start' }}>
      <View style={{ padding: 6, borderRadius: 4, maxWidth: '65%', backgroundColor: type === 'client' ? '#f3f3f3' : '#1c56de' }}>
        <Text style={{ color: type === 'client' ? 'black' : 'white' }}>{message}</Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 6,
    backgroundColor: '#0f1723',
    color: 'white'
  },
  typeWrap: {
    flex: 0,
    flexShrink: 0,
    flexBasis: 50,
    borderWidth: 1,
    borderColor: '#dedede',
    paddingVertical: 6,
    paddingBottom: 12
  }
});
