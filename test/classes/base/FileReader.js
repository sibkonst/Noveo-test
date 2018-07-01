const 	expect=require("chai").expect,
		path=require("path"),
		FileReader=require(path.join(__dirname,"..","..","..","app","classes","base","FileReader.js"));

describe("FileReader base class",()=>{
	describe("readSync",()=>{
		it("Reads text file and returns contents. Returns -1 on error",()=>{
			const 	normal=new FileReader().readSync(path.join(__dirname,"test_file.txt")),
					fail=new FileReader().readSync("/nobody/here/but/chickens");

			expect(normal).to.equal("Keep calm and continue testing.");
			expect(fail).to.equal(-1);
		})
	})
})