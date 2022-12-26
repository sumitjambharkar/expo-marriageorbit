import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, SafeAreaView, ScrollView } from "react-native";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import { SelectList } from 'react-native-dropdown-select-list';
import data from './religion.json'
import AsyncStorage from "@react-native-async-storage/async-storage";

const workArry = [{ value: "Private Company" }, {value: "Goverment / Public Sector" }, { value: "Defense / Civil Services" }, { value: "Business / Self Employed" }, { value: "Not Working" }, { value: "Student" }]
const toungeArry = [{value:'Hindi'}, {value:'Marathi'}, {value:'Punjabi'}, {value:'Bengali'}, {value:'Gujarati'}, {value:'Urdu'},{ value:'Telugu'}, {value:'Kannada'}, {value:'Tamil'},{value:'Odia'} ,{ value:'Marwari'},{ value:'Aka'} ,{value:'Arabic'}, {value:'Arunachali'} ,{ value:'Assamese'},{value:'Awadhi'}, {value:'Baluchi'}, {value:'Bengali'}, {value:'Bhojpuri'}, {value:'Bhutia'},{value: 'Brahui'}, {value:'Brij'},{ value:'Burmese'}, {value:'Chattisgarhi'}, {value:'Chinese'}, {value:'Coorgi'},{value: 'Dogri'}, {value:'English'}, {value:'French'}, {value:'Garhwali'}, {value:'Garo'} ,{value:'Gujarati'}, {value:'Himachali'}, {value:'Pahari'}, {value:'Hindi'}, {value:'Hindko'}, {value:'Kakbarak'}, {value:'Kanauji'}, {value:'Kannada'}, {value:'Kashmiri'}, {value:'Khandesi'},{value:'Khasi'},{value:'Konkani'}, {value:'Koshali'}, {value:'Kumaoni'},{value:'Kutchi'}, {value:'Ladakhi'}, {value:'Lepcha'}, {value:'Magahi'}, {value:'Maithili'}, {value:'Malay'}, {value:'Malayalam'}, {value:'Manipuri'}, {value:"Marathi"}, {value:'Marwari'}, {value:'Miji'}, {value:'Mizo'}, {value:'Monpa'} ,{value:'Nepali'}, {value:'Odia'},{value:'Pashto'}, {value:'Persian'}, {value:'Punjabi'}, {value:'Rajasthani'}, {value:'Russian'}, {value:"Sanskrit"}, {value:"Santhali"}, {value:"Seraiki"}, {value:"Sindhi"}, {value:"Sinhala"}, {value:"Sourashtra"},{ value:"Spanish"},{value: "Swedish"},{value:"Tagalog"}, {value:"Tamil"},{ value:'Telugu'}, {value:'Tulu'}, {value:'Urdu'}]

const TwoPage = () => {
  

  const [religion, setReligion] = useState("")
  const [caste, setCaste] = useState("")
  const [tounge,setTounge] = useState("")
  const [work, setWork] = useState("")
  const [qualification, setQualification] = useState("")
  const [collage, setCollage] = useState("")
  const [income, setIncome] = useState("")
  const [error, setError] = useState("")
  const navigation = useNavigation()
  const { currentUser } = useAuth()
  const castes = data.religion.filter((doc) => doc.value === religion)

  const submit = async() => {
    if (!religion || !caste || !work || !qualification || !collage || !income||!tounge) {
      setError("fill out the Details")
    } else {
      if (currentUser.uid) {
        db.collection("users").doc(currentUser.uid).update({
          religion: religion,
          community: caste,
          work: work,
          income: income,
          collage: collage,
          qaulification: qualification,
          tounge:tounge
        })
        navigation.navigate('Upload Profile')
      }
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.label}>Just a few question your about.</Text>
          <Text style={{ color: "red" }}>{error}</Text>
          <Text style={styles.label}>Your Religion</Text>
          <SelectList
            boxStyles={{ borderColor: '#ccc' }}
            placeholder="Select Religion"
            setSelected={setReligion}
            data={data.religion}

          />
          <Text style={styles.label}>Your Caste</Text>
          <SelectList
            boxStyles={{ borderColor: '#ccc' }}
            placeholder="Select Caste"
            setSelected={setCaste}
            data={castes[0]?.castes}

          />
           <Text style={styles.label}>Your Mother Tounge</Text>
          <SelectList
            boxStyles={{ borderColor: '#ccc' }}
            placeholder="Select Mother Tounge"
            setSelected={setTounge}
            data={toungeArry}

          />
          <Text style={styles.label}>Your works with</Text>
          <SelectList
            boxStyles={{ borderColor: '#ccc' }}
            placeholder="Select Work"
            setSelected={setWork}
            data={workArry}

          />
          <Text style={styles.label}>Your highest Qualification</Text>

          <TextInput style={styles.input} type='text' placeholder='Enter Your Qualification' value={qualification} onChangeText={(textValue) => setQualification(textValue)} />
          <Text style={styles.label}>Your Collage</Text>

          <TextInput style={styles.input} type='text'  placeholder='Enter your Collage' value={collage} onChangeText={(textValue) => setCollage(textValue)} />
          <Text style={styles.label}>Your Annual Income</Text>

          <TextInput keyboardType="numeric" style={styles.input} type='text' placeholder='Enter your Income' value={income} onChangeText={(textValue) => setIncome(textValue)} />

          <Text style={{ marginTop: 30, textAlign: "center", fontSize: 14, color: "#0008" }}>Not particuler about my partner's community</Text>
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
    color: "#494B4D"
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
