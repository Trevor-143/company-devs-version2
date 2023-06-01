// @ts-ignore
import { initializeApp } from "firebase/app";
// @ts-ignore
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAoV59AY6dLpS5BNHI18Ia1l7bsOtpRl6g",
  authDomain: "compdevs-bd400.firebaseapp.com",
  projectId: "compdevs-bd400",
  storageBucket: "compdevs-bd400.appspot.com",
  messagingSenderId: "54893645484",
  appId: "1:54893645484:web:74cf6c6dbedb9cf9c29909"
};


export const app = initializeApp(firebaseConfig);
export const store = getFirestore(app)