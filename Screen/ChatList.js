import { View, Text,StyleSheet,Image, TouchableOpacity, SafeAreaView, ScrollView} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { db } from "../firebase";

const ChatList = ({doc,selectUser}) => {

  const {currentUser} = useAuth()
  const uid = doc.data.uid

  const [lastMessage,setLastMessage] = useState("")

  const generateId = uid > currentUser.uid? currentUser.uid + "-" + uid : uid + "-" + currentUser.uid;  

  useEffect(() => {
      // if (generateId) {
      const unSub = db.collection("chat").doc(generateId).collection("messages")
       .orderBy("createdAt", "desc").onSnapshot(snapshot=>(
        setLastMessage(snapshot.docs[0]?.data())
      ))
    // }
    return ()=> unSub()
  }, [])
  
  return (
   <SafeAreaView>
     <TouchableOpacity onPress={()=>selectUser(doc)}>
      <View style={styles.container}>
      <View style={styles.profle}>
        <View style={styles.image}>
            <Image style={{width:70,height:70,borderRadius:50}} source={{uri:doc.data.image}} alt="s" />
        </View>
        <View style={styles.name}>
            <Text style={{fontSize:20,fontWeight:"700"}}>{doc.data.displayName}</Text>
            <Text>{lastMessage ? lastMessage.text : null}</Text>
        </View>
      </View>
      <View>
        <Text>{lastMessage ? new Date(lastMessage.createdAt?.toDate()).toLocaleTimeString("en-US",{hour: 'numeric', hour12: true }):null}</Text>
      </View>
    </View>
    </TouchableOpacity>
   </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container : {
        display:"flex",
        width: "100%",
        justifyContent:"space-between",
        alignContent:"center",
        alignItems:"center",
        flexDirection:"row",
        padding:6,
        height:90,
        paddingLeft:18,
        paddingRight:18,
        borderBottomWidth:1,
        borderColor:"#ccc"
    },
    profle : {
        display: "flex",
        flexDirection:"row",
        alignItems:"center"
    },
    image : {
        width:70,
        height:70,
        backgroundColor:"#DEDEDE",
        borderRadius:50
    },
    name : {
        padding:18
    }
})

export default ChatList;
