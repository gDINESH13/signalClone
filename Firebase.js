import fireBase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAX6hgeAebEDSWc3CQG1SBhs4tXXnb1MVE",
  authDomain: "reactnativevoicechat.firebaseapp.com",
  projectId: "reactnativevoicechat",
  storageBucket: "reactnativevoicechat.appspot.com",
  messagingSenderId: "211213003663",
  appId: "1:211213003663:web:4643e068af33a44665b9fa",
  measurementId: "G-RE2C00G3TK"
};

let app;

if (fireBase.apps.length===0){
  app=fireBase.initializeApp(firebaseConfig)
}
else{
  app=fireBase.app();
}

const db=app.firestore();
const auth=fireBase.auth();

export {
  db,
  auth
}