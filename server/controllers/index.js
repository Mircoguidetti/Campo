const express = require("express");
const router = express.Router();
const passport = require("passport");
const User  = require("../models/user");


//root route
router.get("/", (req, res) => {
	res.render("landing");
});

// ================================
// AUTH ROUTES
// ================================

//show register form
router.get("/register", (req, res) => {
	res.render("register", {page: 'register'});
});


// handle sign up logic
router.post("/register", (req, res) => {
	let newUser = new User({email:req.body.email, account: ['Local'], username: req.body.username});
	if(req.body.password !== req.body.confirmPassword) {
		req.flash("error", 'Password does not match the confirm password.');
		return res.redirect("/register");
	}
	User.register(newUser, req.body.password, (error, user) => {
		if(error){
			req.flash("error", error.message);
			return res.redirect("/register");
		}
		req.login(user, (error) => {
			if(error){
				console.log(error);
			}else{
				req.flash("success", "Welcome to Campo " + user.username);
				return res.redirect("/campgrounds")
			}
		});

	});
});

//show login form
router.get("/login", (req, res) => {
	res.render("login", {page: 'login'});
});

//handling login logic
router.post("/login", passport.authenticate("local",
	{
		successRedirect:"/campgrounds",
		failureRedirect:"/login"
	}), (req, res) => {

});


// handling google oauth
router.get('/auth/google', passport.authenticate('google',
	{scope: ['https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email']}
));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
	(req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/campgrounds');
  });

//logout route
router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success", "Logged you out");
	res.redirect("/campgrounds");
});

//middleware
let isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;
