const mongoose = require("mongoose");

// Uri path for Mongodb
const dbURI =
"mongodb://webproject:Nr462txWJLtDMKv1@cluster0-shard-00-00-qimlz.mongodb.net:27017,cluster0-shard-00-01-qimlz.mongodb.net:27017,cluster0-shard-00-02-qimlz.mongodb.net:27017/Web?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"
const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10,
  useNewUrlParser: true
};

// To connect to MongoDb database

mongoose.connect(dbURI, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

// require any models
require("../models/User");

