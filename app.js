const express = require("express"),
      app = express(),
			mongoose = require("mongoose"),
      Campgrounds = require("./models/campground"),
      Comments	= require("./models/comment");



app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

const url = process.env.DATABASEURL || "mongodb://localhost/campo";
mongoose.connect(url);


const campgroundsRoutes	 = require("./routes/campgrounds");



//RUN THE SERVER
app.listen(process.env.PORT || 3000, () => {
	console.log(process.env.DATABASEURL)
	console.log(process.env.PORT)
	console.log("The YelpCamp Server Has Started");
});
