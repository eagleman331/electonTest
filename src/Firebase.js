import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/functions';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQV_o2b-eIi1fycHjw5AH0ly95c4j87kc",
  authDomain: "officercandidateschool-f4e09.firebaseapp.com",
  projectId: "officercandidateschool-f4e09",
  storageBucket: "officercandidateschool-f4e09.appspot.com",
  messagingSenderId: "188040679189",
  appId: "1:188040679189:web:454a24aeb564e2fdaaa31c",
  measurementId: "G-M5Z46EWQYD"
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

