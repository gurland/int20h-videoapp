const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
	{
    messageType:
    {
        type: String
    },
		content:
		{
			type: String
		},
		senderId:
		{
			type: Number
		},
		senderName: {
    	type: String
		}
	},
	{
		timestamps: true
	});

const chatSchema = new Schema(
	{
		roomId:
		{
			type: String
		},
    messages:[messageSchema]
	},
	{
		timestamps: true
	});

chatSchema.statics.findOneOrCreate = function findOneOrCreate(condition, callback) {
    const self = this
    self.findOne(condition, (err, result) => {
        return result ? callback(err, result) : self.create(condition, (err, result) => { return callback(err, result) })
    })
}

let Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;