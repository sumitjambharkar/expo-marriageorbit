import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screen/HomeScreen';
import LoginScreen from './Screen/LoginScreen';
import SignScreen from './Screen/SignScreen';
import FirstPage from './Screen/FirstPage';
import TwoPage from './Screen/TwoPage';
import Home from './Screen/Home';
import Chat from './Screen/Chat';
import ProfileEdit from './Screen/ProfileEdit';
import Message from './Screen/Message';
import FullScreen from './Screen/FullScreen';
import useAuth from './hooks/useAuth';
import { db } from './firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {

  
  const { currentUser } = useAuth()
  const [user,setUser] = useState("")
  // console.log(user.religion,"sumit data");
  useEffect(() => {
    db.collection("users").doc(currentUser?.uid).onSnapshot(snap=>(
      setUser(snap.data())
    ))
  }, [currentUser])
  

  return (
    <>
      <Stack.Navigator>
        {currentUser ? (
          <>
            <Stack.Group>
              {!user?.about ?<><Stack.Screen name="Personal Details" component={FirstPage} />
              <Stack.Screen name="Religion Details" component={TwoPage} />
              <Stack.Screen name="Upload Profile" component={ProfileEdit} /></>:
              <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />}
              <Stack.Screen name="FullScreen" component={FullScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Chat" component={Chat} />
              <Stack.Screen name="SendMessage" component={Message} options={({ route }) => ({ title: route.params.displayName })} />
            </Stack.Group>
          </>
        )
          :
          (<Stack.Group>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignScreen} />
          </Stack.Group>)}
      </Stack.Navigator>
    </>
  )
}

export default StackNavigation;