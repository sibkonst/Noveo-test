const 	path=require('path'),
		addCart=require(path.join(__dirname,"addCart","addCart.js"));

class postRouter{
	constructor(app){
		app.post("/api/cart",(req,res)=>{
			new addCart(req,res);
		})
	}
}
module.exports=postRouter;