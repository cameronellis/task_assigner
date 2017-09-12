var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/task_assigner";

var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/resultList', function(req, res){
  console.log("going out to get stuff from the db now");

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("resultList").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
      db.close();
    });
  });

});

// insert document into collection
app.post('/resultList', function(req, res){
	// console.log("Is this working?");
	// console.log(req);	// my data is in the req!
	// console.log(req.body);
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var myobj = { 
                  resultName: req.body.resultName, 
    	  				  people: req.body.people,
    	  				  outputArray: req.body.outputArray
    	  				};
	  db.collection("resultList").insertOne(myobj, function(err, res) {
	    if (err) throw err;
	    console.log("1 document inserted");
	    db.close();
	  });
	});
});

app.listen(3000);
console.log("Server running on port 3000");