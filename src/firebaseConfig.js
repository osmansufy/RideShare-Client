import firebase from "firebase"


const firebaseConfig = {
    apiKey: "AIzaSyBMANB3f9MKD1V5yMTkaN04wO2HE1W7vkc",
    authDomain: "hero-assignment-2e7cb.firebaseapp.com",
    projectId: "hero-assignment-2e7cb",
    storageBucket: "hero-assignment-2e7cb.appspot.com",
    messagingSenderId: "286120152822",
    appId: "1:286120152822:web:8faffd4e9b6cd5543c66d7"
  };
firebase.initializeApp(firebaseConfig);

export default firebase