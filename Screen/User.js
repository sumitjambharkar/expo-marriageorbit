import { View, Text,StyleSheet,Image,TouchableOpacity } from 'react-native'
import React from 'react';
import { useNavigation } from "@react-navigation/native";


const User = ({doc,birth}) => {
    console.log(doc.id);

    const navigation = useNavigation();

    function calculate_age(dob) { 
        var diff_ms = Date.now() - dob.getTime();
        var age_dt = new Date(diff_ms); 
      
        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }

  return (
    <View style={{width:"100%",height:"100%",display:"flex",alignItems:"center"}}>
       <View style={styles.details}>
       <View style={{height:"80%",width:"100%",alignItems:"center"}}><Image style={styles.image} source={{uri:doc.data.image}}alt="image"/></View>
       <View style={styles.card}>
       <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
       <TouchableOpacity onPress={()=>navigation.navigate("FullScreen",{uid:doc.data.uid})}>
      <View style={{display:"flex",justifyContent:"center",flexDirection:"row",alignItems:"center"}}>
         <Text style={styles.title}>{doc.data.displayName}</Text>
       <View>{doc.data.isOnline? <View style={styles.online}></View> : <View style={styles.offline}></View>}
       </View>
      </View>
       <View>
       <Text style={styles.text}>Age       :  {calculate_age(new Date(birth))} Yrs </Text>
       <Text style={styles.text}>Height  :  5.2</Text>
       </View>
       </TouchableOpacity>
       </View>
       </View>
       </View>
    </View>
  )
}

const styles = StyleSheet.create({
    details : {
        position:"absolute",
        paddingTop:30,
        paddingBottom:6,
        bottom:0,
        width:"100%",
        height: "100%",
        borderBottomLeftRadius:24,
        borderBottomRightRadius:24,
        opacity:0.9,
      
    
    },
    image : {
        height:"100%",
        width:"100%",
        resizeMode:"cover",
        position:"relative",
        borderTopRightRadius:24,
        borderTopLeftRadius:24,

    },
    title : {
        fontSize:24,
        fontWeight:"bold",
        color:"#FFA500"
    },
    text : {
        fontSize:18,
        fontWeight:"bold",
        color:"#FFA500"
    },
    card : {
        paddingLeft:"5%",
        paddingTop:"5%",
        backgroundColor:"black",
        height:"30%",
        borderBottomLeftRadius:24,
        borderBottomRightRadius:24
    },
    online : {
        backgroundColor:"#34eb52",
        borderRadius:70,
        width:10,
        height:10,
        marginLeft:10,
        marginTop:5

    },
    offline : {
        backgroundColor:"red",
        borderRadius:70,
        width:10,
        height:10,
        marginLeft:10,
        marginTop:5
    }
})

export default User;