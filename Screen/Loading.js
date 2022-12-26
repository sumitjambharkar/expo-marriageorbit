import React from 'react';
import { View,StyleSheet,Text } from 'react-native';


const Loading = () => {
  return (
    <>
    <View style={styles.container}>
      <View>
      <Text style={styles.text}>Loading....</Text>
      </View>
    </View>
    </>
  )
}

export default Loading;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    alignContent:"center",
    
  },
  text : {
    color:"red",
    marginTop:"50%",
    fontSize:25,
    fontWeight:"700"
  }
})