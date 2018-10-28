const express = require("express"),
			mongoose = require("mongoose"),
			passportLocalMongoose = require("passport-local-mongoose"),
			passport = require("passport"),
			LocalStrategy = require("passport-local"),
			bodyParser = require("body-parser");

const app = express();
mongoose.connect("mongodb://localhost/demo_app");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

//passport conf

app.use(require("express-session")({
	secret:"Mirco is setting",
	resave:false,
	saveUninizializated:false
});

app.use(passport.inizializate());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/register", (req, res) => {
	res.render("register");
});

app.post("/register", (req, res) => {
	let newUser = new User ({username:req.body.username});
	User.register(newUser, req.body.password, (error, user) => {
		if(error){
			return res.render("/register");
		}
		passport.authenticate("local")(req, res, () => {
			res.redirect("/");
		});
	});
});

app.get("login", (req, res) => {
	res.render("login");
});

app.post("/login", passport.authenticate("local",
	{
		successRedirect:"/",
		failureRedirect:"/login"
	}), (req, res) => {

});
