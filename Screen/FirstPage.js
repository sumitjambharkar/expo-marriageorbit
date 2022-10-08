import React,{useState} from 'react';
import { useNavigation } from "@react-navigation/native";
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import { View,Text,StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import SelectDropdown from "react-native-select-dropdown";

const stateArry = ["Andhra Pradesh","Arunachal Pradesh","Assam"	,"Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal ","Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Nagaland",	"Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"]

const cityArry = ['Mumbai','Delhi','Chennai','Bangalore','Hyderabad','Pune','Kochi','Kolkata']

const maritalArry = ["Never Married","Divorced","Widowed","Awaiting Divorce","Annulled"]

const dietArry = ["veg","Non-Veg","Occasionally Non-Veg","Eggetarian","jain","Vegan"]

const heightArry = ['4.0','4.1','4.2','4.3','4.4','4.5','4.6','4.7','4.8','4.9','5.0','5.1','5.2','5.3','5.4','5.5','5.6','5.7','5.8','5.9','6.0','6.1','6.2','6.3','6.4','6.5','6.6','6.7','6.8','6.9','6.0','7.0','7.1 ']

const communityArry = ['96 Kuli Maratha', 'Agri', 'Ahir', 'Shimpi', 'Ahirwar','Anjana (Chowdary) Patel','Aramari / Gabit',
'Arya Vysya','Bairwa','Balai','Banjara','Barai','Bari','Bhandari','Bhavasar', 'kshatriya','Bhil,','Bhoi',
'Bhoyar','Brahmin - Anaviln Desai','Brahmin - Baidhiki/Vaidhiki','Brahmin - Bardai','Brahmin - Bhargav',
'Brahmin - Daivadnya','Brahmin - Deshastha','Brahmin - Karhade','Brahmin - Khadayata','Brahmin - Khedaval',
'Brahmin - Kokanastha','Brahmin - Mevada','Brahmin - Others','Brahmin - Rajgor','Brahmin - Rarhi/Radhi',
'Brahmin - Rigvedi','Brahmin - Saraswat','Brahmin - Sarua','Brahmin - Shri Gaud','Brahmin - Smartha',
'Brahmin - Tapodhan','Brahmin - Valam','Brahmin - Zalora','CKP','Chambhar','Charan','Daivadnya',  
'Brahmin','Deshastha',  'Brahmin','Deshmukh','Devang Koshthi','Devrukhe Brahmin','Dhanak','Dhangar',
'Dhor / Kakkayya','Gabit','Gavandi','Gawali','Ghisadi','Gomantak','Gond','Gondhali','Gurav','Halba Koshti',
'Holar','Intercaste','Jangam','Jhadav','Jogi (Nath)','Julaha','Kalar','Kanakkan Padanna','Kandara',
'Karhade  Brahmin','Kasar','Kayastha','Khatik','Kokanastha',  'Brahmin','Kokanastha Maratha','Koli',
'Koli Mahadev','Konkani','Kori/Koli','Kosthi','Kshatriya','Kshatriya Raju','Kumaoni Rajput','Kumbhar',
'Kunbi','Kunbi Lonari','Kunbi Maratha','Kunbi Tirale','Kuruva','Leva patil','Lingayath','Lohar',
'Madivala / Dhobi','Mahar','Mair Rajput Swarnkar','Mali','Malwani','Mannan / Velan / Vannan','Maratha',
'Maratha Kshatriya','Matang','Meghwal','Nabit','Nath','Nhavi','Otari','Pallan / Devandra Kula Vellalan',
'Panan','Paravan / Bharatar','Parit','Paswan / Dusadh','Patel','Pathare Prabhu','Patil','Poundra',
'Pulaya / Cheruman','Rajput','Ramoshi','Rigvedi  Brahmin', 'Rohit / Chamar','SC','SKP','ST','Samagar',
'Sambava','Saraswat  Brahmin','Satnami','Savji','Shilpkar','Shimpi/Namdev','Smartha  Brahmin', 'Sonar',
'Sonkar','Suthar','Swakula Sali','Teli','Thandan','Vadar','Vaishnav','Vaishnav Kapol','Vaishnav Khadyata',
'Vaishnav Lad','Vaishnav Modh','Vaishnav Porvad','Vaishnav Shrimali','Vaishnav Sorathaiya','Vaishnav Vania',
'Vaishya Vani','Vani','Vaniya','Vanjari','Vysya','Yadav']




const FirstPage = () => { 
    
    const [state, setState] = useState("")
    const [city,setCity] = useState("")
    const [marital,setMarital] = useState("")
    const [diet,setDiet] = useState("")
    const [height,setHeight] = useState("")
    const [community,setCommunity] = useState("")
    const [error,setError] = useState("")
    const navigation = useNavigation()
    const {currentUser} = useAuth()

    const submit = () => {
      if (!state || !city || !marital || !diet || !height || !community) {
        setError("fill out the Details")
      }else {
        if(currentUser.uid){
          db.collection("users").doc(currentUser.uid).update({
            state:state,
            city:city,
            marital:marital,
            diet:diet,
            height:height,
            community:community
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
          <Text style={styles.label}>He lives in</Text>
        <SelectDropdown
            defaultButtonText={"Choose State"}
            value={state}
            data={stateArry}
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
              setState(item);
            }}
          />
          <Text style={styles.label}>His city</Text>
        <SelectDropdown
            defaultButtonText={"Choose City"}
            value={city}
            data={cityArry}
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
              setCity(item);
            }}
          />
          <Text style={styles.label}>His marital status</Text>
          <SelectDropdown
            defaultButtonText={"Choose Marital Status"}
            value={marital}
            data={maritalArry}
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
              setMarital(item);
            }}
          />
        <Text style={styles.label}>His Diet*</Text>
        <SelectDropdown
            defaultButtonText={"Choose His Diet"}
            value={diet}
            data={dietArry}
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
              setDiet(item);
            }}
          />
        <Text style={styles.label}>His height*</Text>
        <SelectDropdown
            defaultButtonText={"Choose His Height"}
            value={height}
            data={heightArry}
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
              setHeight(item);
            }}
          />
        <Text style={styles.label}>His sub-community*</Text>
        <SelectDropdown
            defaultButtonText={"Choose His sub-community"}
            value={community}
            data={communityArry}
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
              setCommunity(item);
            }}
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
