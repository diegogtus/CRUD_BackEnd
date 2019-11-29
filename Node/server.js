const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
var model = ('./models/car');
const cors = require('cors');

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

//Database Connection
MongoClient.connect(db.url, (err, database) => {  if (err) return console.log(err)                        // Make sure you add the database name and not the collection name  
    const Database = database.db("CRUD")  
    require('./app/routes')(app, Database);
    
  app.listen(port, () => {    console.log('We are live on ' + port);  });               
})

//cors
//headers para CORS
var originsWhitelist = [
  //'http://localhost:4200'
   'http://ec2-13-58-204-173.us-east-2.compute.amazonaws.com:4200'
];
var corsOptions = {
origin: function(origin, callback){
      var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
      callback(null, isWhitelisted);
},
credentials:true
}

app.use(cors(corsOptions));


app.use(express.urlencoded({ extended: false}));
app.use(express.json());

