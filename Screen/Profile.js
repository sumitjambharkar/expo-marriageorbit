import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from 'react-native-paper';
import * as ImagePicker from "expo-image-picker"; // not react-image-picker
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

const Profile = () => {

  const { logout, currentUser } = useAuth()
  const [show, setShow] = useState(true)

  const [data, setData] = useState("");
  const [displayName, setDisplayName] = useState("")
  const [number, setNumber] = useState("")
  const [birth, setBirth] = useState("")
  const [country, setCountry] = useState("")
  const [height, setHeight] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [pic, setPic] = useState("");
  const [religion, setReligion] = useState("")
  const [caste, setCaste] = useState("")
  const [tounge, setTounge] = useState("")
  const [maritalStatus, setMaritalStatus] = useState("")
  const [about, setAbout] = useState("")
  const [showSec, setShowSec] = useState(true)
  const [work, setWork] = useState("")
  const [qualification, setQualification] = useState("")
  const [income, setIncome] = useState("")

  const editData = () => {
    setShow(false)
    setNumber(data.number)
    setDisplayName(data.displayName)
    setBirth(data.birth)
    setHeight(data.height)
    setMaritalStatus(data.maritalStatus)
    setAbout(data.about)
    setShowSec(true)
  }

  const firstData = () => {
    setShow(true)
    db.collection("users").doc(currentUser.uid).update({
      about: about,
      displayName: displayName,
      number: number,
      birth: birth,
      height: height,
      maritalStatus: maritalStatus
    });
  }

  const secondData = () => {
    setShow(true)
    db.collection("users").doc(currentUser.uid).update({
      country: country,
      state: state,
      city: city,
      religion: religion,
      community: caste,
      tounge: tounge,
      qaulification: qualification,
      work: work,
      income: income
    });
  }


  const editDataSe = () => {
    setShowSec(false)
    setCountry(data.country)
    setState(data.state)
    setCity(data.city)
    setReligion(data.religion)
    setCaste(data.community)
    setTounge(data.tounge)
    setQualification(data.qaulification)
    setWork(data.work)
    setIncome(data.income)

  }

  useEffect(() => {
    if (currentUser.uid) {
      db.collection("users")
        .doc(currentUser.uid)
        .onSnapshot((snapshot) => {
          setData(snapshot.data());
        });
    }
  }, [currentUser.uid]);

  function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      try {
        const imgRef = ref(storage, `avatar/${new Date().getTime()} - ${result.uri.split('/').pop()}`)
        const img = await fetch(result.uri);
        const bytes = await img.blob();
        const snap = await uploadBytes(imgRef, bytes);
        const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
        await updateDoc(doc(db, "users", currentUser.uid), {
          image: url,
          avatarPath: snap.ref.fullPath,
        });
        console.log(url);
        setPic("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>

      <SafeAreaView>
        {show ? <>
          <ScrollView>
            <View style={styles.section}>
              <View style={{ backgroundColor: "#df2349", padding: 10 }}>
                <View style={styles.container}>
                  <Text style={{ fontSize: 18, color: "white" }}>MarriageOrbit</Text>
                  <Text style={{ fontSize: 18, color: "white" }} onPress={logout}>
                    Logout
                  </Text>
                </View>

                <View style={styles.logo} >
                  <Image style={{ width: 150, height: 150, backgroundColor: "#DEDEDE", borderRadius: 70 }} source={{ uri: data?.image ? data?.image : "https://d39ayi7b6b3haj.cloudfront.net/premium/assets/default-avatar-ef7fc5889c76d343b51f18adf8ac96d59cb7a18b803df1aa11ab30521f574165.png" }} />
                </View>
              </View>

              <View style={{ display: "flex", flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
                <View style={{ width: "35%", padding: 15 }}>
                  <Text style={{ fontSize: 18, }}>Name   </Text>
                </View>
                <View style={{ width: "65%", paddingTop: 15 }}>
                  <Text style={{ fontSize: 18, }}>{data.displayName} </Text>
                </View>
              </View>

              <View style={{ display: "flex", flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
                <View style={{ width: "35%", padding: 15 }}>
                  <Text style={{ fontSize: 18, }}>Gender </Text>
                </View>
                <View style={{ width: "65%", paddingTop: 15 }}>
                  <Text style={{ fontSize: 18, }}>{data.gender}</Text>
                </View>
              </View>

              <View style={{ display: "flex", flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
                <View style={{ width: "35%", padding: 15 }}>
                  <Text style={{ fontSize: 18, }}>Age       </Text>
                </View>
                <View style={{ width: "65%", paddingTop: 15 }}>
                  <Text style={{ fontSize: 18, }}>{calculate_age(new Date(data.birth))}</Text>
                </View>
              </View>

              <View style={{ display: "flex", flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
                <View style={{ width: "35%", padding: 15 }}>
                  <Text style={{ fontSize: 18, }}>Height   </Text>
                </View>
                <View style={{ width: "65%", paddingTop: 15 }}>
                  <Text style={{ fontSize: 18, }}>{data.height} </Text>
                </View>
              </View>

              <View style={{ display: "flex", flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
                <View style={{ width: "35%", padding: 15 }}>
                  <Text style={{ fontSize: 18, }}>Mobile No  </Text>
                </View>
                <View style={{ width: "65%", paddingTop: 15 }}>
                  <Text style={{ fontSize: 18, }}>{data.number}</Text>
                </View>
              </View>

              <View style={{ display: "flex", flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
                <View style={{ width: "35%", padding: 15 }}>
                  <Text style={{ fontSize: 18, }}>Email Id</Text>
                </View>
                <View style={{ width: "65%", paddingTop: 15 }}>
                  <Text style={{ fontSize: 18, }}>{data.email}</Text>
                </View>
              </View>

              <View style={{ display: "flex", flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
                <View style={{ width: "35%", padding: 15 }}>
                  <Text style={{ fontSize: 18, }}>City </Text>
                </View>
                <View style={{ width: "65%", paddingTop: 15 }}>
                  <Text style={{ fontSize: 18, }}>{data.city}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={editData}>
                <View style={{ display: "flex", alignItems: "center" }}>
                  <Text style={styles.button}>Edit Profile</Text>
                </View>
              </TouchableOpacity>

            </View>

          </ScrollView>
        </> : <>
          {showSec ? <>
            <ScrollView style={{ paddingTop: 12 }}>
              <View style={{ padding: 12, backgroundColor: "#df2349", marginTop: 12 }}>
                <Text style={{ color: "#fff", fontSize: 24 }}>Edit Profile</Text>
              </View>
              <TouchableOpacity onPress={pickImage}>
                <View style={styles.img}>
                  <Image style={{ width: 150, height: 150, backgroundColor: "#DEDEDE", borderRadius: 70 }} source={{ uri: data.image ? data.image : "https://cdn1.iconfinder.com/data/icons/linkedin-ui-glyph/48/Sed-16-512.png" }} />
                  <Text style={{ backgroundColor: "#ffa500", fontSize: 24, width: "10%", borderRadius: 24, textAlign: "center", marginTop: 150, position: "absolute", color: "white" }}>+</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.form}>

                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setAbout(text)}
                  value={about}
                  placeholder="Type here to"
                  mode="outlined"
                  label="About Your Self"
                  activeOutlineColor="#df2349"
                ></TextInput>

                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setDisplayName(text)}
                  value={displayName}
                  placeholder="Type here to"
                  mode="outlined"
                  label="Full Name"
                  activeOutlineColor="#df2349"
                ></TextInput>

                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={(text) => setNumber(text)}
                  placeholder="Type here to"
                  value={number}
                  activeOutlineColor="#df2349"
                  mode="outlined"
                  label="Number"
                  maxLength={10}
                ></TextInput>

                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setBirth(text)}
                  value={birth}
                  activeOutlineColor="#df2349"
                  placeholder="Type here to"
                  mode="outlined"
                  label="Birth"
                ></TextInput>

                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setHeight(text)}
                  value={height}
                  activeOutlineColor="#df2349"
                  placeholder="Type here to"
                  mode="outlined"
                  label="Height"
                ></TextInput>

                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setMaritalStatus(text)}
                  value={maritalStatus}
                  activeOutlineColor="#df2349"
                  placeholder="Type here to"
                  mode="outlined"
                  label="Marital Status"
                ></TextInput>

                <TouchableOpacity onPress={editDataSe}>
                  <View style={{ display: "flex", alignItems: "center" }}>
                    <Text style={styles.button}>NEXT</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={firstData}>
                  <View style={{ display: "flex", alignItems: "center" }}>
                    <Text style={styles.button}>SKIP & SUBMIT</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </> :
            <>
              <ScrollView style={{ paddingTop: 12 }}>
                <View style={{ padding: 12, backgroundColor: "#df2349", marginTop: 12 }}>
                  <Text style={{ color: "#fff", fontSize: 24 }}>Edit Profile</Text>
                </View>
                <View style={styles.form}>

                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => setCountry(text)}
                    value={country}
                    placeholder="Type here to"
                    mode="outlined"
                    label="Country"
                    activeOutlineColor="#df2349"
                  ></TextInput>

                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => setState(text)}
                    value={state}
                    placeholder="Type here to"
                    mode="outlined"
                    label="State"
                    activeOutlineColor="#df2349"
                  ></TextInput>

                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => setCity(text)}
                    placeholder="Type here to"
                    value={city}
                    activeOutlineColor="#df2349"
                    mode="outlined"
                    label="City"
                    maxLength={10}
                  ></TextInput>

                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => setReligion(text)}
                    value={religion}
                    activeOutlineColor="#df2349"
                    placeholder="Type here to"
                    mode="outlined"
                    label="Religion"
                  ></TextInput>

                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => setCaste(text)}
                    value={caste}
                    activeOutlineColor="#df2349"
                    placeholder="Type here to"
                    mode="outlined"
                    label="Caste"
                  ></TextInput>

                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => setTounge(text)}
                    value={tounge}
                    activeOutlineColor="#df2349"
                    placeholder="Type here to"
                    mode="outlined"
                    label="Mother Tounge"
                  ></TextInput>

                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => setQualification(text)}
                    value={qualification}
                    activeOutlineColor="#df2349"
                    placeholder="Type here to"
                    mode="outlined"
                    label="Qualification"
                  ></TextInput>

                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => setWork(text)}
                    value={work}
                    activeOutlineColor="#df2349"
                    placeholder="Type here to"
                    mode="outlined"
                    label="Occupation"
                  ></TextInput>

                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => setIncome(text)}
                    value={income}
                    activeOutlineColor="#df2349"
                    placeholder="Type here to"
                    mode="outlined"
                    label="Income"
                  ></TextInput>

                  <TouchableOpacity onPress={secondData}>
                    <View style={{ display: "flex", alignItems: "center" }}>
                      <Text style={styles.button}>SUBMIT</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setShowSec(true)}>
                    <View style={{ display: "flex", alignItems: "center" }}>
                      <Text style={styles.button}>PREVI</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </>
          }
        </>}
      </SafeAreaView>

    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  section: {
    height: "100%",
    width: "100%",
    paddingTop: 30
  },
  container: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    padding: 10,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    marginTop: 30,
  },
  button: {
    width: "50%",
    marginTop: 12,
    textAlign: "center",
    backgroundColor: "#df2349",
    padding: 10,
    letterSpacing: 2,
    borderRadius: 20,
    overflow: "hidden",
    borderRadius: 24,
    borderColor: "#df2349",
    borderWidth: 1,
    color: "white",
    marginBottom:12

  },
  screen: {
    width: "100%",
    height: "100%",
  },
  input: {
    margin: 4,
    width: "100%",
    
    borderRadius: 10,
  },
  img: {
    width: "100%",
    backgroundColor: "#df2349",
    alignItems: "center",
    padding: 15,
    position: "relative"
  },
  lable: {
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 2,
    marginTop: 4
  },
  text: {
    borderColor: "#df2349",
    borderWidth: 1,
    margin: 4,
    width: "100%",
    borderRadius: 10,
    padding: 8
  },
  form: {
    padding: 10,
  },

});
