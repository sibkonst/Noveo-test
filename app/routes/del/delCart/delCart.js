const 	path=require("path"),
		Handler=require(path.join("..","..","handler.js"));

class delCart extends Handler{
	constructor(req,res){
		super(req,res);
		const 	prodId=parseInt(this.req.req.params.productId),
				prods=this.locals.productsObj,
				cart=this.locals.basketObj;
		if(this.ifNumber(prodId)){
			const ifExists=prods.checkById(prodId);
			if(ifExists==1){
				const opStatus=cart.del(prodId);
				if(opStatus==1){
					this.response(res,200);
				}else if(opStatus==-2){
					this.response(res,404,"No such product in cart");
				}
			}else if(ifExists==-2){
				this.response(res,400,"No such product in system");
			}
		}else{
			this.response(res,400);
		}
	}
}
module.exports=delCart;