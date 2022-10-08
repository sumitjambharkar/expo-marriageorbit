import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ImageBackground, StyleSheet, Text, View,TouchableOpacity } from "react-native";

const image = { uri: "https://res.cloudinary.com/clennation/image/upload/v1654516906/photo_ck06wi.jpg" };

const HomeScreen = () => {
    const navigation = useNavigation()

    return(
      <View style={styles.container}>
      <ImageBackground resizeMode="cover" source={image} style={styles.image}>
        <View style={styles.login}>
        <TouchableOpacity onPress={()=>navigation.navigate('Login')} >
        <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <Text></Text>
        <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
        <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:"100%",
    width:"100%"
  },
  image: {
    flex: 1,
    width:"100%",
    justifyContent:'flex-end',
    
  },
  login: {
    color: "white",
    fontSize:30,
    textAlign: "center",
    marginBottom:80,
  },
  text: {
    color: "white",
    fontSize:20,
    fontWeight:"bold",
    textAlign: "center",
    backgroundColor:"#e4910d",
    marginLeft:60,
    marginRight:60,
    borderRadius:24,
    padding:10,
    borderColor:"#ccc",
    borderWidth:1,
    overflow: "hidden",
  
  }
});


export default HomeScreen;