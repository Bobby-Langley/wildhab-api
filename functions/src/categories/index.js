const admin = require("firebase-admin");
const serviceAccount = require("../../wildhabitatexercise-firebase-adminsdk-z62ei-e63c217782.json");

if(!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
  })
} 
const firestore = admin.firestore()
const eventRef = firestore.collection('categories')