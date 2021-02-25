const functions = require("firebase-functions")
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')({origin: true})

const {getEvents, postEvent} = require('./src/events')
const {getUser, postUsers} = require('./src/users')
const {getSingleEvent, deleteEvent, updateEvent} = require('./src/events/eventId')
const {getSingleUser, deleteSingleUser, updateSingleUser} = require('./src/users/userId')


const app = express()
app.use(bodyParser.json())
app.use(cors)

app.get('/events', getEvents)
app.get('/events/:eventId', getSingleEvent)
app.get('/users/:userId', getSingleUser)

app.post('/events', postEvent)
app.delete('/events/:eventId', deleteEvent)
app.patch('/events/:eventId', updateEvent)
app.patch('/users/:userId', updateSingleUser)

app.get('/users', getUser)
app.post('/users', postUsers)
app.delete('/users/:userId', deleteSingleUser)

exports.app = functions.https.onRequest(app);



