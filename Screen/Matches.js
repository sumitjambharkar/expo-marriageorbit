import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Image, ScrollView } from "react-native";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";
import { useNavigation } from "@react-navigation/native";
import { SelectList } from 'react-native-dropdown-select-list';
import cou from './data.json'
import rel from './religion.json';
import Icon from 'react-native-vector-icons/FontAwesome';

const Matches = () => {

  const navigation = useNavigation();
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState('')
  const [show, setShow] = useState(true)
  const { currentUser } = useAuth()
  const [country, setCountry] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [religion, setReligion] = useState("")
  const [caste, setCaste] = useState("")
  const [qualification, setQualification] = useState("")
  const [marital, setMarital] = useState("")
  const [height, setHeight] = useState("")
  const [age, setAge] = useState("")
  const ageArry = [
    {value:"18"},{value:"19"},{value:"20"},{value:"21"},{value:"22"},{value:"23"},{value:"24"},{value:"25"},{value:"26"},{value:"27"},{value:"28"},{value:"29"}
  ,{value:"30"},{value:"31"},{value:"33"},{value:"34"},{value:"35"},{value:"36"},{value:"37"},{value:"38"},{value:"39"},{value:"40"},{value:"41"}
  ]
  const qualificationArry = [{ value: "PhD" }, { value: "Post Graduate" }, { value: "Graduate" }, { value: "Diploma" }, { value: "H.S.C" },{ value: "S.S.C" },{ value: "Scholling" }]
  const maritalArry = [{ value: "Never Married" }, { value: "Divorced" }, { value: "Widowed" }, { value: "Awaiting Divorce" }, { value: "Annulled" }]
  const heightArry = [{ value: '4.0' }, { value: '4.1' }, { value: '4.2' }, { value: '4.3' }, { value: '4.4' }, { value: '4.5' }, { value: '4.6' }, { value: '4.7' }, { value: '4.8' }, { value: '4.9' }, { value: '5.0' }, { value: '5.1' }, { value: '5.2' }, { value: '5.3' }, { value: '5.4' }, { value: '5.5' }, { value: '5.6' }, { value: '5.7' }, { value: '5.8' }, { value: '5.9' }, { value: '6.0' }, { value: '6.1' }, { value: '6.2' }, { value: '6.3' }, { value: '6.4' }, { value: '6.5' }, { value: '6.6' }, { value: '6.7' }, { value: '6.8' }, { value: '6.9' }, { value: '6.0' }, { value: '7.0' }, { value: '7.1' }]

  const sta = cou.countries.filter((doc) => doc.value === country)

  const cit = sta[0]?.states.filter((doc) => doc.value === state)

  const cast = rel.religion.filter((doc) => doc.value === religion)

  const sendFiltter = () => {
    setShow(true)
    const year = 2022-age
    console.log(year);
    console.log(city, caste, qualification, height, marital, age);
  }
  const ResetFiltter = () => {
    setShow(true)
    setCaste("")
    setCity("")
    setAge("")
    setHeight("")
    setMarital("")
    setQualification("")
  }

  useEffect(() => {
    const unSub = db.collection("users").orderBy("createdAt", "desc").onSnapshot((snapshot) => {
      setData(
        snapshot.docs
          .filter((doc) => (doc.id !== currentUser.uid))
          .map((doc) => ({
            id: doc.id,
            data: doc.data()
        }))
      );
      setTimeout(() => {
        setLoading(false)
      },1800);
    });
    return () => unSub()
  }, [])

  function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }
  
  useEffect(() => {
    if (currentUser.uid) {
      db.collection("users").doc(currentUser.uid).onSnapshot(snapshot => (
        setProfile(snapshot.data())
      ))
    }
  }, [currentUser.uid])

  console.log(age);

  return (
    <>
      <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight, backgroundColor: "#d" }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.header_text}>MarrigeOrbit</Text>
            {show?<TouchableOpacity onPress={() => setShow(false)} ><Text style={styles.header_text}>Search</Text></TouchableOpacity>:
            <TouchableOpacity onPress={() => setShow(true)} ><Text style={styles.header_text}><Icon name="close" size={25} color="#fff" /></Text></TouchableOpacity>}
          </View>
          <ScrollView>
            {loading ?
              <>
                <Loading />
              </> :
              <>
                {show ? <>
                  {data.filter((doc) => (profile.gender !== doc.data.gender))
                    .filter((doc) => doc.data.city?.toLowerCase().indexOf(city.toLowerCase()) !== -1)
                    .filter((doc) => doc.data.community?.toLowerCase().indexOf(caste.toLowerCase()) !== -1)
                    .filter((doc) => doc.data.height?.toLowerCase().indexOf(height.toLowerCase()) !== -1)
                    .filter((doc) => doc.data.maritalStatus?.toLowerCase().indexOf(marital.toLowerCase()) !== -1)
                    .filter((doc) => doc.data.qaulification?.toLowerCase().indexOf(qualification.toLowerCase()) !== -1)
                    .filter((doc) => doc.data.birth?.substr(0,4).indexOf(age) !== -1)
                    .map((doc, i) => (
                      <View key={i} style={styles.card}>
                        <View style={styles.card_flex}>
                          <View>
                            <Image style={styles.image} source={{ uri: doc.data.image || "https://firebasestorage.googleapis.com/v0/b/marrigeorbit-8a552.appspot.com/o/avatar%2F1671878151359%20-%20nl.png?alt=media&token=c23f5278-50aa-477c-a301-139f44cb49c4" }} />
                          </View>
                          <View style={styles.card_text}>
                            <TouchableOpacity onPress={() => navigation.navigate("FullScreen", { uid: doc.data.uid })}>
                              <Text style={styles.name_text}>{doc.data.displayName?.substr(0, 17)}</Text>
                              <Text style={styles.span}>{doc.data.height}, {calculate_age(new Date(doc.data.birth))} Years</Text>
                              <Text style={styles.span}>{doc.data.city} {doc.data.state} {doc.data.country}</Text>
                              <Text style={styles.span}>{doc.data.maritalStatus}</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    ))}

                </> : <>
                  <View style={styles.container}>
                    <View style={styles.card_search}>
                      <Text style={styles.label}>Select Location</Text>
                      <SelectList
                        boxStyles={{ borderColor: '#ccc' }}
                        placeholder="Select Country"
                        setSelected={setCountry}
                        data={cou.countries}
                        save="value"

                      />

                      <SelectList
                        boxStyles={{ borderColor: '#ccc' }}
                        placeholder="Select State"
                        setSelected={setState}
                        data={sta[0]?.states || ""}
                        save="value"

                      />

                      <SelectList
                        boxStyles={{ borderColor: '#ccc' }}
                        placeholder="Select City"
                        setSelected={setCity}
                        data={cit ? cit[0]?.cities : null || ""}
                        save="value"
                      />
                      <Text style={styles.label}>Select Caste</Text>
                      <SelectList
                        boxStyles={{ borderColor: '#ccc' }}
                        placeholder="Select Religion"
                        setSelected={setReligion}
                        data={rel.religion}

                      />
                      <SelectList
                        boxStyles={{ borderColor: '#ccc' }}
                        placeholder="Select Caste"
                        setSelected={setCaste}
                        data={cast[0]?.castes || ""}

                      />
                      <Text style={styles.label}>Select Age</Text>
                      <SelectList
                        boxStyles={{ borderColor: '#ccc' }}
                        placeholder="Select Age"
                        setSelected={(text)=>setAge(2022-text)}
                        data={ageArry}

                      />
                      <Text style={styles.label}>Select Height</Text>
                      <SelectList
                        boxStyles={{ borderColor: '#ccc' }}
                        placeholder="Select Height"
                        setSelected={setHeight}
                        data={heightArry}

                      />
                      <Text style={styles.label}>Select Qualification</Text>
                      <SelectList
                        boxStyles={{ borderColor: '#ccc' }}
                        placeholder="Select Qualification"
                        setSelected={setQualification}
                        data={qualificationArry}

                      />
                      <Text style={styles.label}>Select Marital Status</Text>
                      <SelectList
                        boxStyles={{ borderColor: '#ccc' }}
                        placeholder="Select Marital Status"
                        setSelected={setMarital}
                        data={maritalArry}

                      />
                      <TouchableOpacity onPress={sendFiltter}>
                        <Text style={styles.button} mt="2" colorScheme="amber">
                          Search
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={ResetFiltter} >
                        <Text style={styles.button} mt="2" colorScheme="amber">
                          Reset Filter
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>}
              </>
            }
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  header: {
    backgroundColor: "#df2349",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  header_text: {
    color: "#fff",
    fontFamily: "serif",
    fontSize: 18,
    fontWeight: "700",
    padding: 12
  },
  card: {
    display: "flex",
    justifyContent: "center",
    borderColor: "#FF8E9E",
    borderWidth: 1,
    margin: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden"
  },
  card_flex: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 12,
    alignItems: "center",
    width: "100%",
    heightL: "100%"
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 150 / 2,
    overflow: "hidden",
  },
  name_text: {
    fontWeight: "700",
    fontFamily: "serif",
    fontSize: 18,
    color: "#df2349"
  },
  span: {
    fontWeight: "500",
    fontSize: 16,
    color: "#df2349"
  },
  card_text: {
    marginLeft: 16,
  },
  card_search: {
    margin: 8,
    padding: 12
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
  label: {
    fontSize: 16,
    color: "#494B4D",
    marginBottom: 4,
    marginTop: 4,
  },
});

export default Matches;
