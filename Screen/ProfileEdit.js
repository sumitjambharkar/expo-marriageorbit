import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from "react-native";
import React from "react";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { updateEmail, updatePassword } from "firebase/auth";
import * as ImagePicker from "expo-image-picker"; // not react-image-picker
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { TextInput } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';

const mang = [{ id: "1", value: "Manglik" }, { id: "2", value: "Non-Manglik" }]

const fami = [{ id: "1", value: "Joint Family" }, { id: "2", value: "Nuclear Family" }, { id: "3", value: "Other" }]

const ProfileEdit = () => {
  const { currentUser } = useAuth()
  const [data, setData] = useState("");
  const [pic, setPic] = useState("");
  const [manglik, setManglik] = useState("")
  const [about, setAbout] = useState("")
  const [partner, setPartner] = useState("")
  const [hobbies, setHobbies] = useState("")
  const [family, setFamily] = useState("")
  const [error, setError] = useState("")
  console.log(data);
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

  useEffect(() => {
    if (currentUser.uid) {
      db.collection("users")
        .doc(currentUser.uid)
        .onSnapshot((snapshot) => {
          setData(snapshot.data());
        });
    }
  }, [currentUser.uid]);

  const submit = () => {
    if (!manglik || !about || !hobbies || !partner || !family) {
      setError("fill out the Details")
    } else {
      if (currentUser.uid) {
        db.collection("users").doc(currentUser.uid).update({
          manglik: manglik,
          hobbies: hobbies,
          partner: partner,
          about: about,
          family: family
        })
      }
    }
  }
  return (
    <SafeAreaView style={styles.screen}>
      <>
        <ScrollView>
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.img}>
              <Image style={{ width: 150, height: 150, borderRadius: 70, backgroundColor: "#DEDEDE" }} source={{ uri: data?.image || "https://cdn1.iconfinder.com/data/icons/linkedin-ui-glyph/48/Sed-16-512.png" }} />
              <Text style={{ backgroundColor: "#ffa500", fontSize: 24, width: "10%", borderRadius: 24, textAlign: "center", marginTop: 150, position: "absolute", color: "white" }}>+</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.form}>
            <Text style={{ color: "red" }}>{error}</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setAbout(text)}
              placeholder="Type here to"
              value={about}
              activeOutlineColor="#df2349"
              mode="outlined"
              label="About Your Self"
            ></TextInput>

            <TextInput
              style={styles.input}
              onChangeText={(text) => setHobbies(text)}
              value={hobbies}
              activeOutlineColor="#df2349"
              placeholder="Type here to"
              mode="outlined"
              label="Hobbies"
            ></TextInput>

            <TextInput
              style={styles.input}
              onChangeText={(text) => setPartner(text)}
              value={partner}
              activeOutlineColor="#df2349"
              placeholder="Type here to"
              mode="outlined"
              label="Partner Expectation"
            ></TextInput>

            <SelectList
              boxStyles={{ marginTop: 12 }}
              placeholder="Manglik"
              setSelected={setManglik}
              data={mang}

            />
            <SelectList
              boxStyles={{ marginTop: 12 }}
              placeholder="Family"
              setSelected={setFamily}
              data={fami}

            />

            <TouchableOpacity onPress={submit}>
              <View style={{ display: "flex", alignItems: "center" }}>
                <Text style={styles.button}>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
  },
  input: {
    marginTop: 12,
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
  button: {
    width: "50%",
    marginTop: 20,
    height: 40,
    textAlign: "center",
    backgroundColor: "#df2349",
    borderRadius: 20,
    padding: 10,
    letterSpacing: 2,
    borderColor: "#df2349",
    borderWidth: 1,
    overflow: "hidden",
    color: "white"
  },
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
  }
});

export default ProfileEdit;
