const Validator=require("./validator.js");

class FileReader extends Validator{
	constructor(){
		super();
		this.fs=require("fs");
	}
	readSync(pathStr){
		//Not for production due synchronous read.
		try{
			return this.fs.readFileSync(pathStr,"utf8");
		}catch(e){
			this.errorStr="FileReader.readSync: "+e;
			return(-1);
		}
	}
}
module.exports=FileReader;