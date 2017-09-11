var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/task_assigner";

var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.post('/resultList', function(req, res){
	console.log("Is this working?");

	console.log(req);

	// put mongo db manipulation code here
	// MongoClient.connect(url, function(err, db) {
	//   if (err) throw err;
	//   var myobj = { name: "Cameron", address: "1600 Pennsylvania Avenue" };
	//   db.collection("resultList").insertOne(myobj, function(err, res) {
	//     if (err) throw err;
	//     console.log("1 document inserted");
	//     db.close();
	//   });
	// });
});

app.listen(3000);
console.log("Server running on port 3000");