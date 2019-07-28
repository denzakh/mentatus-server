var express = require("express");
var bodyParser = require("body-parser");
var ObjectId = require("mongodb").ObjectId;
var db = require("./db");
var userController = require("./controllers/user");
var statusController = require("./controllers/status");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));


// USER
// вернуть всех user
app.post("/user/all", userController.all);

// вернуть юзера по id
app.post("/user/get/:id", userController.findById);

// добавить юзера
app.post("/user/create", userController.create);

// удалить юзера по id
app.post("/user/del/:id", userController.del);

// изменить имя юзера по id
app.post("/user/edit/:id", userController.update);


// STATUS
// вернуть все статусы
app.post("/status/all", statusController.all);

// вернуть статус по id
app.post("/status/get/:id", statusController.findById);

// добавить статус
app.post("/status/create", statusController.create);

// удалить статус по id
app.post("/status/del/:id", statusController.del);

// заменить статус по id
app.post("/status/edit/:id", statusController.update);


// MONGO
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
