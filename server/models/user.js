const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const validator = require('validator');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	time: {type: Date, default: Date.now()},
	account: Array,
	password: String,
	username: {type: String, required: true}
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email', errorMessages : { UserExistsError : 'A user with the given email is already registered.' } });

module.exports = mongoose.model("User", userSchema);
