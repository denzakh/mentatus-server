let MongoClient = require("mongodb").MongoClient;
let ObjectId = require("mongodb").ObjectId;

let state = {
	db: null
}

exports.connect = function(url, done) {
	if(state.db) {
		return done();
	}
	MongoClient.connect(url, { useNewUrlParser: true }, (err,client)=>{
	  if(err){
	    return done(err);
	  } else {
	  	state.db = client.db("myapi"); //новый синтаксис mongo
	  	done();
	  }
	})
}

exports.get = function() {
  return state.db;
}