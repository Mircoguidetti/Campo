const express 	     = require("express"),
      app     	     = express(),



app.get('/', (req, res) => {
	res.render('Hello World');
});


//RUN THE SERVER
app.listen(process.env.PORT || 3000, () => {
	console.log(process.env.DATABASEURL)
	console.log(process.env.PORT)
	console.log("The YelpCamp Server Has Started");
});
