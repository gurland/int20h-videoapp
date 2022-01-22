const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const notificationSchema = new Schema(
	{
		userId: {
			type: Number
		},
    notificationType: {
			type: String
		},
		data: {
			type: Schema.Types.Mixed
		},
	},
	{
		timestamps: true
	});

notificationSchema.statics.findOneOrCreate = function findOneOrCreate(condition, callback) {
    const self = this
    self.findOne(condition, (err, result) => {
        return result ? callback(err, result) : self.create(condition, (err, result) => { return callback(err, result) })
    })
}

let Notification = mongoose.model("Notification", notificationSchema);


module.exports = Notification;