var ObjectID = require("mongodb").ObjectID;
const authMiddleware = require("../auth-middleWare");

module.exports = function(app, db) {
  app.get("/role/fetchAllRoles", (req, res) => {
    db.collection("roles")
      .find()
      .toArray((err, result) => {
        if (err) res.send({ error: "Error while fetching all records" });
        else {
          res.send(result);
        }
      });
  });
  app.get("/role/fetchSingleRoles/:id", (req, res) => {
    let id = req.params.id;
    const details = { _id: new ObjectID(id) };
    db.collection("roles").findOne(details, (err, item) => {
      if (err) {
        res.send({ error: "Error has occurred" });
      } else {
        res.send(item);
      }
    });
  });
  app.post("/role/addRoles", (req, res) => {
    authMiddleware.fetchSession(req, res, db).then(response => {
      if (response.hasOwnProperty("error")) {
        res.send(response);
      } else if (response.hasOwnProperty("success")) {
        const role = { text: req.body.name, title: req.body.tag };
        db.collection("roles").insert(role, (err, result) => {
          if (err) {
            res.send({ error: "An error has occurred" });
          } else {
            res.send(result.ops[0]);
          }
        });
      }
    });
  });
};
