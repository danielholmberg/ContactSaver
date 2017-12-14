import firebase from 'firebase';
import firestore from 'firebase/firestore';
var config = {
  apiKey: "AIzaSyA5eh1PeFy8iHFJdRdj--0ICkt-UnmxGio",
  authDomain: "contactsaver-23e20.firebaseapp.com",
  databaseURL: "https://contactsaver-23e20.firebaseio.com",
  projectId: "contactsaver-23e20",
  storageBucket: "contactsaver-23e20.appspot.com",
  messagingSenderId: "612471817054"
};
firebase.initializeApp(config);

export default firebase;
