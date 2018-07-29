

module.exports = {

    createSession: function(req, db){
        return new Promise(function(resolve, reject){
            console.log(req.body);
            const userData = { data: req.data, createdAt: req.createdAt, versionKey: req.versionKey, expiresAt: new Date(new Date(req.createdAt).getTime() + 60 * 60 * 24 * 1000)};
            db.collection('sessions').insert(userData, (err, result) => {
            if (err) { 
                return resolve({ 'error': 'An error has occurred' }); 
            } else {
                // res.send({'success': 'Successfully Signed Up.', 'id':result.ops[0]._id});
                // res.send({'success': 'Login successfull', 'result':result.insertedIds[0]});
                return resolve({'success': 'Login successfull', 'result':result.insertedIds[0]});
            }
            });

        });
    }
}
// module.exports = {
//     checkSession: function(req, db){
//         return new Promise(function(resolve, reject){
//             // console.log(req.);
//             let id= req.id;
//             const details = { '_id': new ObjectID(id) };
//             // const userData = { data: req.data, createdAt: req.createdAt, versionKey: req.versionKey, expiresAt: new Date(new Date(req.createdAt).getTime() + 60 * 60 * 24 * 1000)};
//             db.collection('sessions').findOne(details, (err, item) => {
//             if (err) { 
//                 return resolve({ 'error': 'An error has occurred' }); 
//             } else {
//                 const sessData = { data: item.data, usedAt: new Date().toISOString() , versionKey: item.versionKey};
//                 sessData['expiresAt']= new Date(new Date(sessData.usedAt).getTime() + 60 * 60 * 24 * 1000)
//                 db.collection('sessions').update(details, sessData, (err, result) => {
//                 if (err) { 
//                     return resolve({'error': 'Error while updating session'});
//                 } else {
//                     return resolve({'success': 'Session Updated successfull', 'result':result.insertedIds[0]});
//                 }
//                 });
                
//             }
//             });

//         });
//     }
    // sessionStore: function(app, db){
    //     console.log(app);
    //     app.get('/getSession/:id', (req, res) => {
    //         console.log("here");
    //         let id= req.params.id;
    //         const details = { '_id': new ObjectID(id) };
    //         db.collection('sessions').findOne(details, (err, item) => {
    //         if (err) {
    //             res.send({'error':'Error has occurred while fetching user'});
    //         } else {
    //             res.send(item);
    //         }
    //         });
    //     });
    //     app.post('/createSession', (req, res) => {
    //         // You'll create your note here.
    //         console.log("req", req)
    //         const userData = { data: req.body.data, createdAt: req.body.createdAt, versionKey: req.body.versionKey, expiresAt: new Date(new Date(res.body.createdAt).getTime() + 60 * 60 * 24 * 1000)};
    //         db.collection('sessions').insert(userData, (err, result) => {
    //         if (err) { 
    //             res.send({ 'error': 'An error has occurred' }); 
    //         } else {
    //             // res.send({'success': 'Successfully Signed Up.', 'id':result.ops[0]._id});
    //             res.send({'success': 'Login successfull', 'result':result});
    //         }
    //         });
    //     });
    //     app.put('/setSession/:id', (req, res) => {
    //         // You'll create your note here.
    //         const id = req.params.id;
    //         const details = { '_id': new ObjectID(id) };
    //         const userData = { data: req.body.data, usedAt: req.body.usedAt, versionKey: req.body.versionKey, expiresAt: new Date(new Date(res.body.createdAt).getTime() + 60 * 60 * 24 * 1000)};
    //         db.collection('sessions').update(details, userData, (err, result) => {
    //         if (err) { 
    //             res.send({ 'error': 'An error has occurred' }); 
    //         } else {
    //             res.send(userData);
    //         }
    //         });
    //     });

    //     app.delete('/deleteSession/:id', (req, res) => {
    //         const id = req.params.id;
    //         const details = { '_id': new ObjectID(id) };
    //         db.collection('sessions').remove(details, (err, item) => {
    //         if (err) {
    //             res.send({'error':'An error has occurred'});
    //         } else {
    //             res.send('Session ' + id + ' deleted!');
    //         } 
    //         });
    //     });
    // }    
// }