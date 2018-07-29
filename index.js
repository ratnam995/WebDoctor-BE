const express= require('express');
const MongoClient= require('mongodb').MongoClient;
const bodyParser= require('body-parser');
const db= require('./config/db');
const app= express();

const port = 8000;

// require('./app/routes')(app, {});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
                        
    // console.log("database.db", database.db("webDoctor-DB"));
    // Make sure you add the database name and not the collection name
    // db = database.db("webDoctor-DB");

    require('./app/routes')(app, database.db("webDoctor-DB"));

    app.listen(port, () => {
      console.log('We are live on ' + port);
      console.log('We are live on ' + new Date());
      let d= new Date().toISOString().substring(0, 10)
      console.log('We are live on ' + new Date(new Date(new Date().toISOString()).getTime() + 60 * 60 * 24 * 1000));
    });               
  })