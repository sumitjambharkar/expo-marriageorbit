import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC_Zr5IgPIa8nGuHMTA6DZguyParxtH4fE",
  authDomain: "marrigeorbit-8a552.firebaseapp.com",
  projectId: "marrigeorbit-8a552",
  storageBucket: "marrigeorbit-8a552.appspot.com",
  messagingSenderId: "657323529084",
  appId: "1:657323529084:web:72b0e530440d1bafde4af9"
};

// Initialize Firebase
const firebaseApp  = firebase.initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const auth = firebase.auth()
const db = firebaseApp.firestore()
export {auth , db ,storage}
export const createUserCollecton =async(user,additionalData)=>{
  if(!user) return;
  const userRef = db.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists){
    const {email} = user;
    const {displayName} = additionalData;
    const {number} = additionalData;
    const {birth} = additionalData;
    const {gender} = additionalData;
    const {profile} = additionalData;

    try{
      userRef.set({
        email,
        displayName,
        profile,
        birth,
        number,
        createdAt :new Date(),
        gender,
        isOnline:true,
        uid:user.uid,
      })
    }
    catch(err){
      console.log(err);
    }
  }
}
