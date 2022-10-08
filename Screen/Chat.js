import { useNavigation } from "@react-navigation/native";
import { View ,Text, SafeAreaView, ScrollView} from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import ChatList from "./ChatList";


const Chat = () => {
  const [userChat, setUserChat] = useState([]);
  const { currentUser } = useAuth();
  const navigation = useNavigation()
  console.log(userChat);

   
  useEffect(() => {
      if (currentUser.uid) {
        db.collection("users").doc(currentUser.uid).collection("chat").onSnapshot(snapshot=>(
          setUserChat(snapshot.docs.map(doc=>({
            uid:doc.uid,
            data:doc.data()
          })))
        ))
      }
   
  }, [currentUser.uid]);

  const selectUser = (doc)=> {
    let uid = doc.data.uid
    let displayName = doc.data.displayName
    let image = doc.data.image
    if (currentUser.uid) {
      db.collection("users").doc(currentUser.uid).collection("chat").doc(uid).collection('message')
      
    }
    navigation.navigate("SendMessage",{displayName,image,uid })
    
  }


  return (
    <>
    <SafeAreaView>
        <ScrollView>
    <View style={{marginBottom:10}}>
      <Text></Text>
    
    </View>
    {userChat.map((doc,i)=>(
      <ChatList  
      key={i}
      doc={doc}
      selectUser={selectUser}
   />
    ))}
    </ScrollView>
    </SafeAreaView>
    </>
  );
};


export default Chat;