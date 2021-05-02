// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCwsgv8O1OZMGX-W9Ok9d9YnD1s_G7G2mk",
    authDomain: "clone-5e57f.firebaseapp.com",
    projectId: "clone-5e57f",
    storageBucket: "clone-5e57f.appspot.com",
    messagingSenderId: "571888769777",
    appId: "1:571888769777:web:4a29c5a095d33afff36750",
    measurementId: "G-YWGSHB6PG8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
export const db = firebaseApp.firestore()
export const auth = firebase.auth()

// to deploy only hosting 
// firebase deploy --only hosting