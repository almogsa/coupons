// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBuHIZxElmkvkUCEW5wW43Olpx_xeb-Yzs',
    authDomain: 'coupons-11e3d.firebaseapp.com',
    projectId: 'coupons-11e3d',
    storageBucket: 'coupons-11e3d.appspot.com',
    messagingSenderId: '459223607874',
    appId: '1:459223607874:web:d32596f593666bbca4dbdb',
    measurementId: 'G-0T99CPT6WK',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const db = getFirestore()
export const auth = getAuth()
