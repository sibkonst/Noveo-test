const 	path=require("path"),
		Validator=require(path.join("..","base","Validator.js"));

class Storage extends Validator{
	constructor(productsArr){
		/*
			productsArr=[
				{
					id:num,
					quantity:num
				}
			]
		*/
		super();
		this.touched=0;
		this.productsArr=productsArr;
		this.basketArr=[];
		setInterval(()=>{
			let now=new Date().getTime();
			if(now-this.touched>5*60*1000){
				this.basketArr=[];
			}
		},60*1000);
	}
	touch(){
		this.touched=new Date().getTime();
	}
	add(reqData){
		if(this.ifObj(reqData)){
			if(this.ifNumber(reqData.product_id)&&this.ifNumber(reqData.quantity)){
				if(this.productsArr.filter((p)=>{
					return p.id==reqData.product_id;
				}).length>0){
					const prodIndex=this.basketArr.findIndex((e)=>{
						return e.id==reqData.product_id;
					});
					if(prodIndex>=0){
						const oldQuantity=this.basketArr[prodIndex].quantity;
						this.basketArr[prodIndex].quantity=oldQuantity+reqData.quantity;
					}else{
						this.basketArr.push({
							id:reqData.product_id,
							quantity:reqData.quantity
						});
					};
					this.touch();
					return (1);
				}else{
					this.errorStr="Storage.add: Product not found";
					return(-1);
				}
			}else{
				this.errorStr="Storage.add: Product id or quanity in request is not a number";
				return (-2);
			}
		}else{
			this.errorStr="Storage.add: Wrong input. Not an object";
			return (-3);
		}
	}
	getAll(){
		this.touch();
		return this.basketArr;
	}
	del(prodId){
		if(this.ifNumber(prodId)){
			const prodIndex=this.basketArr.findIndex((p)=>{
				return p.id==prodId;
			});
			if(prodIndex>=0){
				if(this.basketArr[prodIndex].quantity>1){
					this.basketArr[prodIndex].quantity-=1;
				}else{
					this.basketArr.splice(prodIndex,1);
				}
				this.touch();
				return (1);
			}else{
				this.errorStr="Storage.del: Not found.";
				return(-2);
			}
		}else{
			this.errorStr="Storage.del: Wrong input. Not a number.";
			return (-1);
		}
	}
}
module.exports=Storage;