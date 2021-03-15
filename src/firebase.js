import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBpMloHpaG3yWWMn1gMMeCU_0l6m1ofoNc",
    authDomain: "bt3103-week-6-d3db6.firebaseapp.com",
    projectId: "bt3103-week-6-d3db6",
    storageBucket: "bt3103-week-6-d3db6.appspot.com",
    messagingSenderId: "275300988597",
    appId: "1:275300988597:web:7f9d43f0a9a31b2fbfb0fc",
    measurementId: "G-289R9FFLXS"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;