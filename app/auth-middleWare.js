var ObjectID = require("mongodb").ObjectID;
const sessionStore = require("./routes/session-store");

module.exports = {
  fetchSession: function(req, res, db) {
    return new Promise((resolve, reject) => {
      if (!req.headers.sessionid) {
        return res.status(403).json({ error: "Not authorized" });
      } else {
        let newReq = {};
        newReq["id"] = req.headers.sessionid;
        sessionStore.fetchSession(newReq, db).then(res => {
          if (res.hasOwnProperty("error")) {
            return res.status(403).json({ error: "Please login again" });
          } else {
            if (res.hasOwnProperty("success")) {
              console.log("Session Present", res.result);
              return resolve(res);
            }
          }
        });
      }
    });
  }
};
