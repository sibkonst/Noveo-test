const 	path=require("path"),
		Handler=require(path.join("..","..","handler.js"));

class addCart extends Handler{
	constructor(req,res){
		super(req,res);
		const 	id=parseInt(this.req.req.body.product_id),
				quantity=parseInt(this.req.req.body.quantity),
				prods=this.locals.productsObj,
				cart=this.locals.basketObj;
		if(this.ifNumber(id)){
			if(prods.checkById(id)==1){
				if(this.ifNumber(quantity)){
					if(quantity>=1&&quantity<=10){
						cart.add({
							product_id:id,
							quantity:quantity
						});
						this.response(res,200);
					}else{
						this.response(res,400,{
							error:{
								params:[
									{
										code:"required",
										message:"Quantity cannot be blank",
										name:"quantity"
									}
								],
								type:"invalid_param_error",
								message:"Invalid data parameters"
							}
						});
					}
				}else{
					this.response(res,400,"Wrong input. Product quantity is not number");
				}
			}else{
				this.response(res,400,{
					error:{
						params:[
							{
								code:"required",
								message:"Product cannot be blank",
								name:"product_id"
							}
						],
						type:"invalid_param_error",
						message:"Invalid data parameters"
					}
				});
			}
		}else{
			this.response(res,400,"Wrong input. Product id is not number");
		}
	}
}
module.exports=addCart;