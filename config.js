import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyB8kCe6zM4ZA9v1FstNpPnQwalYq0cXbOY",
    authDomain: "schoolq-47b4c.firebaseapp.com",
    databaseURL: "https://schoolq-47b4c.firebaseio.com",
    projectId: "schoolq-47b4c",
    storageBucket: "schoolq-47b4c.appspot.com",
    messagingSenderId: "442646802180",
    appId: "1:442646802180:web:9b7cee317878f9a7fdea51"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();