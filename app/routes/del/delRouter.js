const 	path=require("path"),
		delCart=require(path.join(__dirname,"delCart","delCart.js"));
class delRouter{
	constructor(app){
		app.delete("/api/cart/:productId",(req,res)=>{
			new delCart(req,res);
		})
	}
}
module.exports=delRouter;