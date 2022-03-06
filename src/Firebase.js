import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/functions';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE,
  authDomain: "reservesocialapp.firebaseapp.com",
  projectId: "reservesocialapp",
  storageBucket: "reservesocialapp.appspot.com",
  messagingSenderId: "773206829548",
  appId: process.env.REACT_APP_FIRE_ID,
  measurementId: "G-GY78EE84VY",
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

