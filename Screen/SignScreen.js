import React, { useState,useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import DateField from "react-native-datefield";
import { auth, createUserCollecton } from "../firebase";
import { SafeAreaView, View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import {SelectList} from 'react-native-dropdown-select-list';
import AsyncStorage from "@react-native-async-storage/async-storage";

const isProfile = [
  {key: 'My Son', value: 'My Son'},
  {key: 'My Self', value: 'My Self'},
  {key: 'My Daughter', value: 'My Daughter'},
  {key: 'My Sister', value: 'My Sister'},
  {key: 'My Brother', value: 'My Brother'},
];
const isGender = [{value:"Male"},{value:"Female"}]
const SignScreen = () => {
  
  const [profile, setProfile] = useState("");
  const [err, setErr] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [number, setNumber] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const birth = birthDate.toString().slice(4, 15);

  const getData = async () => {
    // const dateOfBirth = birth.toString().slice(4, 15);
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserCollecton(user, {
        displayName,
        birth,
        number,
        gender,
        profile,
      });
      await AsyncStorage.setItem('userName',JSON.stringify(user))
      navigation.navigate("Personal Details");
    } catch (err) {
      navigation.navigate("SignUp");
      setErr("email already exists");
    }
  };

  useEffect(() => {
    betData()
  }, [])

  const betData = async () => {
    try {
      const value = await AsyncStorage.getItem('userName')
      if(value) {
        navigation.navigate("Personal Details");
      }
    } catch(e) {
      // error reading value
      console.log(e);
    }
  }


  return (
    <SafeAreaView>
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Welcome</Text>
        <Text style={styles.sign}>Sign up to continue!</Text>
        <Text style={{ color: "red" }}>{err}</Text>
        <View>
          <SelectList
              boxStyles={{borderColor: '#ccc'}}
              placeholder="Select Profile For"
              setSelected={setProfile}
              data={isProfile}
            />
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={displayName}
            onChangeText={(itemName) => setDisplayName(itemName)}
            placeholder="Full Name"
            type="text"
          />
          <Text style={styles.label}>Gender</Text>
          <SelectList
              boxStyles={{borderColor: '#ccc'}}
              placeholder="Select Gender"
              setSelected={setGender}
              data={isGender}
            />
          <Text style={styles.label}>Mobile No</Text>
          <TextInput
            style={styles.input}
            value={number}
            onChangeText={(itemName) => setNumber(itemName)}
            placeholder="Number"
            keyboardType="numeric"
            maxLength={10}
          />
          <Text style={styles.label}>Birth Date</Text>
          <DateField
            labelDate="Day"
            labelMonth="Month"
            labelYear="Year"
            value={birthDate}
            styleInput={styles.inputBorder}
            onSubmit={(textBirth) => setBirthDate(textBirth)}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(itemName) => setEmail(itemName)}
            placeholder="Email"
            type="email"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(itemName) => setPassword(itemName)}
            placeholder="password"
            secureTextEntry={true}
            
          />
          <TouchableOpacity onPress={getData}>
            <Text style={styles.button}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    padding: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: "600",
  },
  sign: {
    fontSize: 18,
    color:"#494B4D"
  },
  label: {
    fontSize: 16,
    color: "#494B4D",
    marginBottom: 4,
    marginTop: 4,
  },
  input: {
    height: 45,
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    borderColor: "#ccc",
  },
  link: {
    fontSize: 18,
    textAlign: "center",
    margin: 16,
  },
  button: {
    backgroundColor: "#df2349",
    textAlign: "center",
    padding: 12,
    borderRadius: 8,
    color: "white",
    fontSize: 21,
    marginTop: 21,
  },
  select: {
    borderWidth: 1,
    borderColor: "green",
    width: 200,
    backgroundColor: "red",

  },
  inputBorder: {
    width: '30%',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    padding:6,
  },
});
