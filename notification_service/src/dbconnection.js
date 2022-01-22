const  mongoose  = require("mongoose");
const { MONGO_URI } = require('./config.js');
const  connect = mongoose.connect(MONGO_URI,
{
      useNewUrlParser: true
    }
  );
module.exports = connect;