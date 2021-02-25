const admin = require("firebase-admin");
const serviceAccount = require("../../wildhabitatexercise-firebase-adminsdk-z62ei-e63c217782.json");

if(!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
  })
}  
const firestore = admin.firestore()
const userRef = firestore.collection('people')

exports.getSingleUser = (req, res) => {
    if(!firestore) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        })
        firestore = admin.firestore()
    }
const { userId } = req.params 
     userRef.doc(userId).get()
          .then( doc => {
            let user = doc.data()
            user.id = doc.id
              res.status(200).json({
                  status: 'successfully successful success',
                  data: user,
                  message: 'user loaded',
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


exports.deleteSingleUser = (req, res) => {
  if(!firestore) {
      admin.initializeApp({
          credential: admin.credential.cert(serviceAccount)
      })
      firestore = admin.firestore()
  }
  
  UserRef.doc(req.params.userId).delete()
      .then(() => {
          res.status(200).json({
            status: 'successfully successful success',
            message: 'User deleted',
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

exports.updateSingleUser = (req, res) => {
  if(!firestore) {
      admin.initializeApp({
          credential: admin.credential.cert(serviceAccount)
      })
      firestore = admin.firestore()
  }
  UserRef.doc(req.params.userId)
  .update(req.body)
      .then(() => {
          res.status(200).json({
            status: 'User updated successfully',
            message: 'User updated',
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