import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/functions';


const firebaseConfig = {
  apiKey: "AIzaSyCC8t1hDQj4thiSb9PrYExJwErtzeNWPSM",
  authDomain: "comrade-4944f.firebaseapp.com",
  projectId: "comrade-4944f",
  storageBucket: "comrade-4944f.appspot.com",
  messagingSenderId: "144759736825",
  appId: "1:144759736825:web:8eaabdbcdb3c208ce69528",
  measurementId: "G-0DYX30R1E1"
};
  let app;

  if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
  } else {
    app = firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();
  const functions = firebase.functions()
  const storage = app.storage();




  export { db, auth, storage,functions };

