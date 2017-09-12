var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var url = "mongodb://localhost:27017/task_assigner";

var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// populate results in the Saved Results section
app.get('/resultList', function(req, res){

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

// insert document into resultList collection
app.post('/resultList', function(req, res){

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var myobj = { 
                  resultName: req.body.resultName, 
    	  				  people: req.body.people,
    	  				  outputArray: req.body.outputArray
    	  				};
	  db.collection("resultList").insertOne(myobj, function(err, result) {
	    if (err) throw err;
	    console.log("1 document inserted");
      res.json(result);
	    db.close();
	  });
	});
});

app.delete('/resultList/:id', function(req, res){
  console.log("Hello from app.delete");
  console.log(req.params.id);

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var myquery = { _id: ObjectId(req.params.id)};
    db.collection("resultList").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      res.json(obj);
      db.close();
    });
  });
});

app.get('/resultList/:id', function(req, res){
  console.log("Hello from app.get for [Display]");
  console.log(req.params.id);
  console.log(ObjectId(req.params.id));

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("resultList").find({ _id: ObjectId(req.params.id) }).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
      db.close();
    });
  });
});

app.listen(3000);
console.log("Server running on port 3000");