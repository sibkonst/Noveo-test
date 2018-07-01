const 	path=require('path'),
		getRouter=require(path.join(__dirname,"get","getRouter.js"));
		delRouter=require(path.join(__dirname,"del","delRouter.js"));
		postRouter=require(path.join(__dirname,"post","postRouter.js"));

class Router{
	constructor(app){
		new getRouter(app);
		new delRouter(app);
		new postRouter(app);
	}
}
module.exports=Router;