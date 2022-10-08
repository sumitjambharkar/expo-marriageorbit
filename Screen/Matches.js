import React, { useEffect, useState } from "react";
import Swiper from "react-native-swiper";
import { db } from "../firebase";
import { StyleSheet, Text, View} from "react-native";
import User from "./User";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";

const Matches = () => {
  const [loading,setLoading] = useState(false)
  const [data, setData] = useState([]);
  
  const [profile,setProfile] = useState('')
  const {currentUser } = useAuth()
  
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    },1000) 
  },[])
  
  
  useEffect(() => {
    const unSub = db.collection("users").orderBy("createdAt","desc").onSnapshot((snapshot) => {
      setData(
        snapshot.docs
        .filter((doc)=>(doc.id!==currentUser.uid))
        .map((doc) => ({
          id: doc.id,
          data:doc.data()
        }))
      );
      });
      return ()=> unSub()
  },[])

  useEffect(() => {
    if (currentUser.uid) {
      db.collection("users").doc(currentUser.uid).onSnapshot(snapshot=>(
        setProfile(snapshot.data())
      ))
    }
  }, [currentUser.uid])

  return (
    <>
    {loading ? <Loading/> :
    <View style={styles.container}>
      <Swiper
      dotStyle={{display:"none"}}
      activeDotStyle={{display:"none"}}
        >
        {data.filter((doc)=>(profile.gender!==doc.data.gender)).map((doc,i) => (
          <User key={i} birth={doc.data.birth} uid={doc.data.uid} doc={doc} />
        ))}
      </Swiper>
    </View>
        }
        </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 34,
    paddingBottom: 34,
  },
});

export default Matches;
