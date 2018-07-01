const 	express=require('express'),
		app=express(),
		bodyParser=require('body-parser'),
		winston=require('winston'),
		path=require('path'),
		root=__dirname,
		datasource=require(path.join(root,'classes','datasource','datasource.js')),
		products=new datasource(),
		storage=require(path.join(root,'classes','storage','storage.js')),
		port=process.env.PORT||8080;

products.AddFile(path.join(root,'data','products.json'));
const basket=new storage(products.getAll());

const logger=winston.createLogger({
		transports:[
			new winston.transports.File({filename:path.join(__dirname,"app.log")})
		]
	});

app.locals={
	productsObj:products,
	basketObj:basket,
	logger:logger
}

app.use(bodyParser.urlencoded({extended:true}))

const 	router=require(path.join(root,"routes","router.js")),
		routerObj=new router(app);

app.listen(port,(err)=>{
	if(err){
		console.log(err);
	}else{
		console.log('Listening on port: '+port);
		app.emit('app started');
	}
})
module.exports=app;