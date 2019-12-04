const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
var model = ('./models/car');
const cors = require('cors');

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
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
   'http://3.135.212.39:8000:4200'
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

