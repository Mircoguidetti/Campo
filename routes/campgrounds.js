const express = require("express");
const router = express.Router({mergeParms:true});
const Campground = require("../models/campground");


//index route
router.get("/", (req, res) => {

	if(req.query.search){
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');
		//Get all Campgrounds from DB
		Campground.find({name:regex}, (error, allCamps) => {
			if(error){
				console.log(error);
			}else{
				console.log(req.user);
				res.render("campgrounds/index", {campgrounds:allCamps,  page: 'campgrounds'});
			}
		});
	}else{
		Campground.find({}, (error, allCamps) => {
			if(error){
				console.log(error);
			}else{
				console.log(req.user);
				res.render("campgrounds/index", {campgrounds:allCamps,  page: 'campgrounds'});
			}
		});
	}
});

//create route - add new campground to db
router.post("/", middleware.isLoggedIn, upload.single('image'), (req, res) => {
	cloudinary.uploader.upload(req.file.path, (result) => {
      // add cloudinary url for the image to the campground object under image property
      req.body.campground.image = result.secure_url;
      // add author to campground
      req.body.campground.author = {
        id: req.user._id,
        username: req.user.username
      }
      Campground.create(req.body.campground, (err, campground) => {
        if (err) {
          req.flash('error', err.message);
          return res.redirect('back');
        }
        res.redirect('/campgrounds/' + campground.id);
      });
    });
});
//new route - show form to create a New Campground
router.get("/new", middleware.isLoggedIn, (req, res) => {
	res.render("campgrounds/new");
});



module.exports = router;
