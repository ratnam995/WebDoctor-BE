var ObjectID = require("mongodb").ObjectID;
const authMiddleware = require("../auth-middleWare");

module.exports = function(app, db) {
  app.post("/user/fetchAllDoctors", (req, res) => {
    authMiddleware.fetchSession(req, res, db).then(response => {
      if (response.hasOwnProperty("error")) {
        res.send(response);
      } else if (response.hasOwnProperty("success")) {
        if (
          req.body.userRole === "webDoc.admin" ||
          req.body.userRole === "webDoc.patient"
        ) {
          db.collection("users")
            .find({ userRoleTag: "webDoc.doctor" })
            .toArray((err, result) => {
              if (err) {
                res.send({
                  error: "Error has occurred while fetching all doctors"
                });
              } else {
                res.send(result);
              }
            });
        } else {
          res.send({ error: "User not authorised" });
        }
      }
    });
  });
  app.post("/user/fetchAllPatients", (req, res) => {
    authMiddleware.fetchSession(req, res, db).then(response => {
      if (response.hasOwnProperty("error")) {
        res.send(response);
      } else if (response.hasOwnProperty("success")) {
        if (
          req.body.userRole === "webDoc.admin" ||
          req.body.userRole === "webDoc.doctor"
        ) {
          db.collection("users")
            .find({ userRoleTag: "webDoc.patient" })
            .toArray((err, result) => {
              if (err) {
                res.send({
                  error: "Error has occurred while fetching all patients"
                });
              } else {
                res.send(result);
              }
            });
        } else {
          res.send({ error: "User not authorised" });
        }
      }
    });
  });
  app.get("/user/fetchUserViaId/:id", (req, res) => {
    authMiddleware.fetchSession(req, res, db).then(response => {
      console.log("response", response);
      if (response.hasOwnProperty("error")) {
        res.send(response);
      } else if (response.hasOwnProperty("success")) {
        let id = req.params.id;
        const details = { _id: new ObjectID(id) };
        db.collection("users").findOne(details, (err, item) => {
          if (err) {
            res.send({ error: "Error has occurred while fetching user" });
          } else {
            res.send(item);
          }
        });
      }
    });
  });
  app.post("/user/addUser", (req, res) => {
    // You'll create your note here.
    console.log("req", req);
    const userData = {
      userName: req.body.userName,
      userRoleTag: req.body.userRoleTag,
      userPhoneNum: req.body.userPhoneNum,
      userAddress: req.body.userAddress,
      userPassword: req.body.userPassword
    };
    db.collection("users").insert(userData, (err, result) => {
      if (err) {
        res.send({ error: "An error has occurred" });
      } else {
        res.send({ success: "Successfully Signed Up.", id: result.ops[0]._id });
      }
    });
  });
  app.put("/user/updateUser/:id", (req, res) => {
    authMiddleware.fetchSession(req, res, db).then(response => {
      console.log("response", response);
      if (response.hasOwnProperty("error")) {
        res.send(response);
      } else if (response.hasOwnProperty("success")) {
        const id = req.params.id;
        const details = { _id: new ObjectID(id) };
        const userData = {
          userName: req.body.userName,
          userRoleTag: req.body.userRoleTag,
          userPhoneNum: req.body.userPhoneNum,
          userAddress: req.body.userAddress,
          userEmail: req.body.userEmail,
          userPassword: req.body.userPassword
        };
        db.collection("users").update(details, userData, (err, result) => {
          if (err) {
            res.send({ error: "An error has occurred" });
          } else {
            res.send(userData);
          }
        });
      }
    });
  });
};
