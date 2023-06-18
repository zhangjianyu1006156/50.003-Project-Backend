import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider,getAuth,signInWithRedirect } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAL-aYZJ_VlvfGz01B-6nLQpFo9iAjHwAA",
  authDomain: "testfirebaseauth-e04d8.firebaseapp.com",
  projectId: "testfirebaseauth-e04d8",
  storageBucket: "testfirebaseauth-e04d8.appspot.com",
  messagingSenderId: "1068173902467",
  appId: "1:1068173902467:web:5a188b98153472e881d1b6",
  measurementId: "G-10XXE60LS9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode='it'
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
signInWithRedirect(auth, provider);

export {auth,provider}