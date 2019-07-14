var express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;

var app = express();
var db;
var collection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

var doctorList = [
	{
		id: 1,
		name: "один"
	},
	{
		id: 2,
		name: "два"
	}
];



app.get("/", (req,res)=> {
	res.send(doctorList);
});

app.get("/:id", (req,res)=> {
	var doctor = doctorList.find((doctor)=>{
		return doctor.id === +req.params.id;
	});
	res.send(doctorList);
});

app.post("/add", (req,res)=>{
	var doctor = {
		name: req.body.name
	}
  collection.insertOne(doctor, function(err, results){
	  if(err){
	    console.log(err);
	    res.sendStatus(500);
	  }
	  else {
	  	console.log(results);
			res.send(doctor);
	  }
  });

	console.dir(db);
	// doctorList.push(doctor);
	// res.send(doctorList);
	db.collection("doctorList").insert(doctor, (err, result)=>{

	})
});

app.post("/:id", (req,res)=>{
	var doctor = doctorList.find((doctor)=>{
		return doctor.id === +req.params.id
	});
	if(doctor) {
		doctor.name = req.body.name;
		res.sendStatus(200);
	}
	res.send(doctorList);
});

app.post("/:id/del", (req,res)=>{
	doctorList = doctorList.filter((doctor)=>{
		return doctor.id !== +req.params.id
	});
	res.send(doctorList);
});

let url = "mongodb://localhost:27017/";
let mongoClient = new MongoClient(url, { useNewUrlParser: true });

mongoClient.connect(function(err, database){
  if(err){
    console.log(err);
  }
  else {
    console.log('connected to '+ url);
    db = database.db("myapi");
    collection = db.collection("doctorList");
		app.listen(3012, ()=>{
			console.log("server start");
		});
		// db.close();
  }
});
