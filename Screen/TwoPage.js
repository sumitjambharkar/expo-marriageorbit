import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import { View,Text,StyleSheet, TextInput, SafeAreaView, ScrollView } from "react-native";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import SelectDropdown from "react-native-select-dropdown";

const religionArry = ["Hindu","Muslim","Christian","Sikh","Parsi","Jain","Buddhist","Jewish","No_Religion","Spiritual","Other"]

const toungeArry = ['Hindi', 'Marathi', 'Punjabi', 'Bengali', 'Gujarati', 'Urdu', 'Telugu', 'Kannada', 'Tamil', 'Odia' , 'Marwari', 'Aka' ,'Arabic', 'Arunachali' , 'Assamese', 'Awadhi', 'Baluchi', 'Bengali', 'Bhojpuri', 'Bhutia', 'Brahui', 'Brij', 'Burmese', 'Chattisgarhi', 'Chinese', 'Coorgi', 'Dogri', 'English', 'French', 'Garhwali', 'Garo' ,'Gujarati', 'Himachali', 'Pahari', 'Hindi', 'Hindko', 'Kakbarak', 'Kanauji', 'Kannada', 'Kashmiri', 'Khandesi','Khasi','Konkani', 'Koshali', 'Kumaoni', 'Kutchi', 'Ladakhi', 'Lepcha', 'Magahi', 'Maithili', 'Malay', 'Malayalam', 'Manipuri', "Marathi", 'Marwari', 'Miji', 'Mizo', 'Monpa', 'Nepali', 'Odia', 'Pashto', 'Persian', 'Punjabi', 'Rajasthani', 'Russian', "Sanskrit", "Santhali", "Seraiki", "Sindhi", "Sinhala", "Sourashtra", "Spanish", "Swedish","Tagalog", "Tamil", 'Telugu', 'Tulu', 'Urdu']

const workArry = ["Private Company","Goverment / Public Sector","Defense / Civil Services","Business / Self Employed","Not Working"]

const TwoPage = () => { 
  const [religion,setReligion] = useState("")
  const [tounge,setTounge] = useState("")
  const [work,setWork] = useState("")
  const [qualification,setQualification] = useState("")
  const [collage,setCollage] = useState("")
  const [income,setIncome] = useState("")
  const [error,setError] = useState("")
    const navigation = useNavigation()
    const {currentUser} = useAuth()
   
   const submit = () => {
        if (!religion || !tounge || !work || !qualification || !collage || !income) {
          setError("fill out the Details")
        } else {
          if(currentUser.uid){
            db.collection("users").doc(currentUser.uid).update({
              religion:religion,
              tounge:tounge,
              work:work,
              income:income,
              collage:collage,
              qualification:qualification
            })
              
          }
          navigation.navigate('Home')
          
        }
   }
    
  return (
      <SafeAreaView>
        <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>Just a few question your about.</Text>
        <Text style={{color:"red"}}>{error}</Text>
        <Text style={styles.label}>Your Religion</Text>
        <SelectDropdown
            defaultButtonText={"Choose Religion"}
            value={religion}
            data={religionArry}
            disableAutoScroll={true}
            buttonTextStyle={{ color: "#494B4D" }}
            buttonStyle={{
              borderColor: "#ccc",
              borderWidth: 1,
              width: "100%",
              borderRadius: 6,
              height: 45,
            }}
            onSelect={(item) => {
              setReligion(item);
            }}
          />
        <Text style={styles.label}>Your Mother Tongue</Text>
        <SelectDropdown
            defaultButtonText={"Choose Mother Tounge"}
            value={tounge}
            data={toungeArry}
            disableAutoScroll={true}
            buttonTextStyle={{ color: "#494B4D" }}
            buttonStyle={{
              borderColor: "#ccc",
              borderWidth: 1,
              width: "100%",
              borderRadius: 6,
              height: 45,
            }}
            onSelect={(item) => {
              setTounge(item);
            }}
          />
        <Text style={styles.label}>Your works with</Text>   
        <SelectDropdown
            defaultButtonText={"Choose Works"}
            value={work}
            data={workArry}
            disableAutoScroll={true}
            buttonTextStyle={{ color: "#494B4D" }}
            buttonStyle={{
              borderColor: "#ccc",
              borderWidth: 1,
              width: "100%",
              borderRadius: 6,
              height: 45,
            }}
            onSelect={(item) => {
              setWork(item);
            }}
          />
        <Text style={styles.label}>Your highest Qualification</Text>
        
            <TextInput style={styles.input} type='text' placeholder='Enter Your Qualification' value={qualification} onChangeText={(textValue)=>setQualification(textValue)} />
         <Text style={styles.label}>Your Collage</Text>

            <TextInput style={styles.input} type='text' placeholder='Enter your Collage' value={collage} onChangeText={(textValue)=>setCollage(textValue)}  />
          <Text style={styles.label}>Your Annual Income</Text>
    
            <TextInput style={styles.input} type='text' placeholder='Enter your Income' value={income} onChangeText={(textValue)=>setIncome(textValue)} />

        <Text style={{marginTop:30, textAlign:"center", fontSize:14,color:"#0008"}}>Not particuler about my partner's community</Text>
        <Text style={styles.button} onPress={submit} mt="2" colorScheme="amber">
            Contiune
          </Text>
    </View>
    </ScrollView>
      </SafeAreaView>
  )
}


export default TwoPage;

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
      backgroundColor: "orange",
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
  });
  