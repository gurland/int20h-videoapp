const JWTSECRET = process.env.JWT_SECRET || 'secret';
console.log(process.env);
const MONGO_URI = process.env.MONGO_URI || "mongodb://root:supersecretpass@localhost:27017/chats?authSource=chats";
const API_HOST = process.env.API_HOST || "api";
const API_PORT = process.env.API_PORT || 5000;

module.exports = { JWTSECRET, MONGO_URI, API_HOST, API_PORT}
