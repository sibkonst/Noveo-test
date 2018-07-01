const 	expect=require("chai").expect,
		path=require("path"),
		Validator=require(path.join(__dirname,"..","..","..","app","classes","base","Validator.js"));

describe("Validator base class",()=>{
	describe("ifObj",()=>{
		it("Returns true if has Object on input and false otherwise",()=>{
			const 	notObj=new Validator().ifObj("Hello, I'm the string."),
					obj=new Validator().ifObj({
						hello:"Hello, I'm the string."
					});

			expect(notObj).to.equal(false);
			expect(obj).to.equal(true);
		})
	});
	describe("ifNumber",()=>{
		it("Returns true if has Number on input and false otherwise",()=>{
			const 	notNum=new Validator().ifNumber("forty two"),
					num=new Validator().ifNumber(42);

			expect(notNum).to.equal(false);
			expect(num).to.equal(true);
		});
		it("Returns false if has NaN on input",()=>{
			const isNan=new Validator().ifNumber(NaN);
			expect(isNan).to.equal(false)
		})
	});
	describe("ifArray",()=>{
		it("Returns true if has Array on input and false otherwise",()=>{
			const 	notArr=new Validator().ifArray("never knows best"),
					arr=new Validator().ifArray(["never","knows","best"]);

			expect(notArr).to.equal(false);
			expect(arr).to.equal(true);
		})
	});
	describe("ifJson",()=>{
		it("Returns true if has JSON on input and false otherwise",()=>{
			const 	notJson=new Validator().ifJson("It is definitely not a JSON"),
					isJson=new Validator().ifJson('{"json":true}');

			expect(notJson).to.equal(false);
			expect(isJson).to.equal(true);
		})
	})
})