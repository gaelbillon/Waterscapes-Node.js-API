var express = require('express');

var hostname = 'localhost';
var port = 3000;

var app = express();
var router = express.Router();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Not required anymore, using Chrome Canary with flag
// var cors = require('cors');
// use it before all route definitions
// app.use(cors({origin: '*'}));

var mongoose = require('mongoose');
var options = {
    server: {
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }
    }
};
var databaseUrl = "mongodb://localhost:27017/jezero";
mongoose.connect(databaseUrl, options);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error while trying to connect'));
db.once('open', function() {
    console.log("Connection to database ok");
});


// Schema for mongoose
var Schema = mongoose.Schema;
var waterpointSchema = new Schema({
    name: String,
    type: String,
    picture: String,
    location: Schema.Types.Mixed
});
var Waterpoint = mongoose.model('Waterpoint', waterpointSchema);

router.route('/')
    // ALL
    .all(function(req, res) {
        res.json({
            message: "Bienvenue sur Jezero",
            methode: req.method
        });
    });

router.route('/waterpoints')
    // GET
    .get(function(req, res) {
        // Use Waterpoints schema to query database
        // Waterpoint.find(function(err, waterpoints) {
        //     if (err) {
        //         res.send(err);
        //     }
        //     res.json(waterpoints);
        // });
        Waterpoint.find(function (err, waterpoints) {
            if (err) {
                res.send(err);
            }
            var response = {
                waterpoints: []
            };
            waterpoints.forEach(function (waterpoint) {
                response.waterpoints.push({
                    _id: waterpoint._id,
                    name: waterpoint.name,
                    type: waterpoint.type,
                    picture: waterpoint.picture,
                    location: {
                        type: waterpoint.location.type,
                        coordinates:[waterpoint.location.coordinates]
                    }
                })
            });
            res.json(response);
        });
    })
    
    // POST
    .post(function(req, res) {

    	// Validate request, check if no params
	   	if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    	    return res.status(400).send({
    	        message: "Content can not be empty"
    	    });
    	}
        
		var waterpoint = new Waterpoint({
		    name: req.body.name,
		    type: req.body.type,
		    picture: req.body.picture,
		    location: {
		        type: "Point",
		        coordinates: [parseFloat(req.body.latitude), parseFloat(req.body.longitude)]
		    }
		});

        // Storing object in database
        waterpoint.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.send({
                message: 'Great ! The new waterpoint has been added to the database', newDocument: waterpoint
            });
        });
    })


	//PUT
	.put(function(req, res) {
        res.json({
            message: "Modify informations for a new waterpoint in the list",
            methode: req.method
        });
    })

    //DELETE
    .delete(function(req, res) {
        res.json({
            message: "Delete a waterpoint in the list",
            methode: req.method
        });
    })


//////////////// Routes for waterpoints id //////////////
router.route('/waterpoints/:waterpoint_id')

	.get(function(req, res) {
	    // Look for a document with its id via Mongoose
	    Waterpoint.findById(req.params.waterpoint_id, function(err, waterpoint) {
	        if (err) {
	            res.send(err);
	        }
	        res.json(waterpoint);
	    });
	})

	.put(function(req, res) {
		
	    var waterpoint = {
	        name: req.body.name,
	        type: req.body.type,
	        picture: req.body.picture,
	        location: {
	            type: "Point",
	            coordinates: [parseFloat(req.body.latitude), parseFloat(req.body.longitude)]
	        }
	    };

	    Waterpoint.findByIdAndUpdate(req.params.waterpoint_id, waterpoint, {
	        new: true
	    }, function(err, waterpoint) {
	        if (err) {
	            res.send(err);
	        }
	        // If everything is fine
	        res.json({
	            message: 'Great ! Informations about this waterpoint have been updated',
	            newDocument: waterpoint
	        });
	    });
	})

	.delete(function(req,res){ 
		Waterpoint.remove({_id: req.params.waterpoint_id}, function(err, waterpoint){
			if (err){
				res.send(err); 
			}
			res.json({message:"The waterpoint has been removed"}); 
		}); 
	})

app.use(router);

app.listen(port, hostname, function() {
    console.log("Server url: http://" + hostname + ":" + port + "\n");
});