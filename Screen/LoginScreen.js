import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";
import { sendPasswordResetEmail, signInWithEmailAndPassword, setPersistence,browserSessionPersistence  } from "firebase/auth";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("")
  const navigation = useNavigation();


  const getData = async () => {
    if (!email || !password) {
      alert("Please Enter Email & Password")
    } else {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const currentUser ={
          uid:result.user.uid,
          email:result.user.email
        }
        await AsyncStorage.setItem('userName',JSON.stringify(currentUser))
        db.collection("users").doc(result.user.uid).update({
          isOnline: true,
        });
        // navigation.navigate("Home");
      } catch (error) {
        setErr("invalid login credentials !");
        setEmail("");
        setPassword("");
      }
    }
  };
  const sendEmail = (e) => {
    e.preventDefault()
    sendPasswordResetEmail(auth, forgotEmail)
      .then(res => {
        alert("Please check your email...", res)
      })
      .catch(err => {
        alert("email not found", err)
      })
    setForgotEmail("")
    setModalVisible(!isModalVisible);
  }

  useEffect(() => {
    betData()
  }, [])

  const betData = async () => {
    try {
      const value = await AsyncStorage.getItem('userName')
      if(value !== null) {
        navigation.navigate("Home");
      }
    } catch(e) {
      // error reading value
      console.log(e);
    }
  }
  

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.heading}> Welcome back</Text>
        <Text style={styles.login}>Login to continue!</Text>

        <View>
          <View>
            <Text style={{ color: "red" }}>{err}</Text>
            <Text style={styles.label}>Email ID</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(getEmail) => setEmail(getEmail)}
              type="email"
              placeholder="Email"
            />
          </View>
          <View>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={(getPassword) => setPassword(getPassword)}
              placeholder="Password"
              secureTextEntry={true}
            />
            <Text onPress={sendEmail} style={styles.link}>Forget Password?</Text>
          </View>
          <Text style={styles.button} onPress={getData}>Login</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.sign}>I'm a new user SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal isVisible={isModalVisible}
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        hasBackdrop={true}
      >

        <View style={{ backgroundColor: "white", width: "100%", height: "auto", padding: 8 }}>
          <Text style={{ textAlign: "center", fontSize: 24, margin: 6 }}>Reset Your Password ?</Text>
          <Text style={styles.label}>Enter Your Email Id</Text>
          <TextInput style={styles.input} value={forgotEmail} onChangeText={(text) => setForgotEmail(text)} placeholder="Enter Your Email Id" />
          <Text style={styles.button} title="Hide modal" onPress={sendEmail} >Send</Text>
        </View>
      </Modal>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    padding: 24,
    justifyContent: "center"
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold"
  },
  login: {
    fontSize: 18,
    marginLeft: 8
  },
  label: {
    fontSize: 16,
    color: "coolGray",
    margin: 8
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    borderColor: "#aeaeae"
  },
  link: {
    fontSize: 18,
    textAlign: "center",
    margin: 16
  },
  button: {
    backgroundColor: "#df2349",
    textAlign: "center",
    padding: 12,
    borderRadius: 8,
    color: "white",
    fontSize: 21,
    marginTop: 8
  },
  sign: {
    textAlign: "center",
    margin: 12,
    fontSize: 16,
    color: "gray"
  }
});