var express = require("express");
var bodyParser = require("body-parser");
var ObjectId = require("mongodb").ObjectId;
var db = require("./db");

var app = express();

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
	db.get().collection("userList").find().toArray((err, docs)=>{
	  if(err){
	    console.log(err);
	    return res.sendStatus(500);
	  }
	  else {
			res.send(docs);
	  }
	})
});

// добавить юзера
app.post("/users/add", (req,res)=>{
	var user = {
		name: req.body.name
	}
  db.get().collection("userList").insertOne(user, function(err, results){
	  if(err){
	    console.log(err);
	    return res.sendStatus(500);
	  } else {
			res.send(user);
	  }
  });
});

// вернуть юзера по id
app.post("/users/:id", (req,res)=>{
  db.get().collection("userList").findOne({ _id: ObjectId(req.params.id) }, (err, doc)=>{
	  if(err){
	    console.log(err);
	    return res.sendStatus(500);
	  } else {
			res.send(doc);
	  }
  });
});

// удалить юзера по id
app.delete("/users/:id", (req,res)=>{
  db.get().collection("userList").deleteOne(
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
  db.get().collection("userList").updateOne(
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

// подключение к монго
db.connect(url, function(err){
  if(err){
    console.log(err);
  } else {
    console.log('connected to '+ url);
		app.listen(3012, ()=>{
			console.log("server start http://localhost:3012");
		});
  }
});
