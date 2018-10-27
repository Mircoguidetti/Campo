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

//comment edit route
router.get("/:comment_id/edit",middleware.checkCommentsOwnership, (req, res) =>{
	Campground.findById(req.params.id, (error, foundCampground) => {
		if(error || !foundCampground){
			req.flash("error", "Campground not found");
			return res.redirect("/campgrounds");
		}
		Comment.findById(req.params.comment_id, (error, foundComment) => {
			if(error){
				res.redirect("back");
			}else{
				res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
			}
		});
	});
});

//comment update route
router.put("/:comment_id",middleware.checkCommentsOwnership, (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (error, updateComment) =>{
		if(error){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//comment destroy route
router.delete("/:comment_id",middleware.checkCommentsOwnership, (req, res) => {
	Comment.findByIdAndRemove(req.params.comment_id, (error, foundComment) => {
		if(error || !foundComment){
			req.flash("error", "Comment not found");
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/" + req.params.id)
		}
	});
});




module.exports = router;
