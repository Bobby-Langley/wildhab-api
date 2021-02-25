const admin = require("firebase-admin");
const serviceAccount = require("../../wildhabitatexercise-firebase-adminsdk-z62ei-e63c217782.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const firestore = admin.firestore();
const userRef = firestore.collection("people");


exports.postUsers = (req, res) => {
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
  let newUser = req.body;
  let now = admin.firestore.FieldValue.serverTimestamp();
  newUser.updated = now;
  newUser.created = now;

  userRef
    .add(newUser)
    .then((docRef) => {
      userRef
        .doc(docRef.id)
        .get()
        .then((snapshot) => {
          let user = snapshot.data({
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

          user.id = snapshot.id;
          res.status(200).json({
            status: "successfully successful success",
            data: user,
            message: "User added",
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

exports.getUser = (req, res) => {
  if (!firestore) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  userRef
    .get()
    .then((collection) => {
      const userResults = collection.docs.map((doc) => {
        let user = doc.data();
        user.id = doc.id;
        return user;
      });
      res.status(200).json({
        status: "successfully successful success",
        data: userResults,
        message: "User loaded",
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


