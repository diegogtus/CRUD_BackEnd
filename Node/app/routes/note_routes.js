const fetch = require('node-fetch');
const redis = require('redis');
const redis_Port = process.env.port || 6379;
const client = redis.createClient({host : 'redis', port : 6379});
//const client = redis.createClient(redis_Port);

module.exports = function(app, db) {
    var ObjectId = require('mongodb').ObjectID; 
//FIND ALL
app.get('/api/v1/cars/', async(req, res) => {
    const id = req.params.id;
    
    const details = { '_id': new ObjectId(id) };
    await db.collection("transport").find({}).toArray(function(err, result) {
    if (err) {        
       res.status(404).send({ 'status': 404, 'error':'An error has occurred'});      } 
    else {
        client.setex(id, 30,result);
        console.log('INGRESADO A REDIS');
       res.status(200).json({ 'status': 200, 'response': result});      
       }     
   });  
});

//DELETE
    app.delete('/api/v1/cars/:id', async (req, res) => { 
        try {
            console.log("entro al delete");
            console.log(req.params);
            
            const id = req.params.id; 
            console.log(id);
           
            const details = {'_id': new ObjectId(id) };
                await db.collection('transport').remove(details, (err, item) => {
                        if (err) {  
                            res.send({ 'status': 404, 'error': 'An error has occurred' });                        
                        }
                        else {    
                            res.status(204).json({status:"Eliminado"});                      
                        }     
                    });                
        } catch (error) {
            
            console.log("entro al catch del delete");
            await res.send({ 'status': 404, 'error': error }); 
        }
    });
//UPDATE 
app.put('/api/v1/cars/:id',async(req, res) => { 
    const id = req.params.id;
    
    const details = { '_id': new ObjectId(id) };
    const cars = { brand: req.body.brand, model: req.body.model, year: req.body.year, displacement: req.body.displacement, description: req.body.description,
        path: req.body.path  };
            await   db.collection('transport').update(details, cars, (err, result) =>{
             if (err) {          
                res.status(404);      }
              else {         
                 res.status(201).json({status:"Actualizado"});
                }     
             });  
         });

//RECIVE
    app.get('/api/v1/cars/:id', async (req, res) => {
             const id = req.params.id;
             const details = { '_id': new ObjectId(id) };
             await  db.collection('transport').findOne(details, (err, item) => {
             if (err) {        
                res.send({'error':'An error has occurred'});      } 
             else {
                client.setex(id, 30,item);
                console.log('INGRESADO A REDIS');
                res.status(200).json(item);     
                //res.send(item);      
                }     
            });  
        });
//CREATE
    app.post('/api/v1/cars/', async(req, res) => {   
        console.log("Entro al create"); 
         console.log(req.body);
         const cars = { brand: req.body.brand, model: req.body.model, year: req.body.year, displacement: req.body.displacement, description: req.body.description,
             path: req.body.photoPath };    
         await db.collection('transport').insert(cars, (err, result) => { 
            if (err) {
                res.send({ 'error': 'An error has occurred' });       } 
            else {
                    res.status(201).json(cars);
                    //res.send(result.ops[0]); 
                        }    
                    });  
                });
            };

                  
                    