var Status = require('../models/status');

// показать всех
exports.all = (req, res) => {
	Status.all((err, all)=>{
		if(err) {
			console.log(err);
			return res.sendStatus(500);
		} else {
			res.send(all);
		}
	});
}

// показать одного
exports.findById = (req, res) => {
    Status.findById(req.params.id, (err, doc)=>{
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
    var blankDoc = {}
    Status.create(blankDoc, (err, doc)=>{
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        } else {
            res.send(doc);
        }
    });
}

// обновить
exports.update = (req, res) => {
    let newObj = res.body.status || {name: "blank status"};
    Status.update(req.params.id, newObj, (err, result)=>{
        if(err){
            console.log(err);
            return res.sendStatus(500);
        } else {
            console.log(result);
            return res.sendStatus(200);
        }
    });
}

// удалить
exports.del = (req, res) => {
    Status.del(req.params.id, (err, result)=>{
        if(err){
            console.log(err);
            return res.sendStatus(500);
        } else {
            console.log(result);
            return res.sendStatus(200);
        }
    });
}


