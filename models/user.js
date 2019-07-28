var db = require("../db");
var ObjectId = require("mongodb").ObjectId;

// показать всех
exports.all = (cb) => {
	db.get().collection("userList").find().toArray((err, docs)=>{
		cb(err, docs);
	});
}

// показать одного
exports.findById = (id, cb) => {
    db.get().collection("userList").findOne({ _id: ObjectId(id) }, (err, doc)=>{
        cb(err, doc);
    });
}

// добавить нового
exports.add = (user, cb) => {
    db.get().collection("userList").insertOne(user, (err, results)=>{
        user._id = results.insertedId;
        cb(err, user);
    });
}

// удалить
exports.del = (id, cb) => {
    db.get().collection("userList").deleteOne(
        { _id: ObjectId(id) },
        (err, doc)=>{
            cb(err, doc);
        }
    );
}

// обновить
exports.update = (id, newData, cb) => {
    db.get().collection("userList").replaceOne(
        { _id: ObjectId(id) },
        newData,
        (err, result)=>{
            cb(err, result)
        }
    );
}

