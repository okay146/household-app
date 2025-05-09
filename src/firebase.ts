// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBhZxXJmpNS_9MI-9B1R7AeGxQ-uWCvXCo",
    authDomain: "household-5701d.firebaseapp.com",
    projectId: "household-5701d",
    storageBucket: "household-5701d.appspot.com",
    messagingSenderId: "561616818621",
    appId: "1:561616818621:web:d9492fa38eec3c135902d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };