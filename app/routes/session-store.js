var ObjectID = require("mongodb").ObjectID;

module.exports = {
  createSession: function(req, db) {
    return new Promise(function(resolve, reject) {
      const userData = {
        data: req.data,
        createdAt: req.createdAt,
        versionKey: req.versionKey,
        expiresAt: new Date(
          new Date(req.createdAt).getTime() + 60 * 60 * 24 * 1000
        )
      };
      db.collection("sessions").insert(userData, (err, result) => {
        if (err) {
          return resolve({ error: "An error has occurred" });
        } else {
          return resolve({
            success: "Login successfull",
            result: result.insertedIds[0]
          });
        }
      });
    });
  },

  fetchSession: function(req, db) {
    return new Promise(function(resolve, reject) {
      let id = req.id;
      const details = { _id: new ObjectID(id) };
      db.collection("sessions").findOne(details, (err, item) => {
        if (err) {
          return resolve({ error: "An error has occurred" });
        } else {
          return resolve({
            success: "Session fetched successfull",
            result: item
          });
        }
      });
    });
  }
};
