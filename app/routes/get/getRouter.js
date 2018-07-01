const 	path=require("path"),
		Products=require(path.join(__dirname,"routes","products","products.js")),
		Cart=require(path.join(__dirname,"routes","cart","cart.js"));

class getRouter{
	constructor(app){
		app.get("/api/products",(req,res)=>{
			new Products(req,res);
		});
		app.get("/api/cart",(req,res)=>{
			new Cart(req,res);
		});
	}
}
module.exports=getRouter;