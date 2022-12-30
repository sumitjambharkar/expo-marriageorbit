import { useNavigation } from "@react-navigation/native";
import React,{useState,useEffect} from "react";
import { ImageBackground, StyleSheet, Text, View,TouchableOpacity,Button } from "react-native";
const image = { uri: "https://res.cloudinary.com/clennation/image/upload/v1654516906/photo_ck06wi.jpg" };
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';


WebBrowser.maybeCompleteAuthSession();


const HomeScreen = () => {

  // const {signInWithGoogle} = useAuth()
  const [accessToken,setAccessToken] = useState(null)
  const [user,setUser]  = useState(null)
  
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId:'657323529084-42vd1md0o469ds8c85or9tvq956svn5l.apps.googleusercontent.com',
      androidClientId:'657323529084-ub45tq20d5ol364s13i44hipdc6kkinc.apps.googleusercontent.com'
    },
  );

  

  useEffect(() => {
    if (response?.type === 'success') {
      setAccessToken(response.authentication.accessToken)
      accessToken && fetchUserInfo();
    }
  }, [response,accessToken]);


    const navigation = useNavigation()

  const fetchUserInfo =async()=>{
    let response = fetch("https://www.googleapis.com/userinfo/v2/me",{
      headers:{
        authentication:`Bearer${accessToken}`
      }
    })
    const userRes = response.json()
    setUser(userRes)
  }

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
        <Text></Text>
        
        <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
      }}
    />
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
    backgroundColor:"#df2349",
    marginLeft:60,
    marginRight:60,
    borderRadius:24,
    padding:10,
    borderColor:"#df2349",
    borderWidth:1,
    overflow: "hidden",
  
  }
});


export default HomeScreen;