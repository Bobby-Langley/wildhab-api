const admin = require("firebase-admin");
const serviceAccount = require("../../wildhabitatexercise-firebase-adminsdk-z62ei-e63c217782.json");

if(!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
  })
}  
const firestore = admin.firestore()
const eventRef = firestore.collection('events')

exports.getSingleEvent = (req, res) => {
    if(!firestore) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        })
        firestore = admin.firestore()
    }
const { eventId } = req.params
     eventRef.doc(eventId).get()
          .then( doc => {
                  let event = doc.data()
                  event.id = doc.id
                  return event
              })
              res.status(200).json({
                  status: 'successfully successful success',
                  data: eventId,
                  message: 'Events loaded',
                  statusCode: '200'
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

exports.deleteEvent = (req, res) => {
    if(!firestore) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        })
        firestore = admin.firestore()
    }
    eventRef.doc(req.params.eventId).delete()
        .then(() => {
            res.status(200).json({
            status: 'successfully successful success',
            message: 'Events loaded',
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


exports.updateEvent = (req, res) => {
    if(!firestore) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        })
        firestore = admin.firestore()
    }
    eventRef.doc(req.params.eventId)
    .update({
        sport: "disc disc disc",
        rated: "M for mature",
        "Weather Forecast": "Who cares?"
    })
        .then(() => {
            res.status(200).json({
            status: 'Updated Successfully',
            message: 'Event updated',
            statusCode: '200'
            })
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