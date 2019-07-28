var User = require('../models/user');
var randomName = require('../libs/randomName');


// показать всех
exports.all = (req, res) => {
	User.all((err, docs)=>{
		if(err) {
			console.log(err);
			return res.sendStatus(500);
		} else {
			res.send(docs);
		}
	});
}

// показать одного
exports.findById = (req, res) => {
    User.findById(req.params.id, (err, doc)=>{
        if(err){
            console.log(err);
            return res.sendStatus(500);
        } else {
            res.send(doc);
        }
    });
}

// создать
exports.create = (req, res) => {
    var user = {
        name: req.body.name || randomName()
    }
    User.create(user, (err, results)=>{
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        } else {
            res.send(user);
        }
    });
}

// удалить
exports.del = (req, res) => {
    User.del(req.params.id, (err, result)=>{
        if(err){
            console.log(err);
            return res.sendStatus(500);
        } else {
            console.log(result);
            return res.sendStatus(200);
        }
    });
}

// обновить
exports.update = (req, res) => {
    let newData = {name: "update"};
    User.update(req.params.id, newData, (err, result)=>{
        if(err){
            console.log(err);
            return res.sendStatus(500);
        } else {
            console.log(result);
            return res.sendStatus(200);
        }
    });
}
