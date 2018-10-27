const express 	     = require("express"),
      app     	     = express(),



app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));



//RUN THE SERVER
app.listen(process.env.PORT || 3000, () => {
	console.log(process.env.DATABASEURL)
	console.log(process.env.PORT)
	console.log("The YelpCamp Server Has Started");
});
