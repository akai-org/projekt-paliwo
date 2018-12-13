import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD5Ha41-GS3A6u_Gnb3OOyfn0w0n4fs2W8",
    authDomain: "paliwo-bc6a4.firebaseapp.com",
    databaseURL: "https://paliwo-bc6a4.firebaseio.com",
    projectId: "paliwo-bc6a4",
    storageBucket: "paliwo-bc6a4.appspot.com",
    messagingSenderId: "418074306349"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;