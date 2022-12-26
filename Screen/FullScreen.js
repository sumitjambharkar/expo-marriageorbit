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
import { ArrowLeftIcon } from 'react-native-heroicons/outline';

const FullScreen = ({ route }) => {

  const { currentUser } = useAuth()
  const navigation = useNavigation()
  const user = route.params;

  console.log(user.uid);
  const [data, setData] = useState("");
  const [profile, setProfile] = useState("")

  useEffect(() => {
    if (currentUser.uid) {
      db.collection("users").doc(currentUser.uid).onSnapshot(snapshot => (
        setProfile(snapshot.data())
      ))
    }
  }, [])

  const getData = async () => {
    const uid = data.uid
    const displayName = data.displayName
    const image = data.image
    if (currentUser.uid) {
      db.collection("users").doc(currentUser.uid).collection("chat").doc(uid).set({
        uid,
        displayName,
        image: image || null,
      })
      if (uid) {
        db.collection("users").doc(uid).collection("chat").doc(currentUser.uid).set({
          uid: currentUser.uid,
          displayName: profile.displayName,
          image: profile.image || null,
        })
      }
      navigation.navigate("Chat", {
        uid, displayName, image
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
          <View style={{ position: "relative" }}>
            <Image style={{ backgroundColor: "#DEDEDE", height: 500, width: "100%" }} source={{ uri: data.image }} alt="image" />
            <Text onPress={() => navigation.navigate("Home")} style={{ fontSize: 50, position: "absolute", marginTop: "10%", marginLeft: 4, color: "white" }}>
              <ArrowLeftIcon size={30} color={"white"} />
            </Text>
            <Text style={{ fontSize: 30, position: "absolute", marginTop: "110%", marginLeft: 4, color: "#fff" }}>
              {data.displayName}
            </Text>
          </View>
          <View style={{ display: "flex", justifyContent: "space-around", flexDirection: "row" }}>
            <TouchableOpacity onPress={() => { Linking.openURL(`tel:${data.number}`); }}>
              <Text style={{ margin: 12, fontSize: 18, fontWeight: "500", borderColor: "#df2349", borderWidth: 1, padding: 12, borderRadius: 12, backgroundColor: "#df2349", color: "#fff" }}>
                Call Now
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={getData}>
              <Text style={{ margin: 12, fontSize: 18, fontWeight: "500", borderColor: "#df2349", borderWidth: 1, padding: 12, borderRadius: 12, backgroundColor: "#df2349", color: "#fff" }}>
                Chat Now
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{ margin: 12, fontSize: 24, fontWeight: "500", color: "#df2349" }}>
              Personal information
            </Text>
          </View>
          <View
            style={{
              borderBottomColor: '#df2349',
              borderBottomWidth: 1,
            }}
          />
          <View>
            <Text style={{ margin: 12, fontSize: 24, fontWeight: "500", color: "#df2349" }}>
              Basic Details
            </Text>
            <View style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", margin: 12 }}><Text style={{ width: 150, fontSize: 18, color: "#df2349" }}>Name</Text><Text style={styles.text}>{data.displayName}</Text></View>
            <View style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", margin: 12 }}><Text style={{ width: 150, fontSize: 18, color: "#df2349" }}>D.O.B</Text><Text style={styles.text}>{data.birth}</Text></View>
            <View style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", margin: 12 }}><Text style={{ width: 150, fontSize: 18, color: "#df2349" }}>Height</Text><Text style={styles.text}>{data.height}</Text></View>
            <View style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", margin: 12 }}><Text style={{ width: 150, fontSize: 18, color: "#df2349" }}>Age</Text><Text style={styles.text}>{calculate_age(new Date(data.birth))}</Text></View>
            <View style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", margin: 12 }}><Text style={{ width: 150, fontSize: 18, color: "#df2349" }}>Marital Status</Text><Text style={styles.text}>{data.maritalStatus}</Text></View>
            <View style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", margin: 12 }}><Text style={{ width: 150, fontSize: 18, color: "#df2349" }}>Caste</Text><Text style={styles.text}>{data.community}</Text></View>
            <View style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", margin: 12 }}><Text style={{ width: 150, fontSize: 18, color: "#df2349" }}>Religion</Text><Text style={styles.text}>{data.religion}</Text></View>

            <View style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", margin: 12 }}><Text style={{ width: 150, fontSize: 18, color: "#df2349" }}>Mother Tounges</Text><Text style={styles.text}>{data.tounge}</Text></View>
            <View style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", margin: 12 }}><Text style={{ width: 150, fontSize: 18, color: "#df2349" }}>Manglik</Text><Text style={styles.text}>{data.manglik}</Text></View>
          </View>
          <View
            style={{
              borderBottomColor: '#df2349',
              borderBottomWidth: 1,
            }}
          />
          <View>
            <Text style={{ margin: 12, fontSize: 24, fontWeight: "500", color: "#df2349" }}>
              Contact Details
            </Text>
            <View style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", margin: 12 }}><Text style={{ width: 150, fontSize: 18, color: "#df2349" }}>Personal Number</Text><Text style={styles.text}>{data.number}</Text></View>
            <View style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", margin: 12 }}><Text style={{ width: 150, fontSize: 18, color: "#df2349" }}>Email Id</Text><Text style={styles.text}>{data.email}</Text></View>
          </View>
          <View
            style={{
              borderBottomColor: '#df2349',
              borderBottomWidth: 1,
            }}
          />
          <View>
            <Text style={{ margin: 12, fontSize: 24, fontWeight: "500", color: "#df2349" }}>
              Professional Information
            </Text>
            <View style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", margin: 12 }}><Text style={{ width: 150, fontSize: 18, color: "#df2349" }}>Education</Text><Text style={styles.text}>{data.qaulification}</Text></View>
            <View style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", margin: 12 }}><Text style={{ width: 150, fontSize: 18, color: "#df2349" }}>Occupation</Text><Text style={styles.text}>{data.work}</Text></View>
          </View>
          <View
            style={{
              borderBottomColor: '#df2349',
              borderBottomWidth: 1,
            }}
          />
          <View>
            <Text style={{ margin: 12, fontSize: 24, fontWeight: "500", color: "#df2349" }}>
              Location
            </Text>
            <View style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", margin: 12 }}><Text style={{ width: 150, fontSize: 18, color: "#df2349" }}>Country</Text><Text style={styles.text}>{data.country}</Text></View>
            <View style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", margin: 12 }}><Text style={{ width: 150, fontSize: 18, color: "#df2349" }}>City</Text><Text style={styles.text}>{data.city}</Text></View>
            <View style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", margin: 12 }}><Text style={{ width: 150, fontSize: 18, color: "#df2349" }}>State</Text><Text style={styles.text}>{data.state}</Text></View>
          </View>
          <View
            style={{
              borderBottomColor: '#df2349',
              borderBottomWidth: 1,
            }}
          />
          <View>
            <Text style={{ margin: 12, fontSize: 24, fontWeight: "500", color: "#df2349" }}>
              About Me
            </Text>
            <View style={{ padding: 8 }}><Text style={styles.text}>{data.about}</Text></View>
            <View style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", margin: 12 }}><Text style={{ width: 150, fontSize: 18, color: "#df2349" }}>Eating</Text><Text style={styles.text}>{data.diet}</Text></View>
            <View style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", margin: 12 }}><Text style={{ width: 150, fontSize: 18, color: "#df2349" }}>Living Family</Text><Text style={styles.text}>{data.family}</Text></View>
            <View style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", margin: 12 }}><Text style={{ width: 150, fontSize: 18, color: "#df2349" }}>Hobbies</Text><Text style={styles.text}>{data.hobbies}</Text></View>
            <View style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", margin: 12 }}><Text style={{ width: 150, fontSize: 18, color: "#df2349" }}>Partner Expectation</Text><Text style={styles.text}>{data.partner}</Text></View>
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
  text: {
    color: "#df2349",
    fontSize: 18,
  }

});