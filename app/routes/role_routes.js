var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.get('/fetchAllRoles', (req, res)=>{
        db.collection('roles').find().toArray((err, result)=>{
            if(err)
                res.send({'error': 'Error while fetching all records'});
            else{
                res.send(result);
            }
        });
    });
    app.get('/fetchSingleRoles/:id', (req, res) => {
        let id= req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('roles').findOne(details, (err, item) => {
          if (err) {
            res.send({'error':'Error has occurred'});
          } else {
            res.send(item);
          }
        });
    });
    app.post('/addRoles', (req, res) => {
        // You'll create your note here.
        const role = { text: req.body.name, title: req.body.tag };
        db.collection('roles').insert(role, (err, result) => {
        if (err) { 
            res.send({ 'error': 'An error has occurred' }); 
        } else {
            res.send(result.ops[0]);
        }
        });
    });
};