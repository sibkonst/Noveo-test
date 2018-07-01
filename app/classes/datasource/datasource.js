const 	path=require("path"),
		FileReader=require(path.join("..","base","FileReader.js"));

class Datasource extends FileReader{
	/*
		product={
			id:num,
			name:num or str,
			description:num or str,
			price:num
		};
	*/
	constructor(){
		super();
		this.productsArr=[];
	}
	getAll(){
		return this.productsArr;
	}
	checkById(id){
		if(this.ifNumber(id)){
			const prodIndex=this.productsArr.findIndex((p)=>{
				return p.id==id;
			})
			if(prodIndex>=0){
				return (1);
			}else{
				this.errorStr="getById: Not found";
				return(-2);
			}
		}else{
			this.errorStr="getById: Wrong input. Id is not a number";
			return (-1);
		}
	}
	AddOne(prodObj){
		if(this.ifObj(prodObj)){
			if(prodObj.id!=undefined&&
				prodObj.name!=undefined&&
				prodObj.description!=undefined&&
				prodObj.price!=undefined){
				if(this.ifNumber(prodObj.id)&&this.ifNumber(prodObj.price)){
					this.productsArr.push(prodObj);
					return (1);
				}else{
					this.errorStr="AddOne: Wrong product format. Id or price is not number.";
					return (-1);
				}
			}else{
				this.errorStr="AddOne: Some of product properties are missing.";
				return (-1);
			}
		}else{
			this.errorStr="AddOne: Input wrong, not an Object";
		}
	}
	AddFile(pathStr){
		let fileStr=this.readSync(pathStr);
		if(fileStr!=-1){
			if(this.ifJson(fileStr)){
				const fileObj=JSON.parse(fileStr);
				if(this.ifArray(fileObj)){
					fileObj.forEach((p)=>{
						if(this.AddOne(p)!=1){
							return (-1);
						}
					})
					return (1);
				}else{
					if(this.AddOne(fileObj)!=1){
						return (-1);
					}
					return (1);
				}
			}else{
				return (-1);
			}
		}
	}
}
module.exports=Datasource;