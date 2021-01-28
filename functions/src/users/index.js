const admin = require("firebase-admin");
const serviceAccount = require("../../wildhabitatexercise-firebase-adminsdk-z62ei-e63c217782.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const firestore = admin.firestore();
const peopleRef = firestore.collection("people");


exports.postPerson = (req, res) => {
  if (!firestore) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  if(Object.keys(req.body).length === 0 || req.body === undefined){
    res.send({
        message: "Nothing defined"
    })
    return
}

if(req.body.last_name === null){
    res.send({
        message: "Last name required!!!"
    })
    return
}

if(typeof req.body.name !== 'string'){
    res.send({
        message: "Invalid last name"
    })
    return
}
  let newPerson = req.body;
  let now = admin.firestore.FieldValue.serverTimestamp();
  newPerson.updated = now;
  newPerson.created = now;

  peopleRef
    .add(newPerson)
    .then((docRef) => {
      peopleRef
        .doc(docRef.id)
        .get()
        .then((snapshot) => {
          let person = snapshot.data({
            name: "17",
          });
          if ( (req.body.first_name && (req.body.first_name).length === 0) ||
            req.body.first_name === undefined ||
            req.body.first_name === null) {
            res.send({
              message:
                "Invalid first name: must be at least one character, A-Z",
            });
            return;
          }

          person.id = snapshot.id;
          res.status(200).json({
            status: "successfully successful success",
            data: person,
            message: "Person added",
            statusCode: "200",
          });
          return;
        });
    })
    .catch((err) => {
      console.log(err);
      res.status().send({
        status: "errrrrr",
        data: err,
        message: "shits broke",
        statusCode: "500",
      });
    });
};

exports.getPeople = (req, res) => {
  if (!firestore) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  peopleRef
    .get()
    .then((collection) => {
      const peopleResults = collection.docs.map((doc) => {
        let person = doc.data();
        person.id = doc.id;
        return person;
      });
      res.status(200).json({
        status: "successfully successful success",
        data: peopleResults,
        message: "Person loaded",
        statusCode: "200",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        status: "errrrrr",
        data: err,
        message: "shits broke",
        statusCode: "500",
      });
    });
};


