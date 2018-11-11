// All middleware goes here
const Comment = require("../models/comment");
const Campground = require("../models/campground");
const middlewareObj = {};


middlewareObj.checkCommentsOwnership = (req, res, next) => {
	//is someone logged in ?
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, (error, foundComment) =>{
			if(error || !foundComment){
				req.flash("error", "Comment not found");
				res.redirect("/campgrounds");
			}else{
				//does user own the comment ?
				if(foundComment.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error", "You dont'have permission to edit this comment");
					res.redirect("/campgrounds");
				}
			}
	});
	}else{
		req.flash("error", "You need to be logged in to edit a comment");
		res.redirect("/login");
	}
}

middlewareObj.checkCampgroundsOwnership = (req, res, next) =>{
	//is someone logged in ?
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, (error, foundCampground) =>{
			if(error || !foundCampground){
				req.flash("error", "Campground not found");
				res.redirect("/campgrounds");
			}else{
				//does user own the campground ?
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error", "You dont'have permission to edit this Campground");
					res.redirect("/campgrounds");
				}
			}
	});
	}else{
		req.flash("error", "You need to be logged in to edit this Campground");
		res.redirect("/login");
	}
}

middlewareObj.isLoggedIn = (req, res, next) =>{
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to create a new Campground")
	res.redirect("/login");
}

module.exports = middlewareObj;
