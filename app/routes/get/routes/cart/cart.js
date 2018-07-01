const 	path=require("path"),
		Handler=require(path.join("..","..","..","handler.js"));

class Cart extends Handler{
	constructor(req,res){
		super(req,res);
		const cartProds=this.locals.basketObj.getAll();
		if(cartProds.length>0){
			this.response(res,200,cartProds);
		}else{
			this.response(res,404)
		}
	}
}
module.exports=Cart;