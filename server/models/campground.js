const mongoose = require("mongoose");

//SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
	name: String,
	image:String,
	price: String,
	description: String,
	location: String,
	lat: Number,
	lng: Number,
	author:{
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username: 'String'
	},
	comments:[
		{ type: mongoose.Schema.Types.ObjectId,
		  ref: "Comment",
		}
	]},
	{usePushEach: true});

module.exports = mongoose.model("Campground", campgroundSchema);
