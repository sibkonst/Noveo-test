const 	path=require("path"),
		Validator=require(path.join("..","classes","base","Validator.js"));

class Handler extends Validator{
	constructor(req,res){
		super();
		this.locals=req.app.locals;
		this.logger=this.locals.logger;
		this.req=res;
		this.res=res;
	}
	response(res,statusInt,message){
		if(this.ifNumber(statusInt)){
			switch(statusInt){
				case 200:
					res.status(200).send(message||"Ok");
					break;
				case 400:
					res.status(400).send(message||"Bad Request");
					break;
				case 404:
					res.status(404).send(message||"Not Found");
					break;
				default:
					res.status(404).send("Route not found");
			}
		}else{
			res.sendStatus(500);
			this.logger.log("error","[Routes.Handler.Response]: statusInt is not a number.");
		}
	}
}
module.exports=Handler;