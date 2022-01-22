const  mongoose  = require("mongoose");
const { MONGO_URI } = require('./config.js');
console.log(MONGO_URI)
const  connect = mongoose.connect(MONGO_URI,
{
      useNewUrlParser: true
    }
  );
module.exports = connect;