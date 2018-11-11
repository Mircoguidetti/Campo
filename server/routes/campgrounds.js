const express = require("express");
const router = express.Router({mergeParms:true});
const Campground = require("../models/campground");
const middleware = require("../middleware");
const multer = require('multer');
const cloudinary = require('cloudinary');




let storage = multer.diskStorage({
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  }
});

let imageFilter = (req, file, cb) => {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
let upload = multer({ storage: storage, fileFilter: imageFilter});


cloudinary.config({
  cloud_name: 'djwkv5jke',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


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


//show route - shows more info about one campground
router.get("/:id", (req, res) => {
	//find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec((error, foundCamp) => {
		if(error || !foundCamp){
			req.flash("error", "Campground not found");
			res.redirect("/campgrounds");
		}else{
			//render show template with that campground
			res.render("campgrounds/show", {campground: foundCamp});
		}
	});
});

//edit campground route
router.get("/:id/edit", middleware.checkCampgroundsOwnership, (req, res) => {

	Campground.findById(req.params.id, (error, foundCamp) => {
		res.render("campgrounds/edit", {campground: foundCamp});
	});
});

//update campground route
router.put("/:id", middleware.checkCampgroundsOwnership,upload.single('image'), (req, res) => {
	cloudinary.uploader.upload(req.file.path, (result) => {
      	// add cloudinary url for the image to the campground object under image property
      	req.body.campground.image = result.secure_url;
      	// add author to campground
      	req.body.campground.author = {
        	id: req.user._id,
        	username: req.user.username
      	}
      	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (error, updateCampground) => {
      	req.flash("success", "Campground update");
		res.redirect("/campgrounds/" + req.params.id);
		});
    });
});




//destroy campground route
router.delete("/:id", middleware.checkCampgroundsOwnership, (req, res) => {
	Campground.findByIdAndRemove(req.params.id, (error) => {
		if(error){
			console.log(error)
			res.redirect("/campgrounds");
		}else{
			req.flash("success", "Campground removed");
			res.redirect("/campgrounds");
		}
	});
});

let escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;
