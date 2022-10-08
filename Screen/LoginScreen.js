import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { TextInput, View, Text,StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const navigation = useNavigation();

  const getData = async () => {
    console.log(email, password);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      db.collection("users").doc(result.user.uid).update({
        isOnline: true,
      });
      console.log(result);
      navigation.navigate("Home");
    } catch (error) {
      setErr("invalid login credentials !");
      setEmail("");
      setPassword("");
    }
  };

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
            <Text style={styles.link}>Forget Password?</Text>
          </View>
          <Text style={styles.button} onPress={getData}>Login</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("SignUp")}>
          <Text style={styles.sign}>I'm a new user SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      height: "100%",
      width: "100%",
      padding:24,
      justifyContent:"center"
    },
    heading : {
        fontSize:28,
        fontWeight:"bold"
    },
    login : {
        fontSize:18,
        marginLeft:8
    },
    label : {
        fontSize:16,
        color:"coolGray",
        margin:8
    },
    input : {
        height:50,
        borderWidth:1,
        padding:8,
        borderRadius:8,
        borderColor:"#aeaeae"
    },
    link : {
        fontSize:18,
        textAlign:"center",
        margin:16
    },
    button : {
        backgroundColor:"orange",
        textAlign:"center",
        padding:12,
        borderRadius:8,
        color:"white",
        fontSize:21
    },
    sign : {
        textAlign:"center",
        margin:12,
        fontSize:16,
        color:"gray"
    }
  });