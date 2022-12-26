import React,{useState} from 'react';
import { useNavigation } from "@react-navigation/native";
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import { View,Text,StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import data from './data.json'


const maritalArry = [{value:"Never Married"},{value:"Divorced"},{value:"Widowed"},{value:"Awaiting Divorce"},{value:"Annulled"}]

const dietArry = [{value:"veg"},{value:"Non-Veg"},{value:"Occasionally Non-Veg"},{value:"Eggetarian"},{value:"jain"},{value:"Vegan"}]

const heightArry = [{value:'4.0'},{value:'4.1'},{value:'4.2'},{value:'4.3'},{value:'4.4'},{value:'4.5'},{value:'4.6'},{value:'4.7'},{value:'4.8'},{value:'4.9'},{value:'5.0'},{value:'5.1'},{value:'5.2'},{value:'5.3'},{value:'5.4'},{value:'5.5'},{value:'5.6'},{value:'5.7'},{value:'5.8'},{value:'5.9'},{value:'6.0'},{value:'6.1'},{value:'6.2'},{value:'6.3'},{value:'6.4'},{value:'6.5'},{value:'6.6'},{value:'6.7'},{value:'6.8'},{value:'6.9'},{value:'6.0'},{value:'7.0'},{value:'7.1'}]



const FirstPage = () => { 
  
    const [country,setCountry] = useState("")
    const [state, setState] = useState("")
    const [city,setCity] = useState("")
    const [marital,setMarital] = useState("")
    const [diet,setDiet] = useState("")
    const [height,setHeight] = useState("")
    const [error,setError] = useState("")
    const navigation = useNavigation()
    const {currentUser} = useAuth()
    
    const sta = data.countries.filter((doc) => doc.value === country)

    const cit = sta[0]?.states.filter((doc)=>doc.value===state)
   
   
    const submit = () => {
      if (!state || !city || !marital || !diet || !height || !country) {
        setError("fill out the Details")
      }else {
        if(currentUser.uid){
          db.collection("users").doc(currentUser.uid).update({
            state:state,
            city:city,
            maritalStatus:marital,
            diet:diet,
            height:height,
            country:country
          })
            
        }
      navigation.navigate('Religion Details')
      }
    }
    
  return (
      <SafeAreaView>
        <ScrollView>
      <View style={styles.container}>
          <Text style={styles.label}>Thanks for Registering. Now let's build Profile</Text>
          <Text style={{color:"red"}}>{error}</Text>
          <Text style={styles.label}>Country</Text>
          <SelectList
            boxStyles={{ borderColor: '#ccc' }}
            placeholder="Select Country"
            setSelected={setCountry}
            data={data.countries}
            save="value"

          />
          <Text style={styles.label}>State</Text>
          <SelectList
            boxStyles={{ borderColor: '#ccc' }}
            placeholder="Select State"
            setSelected={setState}
            data={sta[0]?.states||""}
            save="value"

          />
          <Text style={styles.label}>City</Text>
          <SelectList
            boxStyles={{ borderColor: '#ccc' }}
            placeholder="Select City"
            setSelected={setCity}
            data={cit?cit[0]?.cities :null||""}
             save="value"
          />
          <Text style={styles.label}>His marital status</Text>
          <SelectList
            boxStyles={{ borderColor: '#ccc' }}
            placeholder="Select Marrital Status"
            setSelected={setMarital}
            data={maritalArry}

          />
        <Text style={styles.label}>His Diet*</Text>
        <SelectList
            boxStyles={{ borderColor: '#ccc' }}
            placeholder="Select Marrital Status"
            setSelected={setDiet}
            data={dietArry}

          />
        <Text style={styles.label}>His height*</Text>
        <SelectList
            boxStyles={{ borderColor: '#ccc' }}
            placeholder="Select Height"
            setSelected={setHeight}
            data={heightArry}

          />
        <Text style={{marginTop:30, textAlign:"center", fontSize:12,color:"#0008"}}>Not particuler about my partner's community</Text>
        <Text style={styles.button} onPress={submit}  mt="2" colorScheme="amber">
            Contiune
          </Text>
    </View>
    </ScrollView>
      </SafeAreaView>
  )
}


export default FirstPage;

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
});
