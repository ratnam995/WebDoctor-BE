var ObjectID = require('mongodb').ObjectID;
const sessionStore = require('./session-store');

module.exports = function(app, db) {
    app.post('/login', (req, res)=>{
        let uname= req.body.userName;
        let upass= req.body.password;
        db.collection('users').find({'userName':uname, 'userPassword': upass}).toArray((err, result) => {
            if (err) {
                res.send({'error':'Error has occurred while fetching all users'});
            } else {
                if(result.length === 1){
                        const userData = { data: result[0], createdAt: new Date().toISOString(), versionKey: result[0]._id};
                        sessionStore.createSession(userData, db).then(function(response){
                            response['userData']= result[0];
                            res.send(response);
                        });
                }
                else if(res.length === 0)
                    res.send({'error':'Multiple users of same credentials.'});
                else    
                    res.send({'error': 'Invalid user credentials'});
            }
        });
    });
};