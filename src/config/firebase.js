import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
//insert config from firebase
const config = {
  apiKey: "AIzaSyDJzezPaGV32JaRYdDDJCtcCBUD-zOsmjY",
  authDomain: "reskill101-5d48c.firebaseapp.com",
  databaseURL: "https://reskill101-5d48c.firebaseio.com",
  projectId: "reskill101-5d48c",
  storageBucket: "reskill101-5d48c.appspot.com",
  messagingSenderId: "891449306069",
  appId: "1:891449306069:web:3a78cfa815297898"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;