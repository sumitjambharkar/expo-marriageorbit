import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Linking } from "react-native";
import {ArrowLeftIcon} from 'react-native-heroicons/outline';

const FullScreen = ({route}) => {
  
  const {currentUser } = useAuth()
  const navigation = useNavigation()
  const user = route.params;
  
  console.log(user.uid);
  const [data, setData] = useState("");
  const [profile,setProfile] = useState("")

  useEffect(() => {
    if (currentUser.uid) {
      db.collection("users").doc(currentUser.uid).onSnapshot(snapshot=>(
        setProfile(snapshot.data())
      ))
    }
  }, [])

  const getData =async() => {
    const uid = data.uid
    const displayName = data.displayName
    const image = data.image
  if(currentUser.uid){
    db.collection("users").doc(currentUser.uid).collection("chat").doc(uid).set({
      uid,
      displayName,
      image:image || null,
    })
    if (uid) {
      db.collection("users").doc(uid).collection("chat").doc(currentUser.uid).set({
        uid : currentUser.uid,
        displayName: profile.displayName,
        image : profile.image || null,
      })
    }
    navigation.navigate("Chat",{
      uid,displayName,image
      })
  }
  }
  
  function calculate_age(dob) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  useEffect(() => {

    const unSub = db
      .collection("users")
      .doc(user.uid)
      .onSnapshot((snapshot) => setData(snapshot.data()));
    return () => {
      unSub();
    };
  }, []);

  


  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <TouchableOpacity>
          <View style={{position:"relative"}}>
          <Image style={{backgroundColor:"#DEDEDE",height:500,width:"100%"}} source={{uri:data.image}} alt="image"/>
          <Text onPress={()=>navigation.navigate("Home")} style={{fontSize:50,position:"absolute",marginTop:"10%",marginLeft:4,color:"white"}}>
          <ArrowLeftIcon size={30} color={"white"}/>
          </Text>
            <Text style={{fontSize:30,position:"absolute",marginTop:"110%",marginLeft:4,color:"white"}}>
              {data.displayName}
            </Text>
          </View>
          <View style={{display:"flex",justifyContent:"space-around",flexDirection:"row"}}>
            <TouchableOpacity onPress={()=>{Linking.openURL(`tel:${data.number}`);}}>
            <Text style={{margin:12,fontSize:18,fontWeight:"500",borderColor:"black",borderWidth:1,padding:12,borderRadius:12}}>
              Call Now
            </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={getData}>
            <Text style={{margin:12,fontSize:18,fontWeight:"500",borderColor:"black",borderWidth:1,padding:12,borderRadius:12}}>
              Chat Now
            </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{margin:12,fontSize:18,fontWeight:"500"}}>
              Personal information
            </Text>
          </View>
          <View
         style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
           }}
          />
          <View>
            <Text style={{margin:12,fontSize:18,fontWeight:"500"}}>
              Basic Details
            </Text>
            <View style={{display:"flex",justifyContent:"flex-start",flexDirection:"row",margin:12}}><Text style={{width:150}}>Name</Text><Text>{data.displayName}</Text></View>
            <View style={{display:"flex",justifyContent:"flex-start",flexDirection:"row",margin:12}}><Text style={{width:150}}>D.O.B</Text><Text>{data.birth}</Text></View>
            <View style={{display:"flex",justifyContent:"flex-start",flexDirection:"row",margin:12}}><Text style={{width:150}}>Height</Text><Text>{data.height}</Text></View>
            <View style={{display:"flex",justifyContent:"flex-start",flexDirection:"row",margin:12}}><Text style={{width:150}}>Age</Text><Text>{calculate_age(new Date(data.birth))}</Text></View>
            <View style={{display:"flex",justifyContent:"flex-start",flexDirection:"row",margin:12}}><Text style={{width:150}}>Marital Status</Text><Text>{data.maritalStatus}</Text></View>
            <View style={{display:"flex",justifyContent:"flex-start",flexDirection:"row",margin:12}}><Text style={{width:150}}>Caste</Text><Text>{data.religion}</Text></View>
            <View style={{display:"flex",justifyContent:"flex-start",flexDirection:"row",margin:12}}><Text style={{width:150}}>Mother Tounges</Text><Text>{data.tounge}</Text></View>
          </View>
          <View
         style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
           }}
          />
          <View>
            <Text style={{margin:12,fontSize:18,fontWeight:"500"}}>
              Contact Details
            </Text>
            <View style={{display:"flex",justifyContent:"flex-start",flexDirection:"row",margin:12}}><Text style={{width:150}}>Personal Number</Text><Text>{data.number}</Text></View>
            <View style={{display:"flex",justifyContent:"flex-start",flexDirection:"row",margin:12}}><Text style={{width:150}}>Email Id</Text><Text>{data.email}</Text></View>
          </View>
          <View
         style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
           }}
          />
          <View>
            <Text style={{margin:12,fontSize:18,fontWeight:"500"}}>
              Professional Information
            </Text>
            <View style={{display:"flex",justifyContent:"flex-start",flexDirection:"row",margin:12}}><Text style={{width:150}}>Education</Text><Text>{data.qaulification}</Text></View>
            <View style={{display:"flex",justifyContent:"flex-start",flexDirection:"row",margin:12}}><Text style={{width:150}}>Occupation</Text><Text>{data.work}</Text></View>
          </View>
          <View
         style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
           }}
          />
          <View>
            <Text style={{margin:12,fontSize:18,fontWeight:"500"}}>
              Location
            </Text>
            <View style={{display:"flex",justifyContent:"flex-start",flexDirection:"row",margin:12}}><Text style={{width:150}}>City</Text><Text>{data.city}</Text></View>
            <View style={{display:"flex",justifyContent:"flex-start",flexDirection:"row",margin:12}}><Text style={{width:150}}>State</Text><Text>{data.state}</Text></View>
          </View>
          <View
         style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
           }}
          />
          <View>
            <Text style={{margin:12,fontSize:18,fontWeight:"500"}}>
              About Me
            </Text>
            <View style={{display:"flex",justifyContent:"flex-start",flexDirection:"row",margin:12}}><Text style={{width:150}}>Eating</Text><Text>{data.diet}</Text></View>
            <View style={{display:"flex",justifyContent:"flex-start",flexDirection:"row",margin:12}}><Text style={{width:150}}>Living Family</Text><Text>{data.family}</Text></View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FullScreen;

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
  },
  
});