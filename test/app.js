const 	expect=require("chai").expect,
		request=require("request"),
		path=require("path"),
		products=require(path.join(__dirname,"..","app","data","products.json")),
		app=require(path.join(__dirname,"..","app","app.js"));
describe("Server API",()=>{
	let serv;
	before((done)=>{
		serv=app.listen(undefined,()=>{
			done();
		})
	});
	describe("Post requests",()=>{
		describe("/api/cart",()=>{
			const url="http://localhost:8080/api/cart";
			it("Returns status 200 on product add",(done)=>{
				request.post({url,form:{
					product_id:1,
					quantity:2
				}},(err,resp,body)=>{
					expect(resp.statusCode).to.equal(200);
					done();
				})
			})
			it("Returns status 400 if product_id is not num",(done)=>{
				request.post({url,form:{
					product_id:"oneoneone",
					quantity:5
				}},(err,resp,body)=>{
					expect(resp.statusCode).to.equal(400);
					done();
				})	
			})
			it("Returns status 400 if quantity is not num",(done)=>{
				request.post({url,form:{
					product_id:1,
					quantity:"five"
				}},(err,resp,body)=>{
					expect(resp.statusCode).to.equal(400);
					done();
				})	
			})
			it("Returns status 400 if have wrong product_id on input",(done)=>{
				request.post({url,form:{
					product_id:800,
					quantity:5
				}},(err,resp,body)=>{
					expect(resp.statusCode).to.equal(400);
					done();
				})	
			})
			it("Returns status 400 if quantity is less than 1",(done)=>{
				request.post({url,form:{
					product_id:1,
					quantity:0
				}},(err,resp,body)=>{
					expect(resp.statusCode).to.equal(400);
					done();
				});
			})
			it("Returns status 400 if quantity is bigger than 10",(done)=>{
				request.post({url,form:{
					product_id:1,
					quantity:11
				}},(err,resp,body)=>{
					expect(resp.statusCode).to.equal(400);
					done();
				});	
			})
		})
	})
	describe("Delete requests",()=>{
		describe("/api/cart/:productId",()=>{
			const url="http://localhost:8080/api/cart/1";
			it("If product quantity>1, reduces quantity by 1",(done)=>{
				request.del(url,(err,resp,body)=>{
					request("http://localhost:8080/api/cart",(err,resp,body)=>{
						expect(JSON.parse(body)[0].quantity).to.equal(1);
						done();
					})
				})
			})
			it("If product quantity==1, removes product from cart",(done)=>{
				request.del(url,(err,resp,body)=>{
					request("http://localhost:8080/api/cart",(err,resp,body)=>{
						expect(resp.statusCode).to.equal(404);
						done();
					})
				})
			})
		})
	})
	describe("Get requests",()=>{
		describe("/api/products",()=>{
			const url="http://localhost:8080/api/products";
			it("Returns products list",(done)=>{
				request(url,(err,resp,body)=>{
					expect(JSON.parse(body)).to.deep.equal(products);
					done();
				});
			});
			it("Returns status 200",(done)=>{
				request(url,(err,resp,body)=>{
					expect(resp.statusCode).to.equal(200);
					done();
				});	
			});
		});
		describe("/api/cart",()=>{
			const url="http://localhost:8080/api/cart";
			it("Returns status 404 if cart is empty",(done)=>{
				request(url,(err,resp,body)=>{
					expect(resp.statusCode).to.equal(404);
					done();
				});
			});
			it("Returns products array if there are some products in cart",(done)=>{
				request(url,(err,resp,body)=>{
					request.post({url,form:{
						product_id:1,
						quantity:2
					}},(err,resp,body)=>{
						request(url,(err,resp,body)=>{
							expect(JSON.parse(body)).to.be.a("array");
							done();
						})
					})
				})
			})
		})
	});
	after((done)=>{
		serv.close(done);
	});
})