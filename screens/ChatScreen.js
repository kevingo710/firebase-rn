import { View, Text, TouchableOpacity } from 'react-native'
import React, {useLayoutEffect, useState, useEffect, useCallback} from 'react'
import{ auth } from '../firebase'
import { AntDesign } from '@expo/vector-icons'
import { Avatar } from 'react-native-elements'
import { GiftedChat } from 'react-native-gifted-chat'

const ChatScreen = ({ navigation }) => {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View>
          <Avatar rounded source={{ uri: auth?.currentUser?.photoURL}}/>


        </View>
    ),
      headerRight: () => (
          <TouchableOpacity style={{marginRight: 30}} onPress={signOut}>
            <AntDesign name='logout' size={24} color="black" />
          </TouchableOpacity>
      )


    })
  }, [])

  const signOut = () => {

    auth.signOut().then(() => {
      // Sign-out successful.
      alert("logout")
      navigation.replace('Login')

    }).catch((error) => {
      // An error happened.
    });

  }
  return (
    <View style={{flex: 1}}>
      {/* <Text>Hola {auth?.currentUser?.displayName}</Text> */}
      <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />

    </View>
  )
}

export default ChatScreen