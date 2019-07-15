var express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;

var app = express();
var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

var userList = [
	{
		id: 1,
		name: "один"
	},
	{
		id: 2,
		name: "два"
	}
];


// вернуть всех user
app.get("/users", (req,res)=> {
	db.collection("userList").find().toArray((err, docs)=>{
	  if(err){
	    console.log(err);
	    return res.sendStatus(500);
	  }
	  else {
	  	console.log(docs);
			res.send(docs);
	  }
	})
});

// добавить юзера
app.post("/users/add", (req,res)=>{
	console.log("add");
	var user = {
		name: req.body.name
	}
  db.collection("userList").insertOne(user, function(err, results){
	  if(err){
	    console.log(err);
	    return res.sendStatus(500);
	  }
	  else {
	  	console.log(results);
			res.send(user);
	  }
  });

	console.dir(db);
});

// вернуть юзера по id
app.post("/users/:id", (req,res)=>{
  db.collection("userList").findOne({ _id: ObjectId(req.params.id) }, (err, doc)=>{
	  if(err){
	    console.log(err);
	    return res.sendStatus(500);
	  }
	  else {
	  	console.log(doc);
			res.send(doc);
	  }
  });
});

// удалить юзера по id
app.delete("/users/:id", (req,res)=>{
  db.collection("userList").deleteOne(
  	{ _id: ObjectId(req.params.id) },
  	(err, result)=>{
		  if(err){
		    console.log(err);
		    return res.sendStatus(500);
		  } else {
				return res.sendStatus(200);
		  }
		}
	);
});

// изменить имя юзера по id
app.post("/users/:id/edit", (req,res)=>{
	console.dir(req.body.name);
  db.collection("userList").updateOne(
  	{ _id: ObjectId(req.params.id) },
  	{ $set: {name: req.body.name} },
  	(err, result)=>{
		  if(err){
		    console.log(err);
		    return res.sendStatus(500);
		  } else {
				return res.sendStatus(200);
		  }
		}
	);
});

// настройки монго
let url = "mongodb://localhost:27017/";
let mongoClient = new MongoClient(url, { useNewUrlParser: true });

// подключение к монго
mongoClient.connect(function(err, database){
  if(err){
    console.log(err);
  }
  else {
    console.log('connected to '+ url);
    db = database.db("myapi");
		app.listen(3012, ()=>{
			console.log("server start http://localhost:3012");
		});
		// db.close();
  }
});
