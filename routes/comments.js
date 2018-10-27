const express = require("express");
const router = express.Router({mergeParams:true});
const Comment = require("../models/comment");
const Campground = require("../models/campground");
const middleware = require("../middleware")


//Comments New
router.get("/new", middleware.isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (error, foundCampground) => {
		if(error || !foundCampground){
			req.flash("error", "Campground not found");
			res.redirect("/campgrounds");
		}else{
			res.render("comments/new", {campground:foundCampground});
		}
	});
});

//Comments Create
router.post("/",middleware.isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (error, foundCampground) => {
		if(error || !foundCampground){
			req.flash("error", "Campground not found");
			res.redirect("/campgrounds");
		}else{
			Comment.create(req.body.comment, (error, comment) => {
				if(error){
					console.log(error);
				}else{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					foundCampground.comments.push(comment);
					foundCampground.save();
					res.redirect("/campgrounds/" + foundCampground._id);

				}
			});
		}
	});
});
