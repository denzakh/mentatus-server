var db = require("../db");
var ObjectId = require("mongodb").ObjectId;

// показать всех
exports.all = (cb) => {
	db.get().collection("statusList").find().toArray((err, all)=>{
		cb(err, all);
	});
}

// показать одного
exports.findById = (id, cb) => {
    db.get().collection("statusList").findOne({ _id: ObjectId(id) }, (err, doc)=>{
        cb(err, doc);
    });
}

// создать
exports.create = (status, cb) => {
    db.get().collection("statusList").insertOne(status, (err, results)=>{
        status._id = results.insertedId;
        cb(err, status);
    });
}

// обновить
exports.update = (id, newObj, cb) => {
    db.get().collection("statusList").replaceOne(
        { _id: ObjectId(id) },
        newObj,
        (err, result)=>{
            cb(err, result)
        }
    );
}

// удалить
exports.del = (id, cb) => {
    db.get().collection("statusList").deleteOne(
        { _id: ObjectId(id) },
        (err, doc)=>{
            cb(err, doc);
        }
    );
}



