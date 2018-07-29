var ObjectID = require("mongodb").ObjectID;
const authMiddleware = require("../auth-middleWare");

module.exports = function(app, db) {
  app.get("/session/checkSession/:id", (req, res) => {
    authMiddleware.fetchSession(req, res, db).then(response => {
      if (response.hasOwnProperty("error")) {
        res.send(response);
      } else if (response.hasOwnProperty("success")) {
        const id = req.params.id;
        const details = { _id: new ObjectID(id) };
        db.collection("sessions").findOne(details, (err, result) => {
          if (err) {
            res.send({ error: "An error has occurred" });
          } else {
            let resToBeSent = {};
            resToBeSent["userData"] = result.data;
            resToBeSent["sessionID"] = id;
            res.send(resToBeSent);
          }
        });
      }
    });
  });

  app.put("/session/setSession/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    const userData = {
      data: req.body.data,
      usedAt: req.body.usedAt,
      versionKey: req.body.versionKey,
      expiresAt: new Date(
        new Date(res.body.createdAt).getTime() + 60 * 60 * 24 * 1000
      )
    };
    db.collection("sessions").update(details, userData, (err, result) => {
      if (err) {
        res.send({ error: "An error has occurred" });
      } else {
        res.send(userData);
      }
    });
  });

  app.delete("/session/deleteSession/:id", (req, res) => {
    authMiddleware.fetchSession(req, res, db).then(response => {
      if (response.hasOwnProperty("error")) {
        res.send(response);
      } else if (response.hasOwnProperty("success")) {
        const id = req.params.id;
        const details = { _id: new ObjectID(id) };
        db.collection("sessions").remove(details, (err, item) => {
          if (err) {
            res.send({ error: "An error has occurred" });
          } else {
            res.send({ success: "Session deletion successful" });
          }
        });
      }
    });
  });
};
