const JWTSECRET = process.env.JWT_SECRET || 'secret';
console.log(process.env);
const MONGO_URI = process.env.MONGO_URI || "mongodb://root:supersecretpass@localhost:27017/chats?authSource=chats";

module.exports = { JWTSECRET, MONGO_URI}
