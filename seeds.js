const mongoose 		= require("mongoose");
const Campground 	= require("./models/campground");
const Comment 		= require("./models/comment");

const data = [
	{
		name: "Granite Hill",
		image: "https://www.decathlon.co.uk/ecuk/static/wedze/assets/img/camping/camping-background.jpg",
		description:"Quisque hendrerit fringilla arcu vel tincidunt. Sed mi massa, venenatis id leo eu, semper facilisis ipsum. Aliquam tincidunt suscipit tincidunt. Etiam sed aliquam eros. Quisque at orci et libero convallis laoreet eu et quam. Nulla laoreet vestibulum massa, in imperdiet metus euismod eu. Proin pulvinar tincidunt ornare. Cras efficitur porttitor mauris vitae dictum. Nunc commodo fringilla tortor, at dignissim tortor imperdiet quis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec iaculis accumsan libero non aliquet."
	},
	{
		name: "Cloud's Rest",
		image: "https://coresites-cdn.factorymedia.com/mpora_new/wp-content/uploads/2017/06/Wild-Camping-In-Scotland.jpg",
		description:"Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse faucibus, mauris ac imperdiet sagittis, nunc turpis pellentesque diam, sed lacinia tellus lectus vel lectus. Vestibulum imperdiet neque pellentesque sodales rutrum. Sed eleifend ex mauris, pellentesque porta lectus sollicitudin nec. Ut in placerat enim. Morbi vel mi sed velit rhoncus semper consequat pulvinar nulla. Vivamus viverra finibus ultricies. Quisque metus ante, iaculis sit amet enim vel, accumsan blandit turpis. Phasellus id sem nisi. Integer in eleifend quam. Sed ut mauris lorem. Suspendisse sagittis ex vitae diam tristique faucibus. Etiam congue orci sit amet vulputate tincidunt. Curabitur euismod ultrices ullamcorper. Curabitur eu bibendum mauris. Duis sodales rutrum mi, in tempus velit porta vitae."
	},
	{
		name: "Desert Mesa",
		image: "https://s3-us-west-2.amazonaws.com/hispotion-prod/wp-content/uploads/2017/05/31-05101657f53d1a399b7051016886742565-31.jpg",
		description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel erat ut lacus rutrum sagittis. Vivamus porta mi efficitur elit rhoncus fringilla. Morbi pellentesque ante a lobortis varius. Cras semper, lacus vulputate suscipit commodo, diam enim sodales sapien, at dictum lorem orci ut tellus. Integer posuere accumsan rhoncus. In bibendum libero lectus, interdum scelerisque arcu dapibus mattis. Nullam aliquet turpis massa, id gravida ligula viverra non. Etiam eleifend nisl sit amet ante volutpat, laoreet interdum risus tempus. Duis in porta erat. Curabitur ut porttitor tortor. Ut interdum sagittis nulla, fermentum accumsan elit tristique hendrerit. Morbi nec diam felis. Maecenas a orci scelerisque tellus gravida imperdiet. Phasellus quis quam in sem condimentum gravida. Maecenas efficitur ac dolor vulputate hendrerit. Praesent vel ultricies lorem."
	},
]

let seedDB = () => {
	Campground.remove({}, (error) => {
		if(error){
			console.log(error);
		}else{
			console.log("Removed Campgrounds");
		}
		// //Add a few campgrounds
	// 	data.forEach(function(seed){
	// 	Campground.create(seed, (error, campground) =>{
	// 		if(error){
	// 			console.log(error);
	// 		}else{
	// 			console.log("Added a campground");
	// 			// Add a few comments
	// 			Comment.create({
	// 				text: "Place is awesome but i wish to have a shower",
	// 				author: "Carl",
	// 			}, (error, comment) =>{
	// 				if(error){
	// 					console.log(error);
	// 				}else{
	// 					campground.comments.push(comment);
	// 					campground.save((error, comment) =>{
	// 						if(error){
	// 							console.log(error);
	// 						}else{
	// 							console.log("Added comment");
	// 						}
	// 					});
	// 				}
	// 			});
	// 		}
	//
	// 	});
	// });
	});
};

module.exports = seedDB;
