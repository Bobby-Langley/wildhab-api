const admin = require("firebase-admin");
const serviceAccount = require("../../wildhabitatexercise-firebase-adminsdk-z62ei-e63c217782.json");

if(!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
  })
}  
const firestore = admin.firestore()
const personRef = firestore.collection('people')

exports.getSingleUser = (req, res) => {
    if(!firestore) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        })
        firestore = admin.firestore()
    }
const { userId } = req.params 
     personRef.doc(userId).get()
          .then( doc => {
            let person = doc.data()
            person.id = doc.id
              res.status(200).json({
                  status: 'successfully successful success',
                  data: person,
                  message: 'person loaded',
                  statusCode: '200'
                })
            })
          .catch(err => {
              console.log(err)
              res.status(500).send({
                status: 'errrrrr',
                data: err,
                message: 'shits broke',
                statusCode: '500'
           }) 
          })
     }


exports.deleteSinglePerson = (req, res) => {
  if(!firestore) {
      admin.initializeApp({
          credential: admin.credential.cert(serviceAccount)
      })
      firestore = admin.firestore()
  }
  
  personRef.doc(req.params.userId).delete()
      .then(() => {
          res.status(200).json({
            status: 'successfully successful success',
            message: 'Person deleted',
            statusCode: '204'
          })
      })
      .catch(err => {
          res.status(500).send ({
              status: 'errrrrr',
              data: err,
              message: 'shits broke',
              statusCode: '500'
          })
      })
}

exports.updateSinglePerson = (req, res) => {
  if(!firestore) {
      admin.initializeApp({
          credential: admin.credential.cert(serviceAccount)
      })
      firestore = admin.firestore()
  }
  personRef.doc(req.params.userId)
  .update(req.body)
      .then(() => {
          res.status(200).json({
            status: 'Person updated successfully',
            message: 'Person updated',
            statusCode: '200'
          })
          return
      })
      .catch(err => {
          res.status(500).json ({
              status: 'errrrrr',
              data: err,
              message: 'shits broke -- update err',
              statusCode: '500'
          })
      })

}