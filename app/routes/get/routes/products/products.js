const 	path=require("path"),
		Handler=require(path.join("..","..","..","handler.js"));

class Products extends Handler{
	constructor(req,res){
		super(req,res);
		const prods=this.locals.productsObj.getAll();
		if(prods.length>0){
			this.response(res,200,prods);
		}else{
			this.response(res,404);
		}
	}
}
module.exports=Products;