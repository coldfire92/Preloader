describe("Config", function() {
	
	var preloader = null;

	var tmpString = "";
	var tmpString2 = "";

	beforeEach(function(){

		preloder = null;
		tmpString = "";

	});

	afterEach(function(){

		tmpString = "";

	});

	it("show error when not add config file", function() {
		
		preloader = new PRELOADER();

		expect("").toBe("");

	});

	it("should add good UI objects", function(){

		var config = {

			UI: {
                onLoadFile: function(loaded, all, percange) {

                    
                    
                },
                init: function() {
                	
                	tmpString = "init";

                },
                complete: function(){

                	tmpString = "complete";

                }
            }
		};

		preloader = new PRELOADER(config);

		expect(tmpString).toBe("init");

	});


	describe("should show that bad UI", function(){


		it("not have init method", function() {

			tmpString2 = "";

			var config2 = {
				UI: {
                	onLoadFile: function(loaded, all, percange) {},
                	complete: function(){}
					}
				};

			preloader2 = new PRELOADER(config2);
			
			expect("").toBe("");

		});


		it("not have onLoadFile method", function() {

			var config3 = {
				UI: {
                	init: function() {},
                	complete: function(){}
					}
				};

			preloader = new PRELOADER(config3);
			
			expect("").toBe("");
		});


		it("not have complete method", function() {

			var config4 = {
				UI: {
                	onLoadFile: function(loaded, all, percange) {},
                	init: function() {}
     				}
				};

			preloader = new PRELOADER(config4);
			
			expect("").toBe("");
		});

	});

});