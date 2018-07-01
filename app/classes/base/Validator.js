class Validator{
	constructor(){
		this.errorStr;
	}
	ifObj(input){
		return (input instanceof Object);
	}
	ifNumber(input){
		if(typeof(input)=="number"&&!Number.isNaN(input)){
			return true;
		}else{
			return false;
		}
	}
	ifArray(input){
		return Array.isArray(input);
	}
	ifJson(input){
		try{
			JSON.parse(input);
			return true;
		}catch(e){
			this.errorStr="Validator.ifJson: "+e;
			return false;
		}
	}
}
module.exports=Validator;