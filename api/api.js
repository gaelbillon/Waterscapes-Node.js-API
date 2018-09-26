var express = require('express'); 
 
var hostname = 'localhost'; 
var port = 3000; 
 
var app = express(); 
var router = express.Router(); 

var bodyParser = require("body-parser"); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mongoose = require('mongoose'); 
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
var databaseUrl = "mongodb://localhost:27017/lakes"; 
mongoose.connect(databaseUrl, options);

var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'Error while trying to connect')); 
db.once('open', function (){
    console.log("Connection to database ok");
}); 


// Schema for mongoose
var waterpointsSchema = mongoose.Schema({
    name: String, 
    type: String, 
    picture: String, 
    location: { 
    	type: String, 
    	coordinates: [Number] 
    }
}); 

var Waterpoints = mongoose.model('Waterpoints', waterpointsSchema);



router.route('/')
//ALL
.all(function(req,res){ 
      res.json({message : "Bienvenue sur Jezero", methode : req.method});
});

router.route('/waterpoints')
//GET
// .get(function(req,res){ 
// 	  res.json({
// 	  message : "List of all waterpoints :",
// 	  country : req.query.country,
// 	  nbResults : req.query.maxresults, 
// 	  methode : req.method });
// })
.get(function(req,res){ 
// Use Waterpoints schema to query database
    Waterpoints.find(function(err, waterpoints){
        if (err){
            res.send(err); 
        }
        res.json(waterpoints); 
        
    }); 
})
//POST
// .post(function(req,res){
// 	res.json({
// 	message : "Add a new waterpoint to the list", 
// 	name : req.body.name,
// 	type : req.body.type,
// 	methode : req.method});
// })

.post(function(req,res){
    // Use Waterpoints schema
      var waterpoints = new Waterpoints();
    // Retrieving received datas and add to Waterpoints object
      waterpoints.name = req.body.name;
      waterpoints.type = req.body.type;
      waterpoints.picture = req.body.picture;
      // waterpoints.location = req.body.location; 
      waterpoints.location.type = "Point"; 
      waterpoints.location.coordinates = [req.body.latitude, req.body.longitude] 
    //Storing object in database
      waterpoints.save(function(err){
        if(err){
          res.send(err);
        }
        res.send({message : 'Great ! The new waterpoint has been added to the database'});
      })
})


//PUT
.put(function(req,res){ 
	res.json({message : "Modify informations for a new waterpoint in the list", methode : req.method});
})
//DELETE
.delete(function(req,res){ 
	res.json({message : "Delete a waterpoint in the list", methode : req.method});  
}); 
 
router.route('/waterpoints/:waterpoint_id')
.get(function(req,res){ 
	  res.json({message : "Get informations for waterpoint n°" + req.params.piscine_id});
})
.put(function(req,res){ 
	  res.json({message : "Modify informations for waterpoint n°" + req.params.piscine_id});
})
.delete(function(req,res){ 
	  res.json({message : "Delete informations for waterpoint n°" + req.params.piscine_id});
});

app.use(router);  





app.listen(port, hostname, function(){
	console.log("Server url: http://"+ hostname +":"+port+"\n"); 
});