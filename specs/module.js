
describe("Module", function() {

	var prelaoder = null;

	beforeEach(function(){

		PRELOADER_MODULES = function(){}; // remove all modules
		
	});



	it("check is good", function() {
	

		PRELOADER_MODULES.prototype.TEST1 = function(conf){
			var version = '1.0';
			var utils = this;
			var config = conf; 
			var fileToLoad = [];
			var init = function() {	};
			var countFiles = function(){ return 10;};
			var fileLoaded = function(url){utils.onLoadFile(url);};
			var loadFiles = function(){utils.onLoadFile("link");};
			init(); // call constructor
			return {
				countFiles: function() {
					return countFiles();
				},
				loadFiles: function() {
					return loadFiles();
				}
			};
		};

		prelaoder = new PRELOADER({});

		expect("").toBe("");


	});

	it("should show that not have countFiles method", function() {
		
		PRELOADER_MODULES.prototype.TEST1 = function(conf){
			var utils = this;
			var countFiles = function(){ return 10;};
			var fileLoaded = function(url){utils.onLoadFile(url);};
			var loadFiles = function(){utils.onLoadFile("link");};
			return {
	
				loadFiles: function() {
					return loadFiles();
				}
			};
		};

		prelaoder = new PRELOADER({});

		expect("").toBe("");

	});

	it("should show that countFiles not return int", function() {
		

		PRELOADER_MODULES.prototype.TEST2 = function(conf){
			var utils = this;
			var countFiles = function(){ return "error";};
			var fileLoaded = function(url){utils.onLoadFile(url);};
			var loadFiles = function(){utils.onLoadFile("link");};
			return {
				countFiles: function() {
					return countFiles();
				},
				loadFiles: function() {
					return loadFiles();
				}
			};
		};

		prelaoder = new PRELOADER({});

		var TEST2 = new PRELOADER_MODULES().TEST2();
						
		expect("").toBe("");

	});

	it("should show that not have countFiles method", function() {
		
		PRELOADER_MODULES.prototype.TEST1 = function(conf){
			var utils = this;
			var countFiles = function(){ return 10;};
			var fileLoaded = function(url){utils.onLoadFile(url);};
			var loadFiles = function(){utils.onLoadFile("link");};
			return {
				loadFiles: function() {
					return loadFiles();
				}
			};
		};

		prelaoder = new PRELOADER({});

		expect("").toBe("");

	});

	describe("shoud have access to RWD", function() {
		
		var isTablet;
		var isScreen;
		var isMobile;

		PRELOADER_MODULES.prototype.TEST5 = function(conf){
			var utils = this;
			var countFiles = function(){ 

				isMobile = utils.isMobile();
				isScreen = utils.isScreen();
				isTablet = utils.isTablet();
				
				return 4;

			};
			var fileLoaded = function(url){utils.onLoadFile(url);};
			var loadFiles = function(){utils.onLoadFile("link");};
			return {countFiles: function() {return countFiles();},loadFiles: function() {return loadFiles();}};
		};

		prelaoder = new PRELOADER({
			MAIN: {
				isScreen: false,
				isMobile: false,
				isTablet: true
			}
		});

		it("isTablet", function() {
			
			expect(isTablet).toBeFalsy();

		});


		it("isScreen", function() {
			expect(isScreen).toBeTruthy();
		});
	

		it("isMobile", function() {
			expect(isMobile).toBeFalsy();
		});

		isTablet = null;
		isScreen = null;
		isMobile = null;

		prelaoder = new PRELOADER({});

		it("isTablet (default)", function() {
			expect(isTablet).toBeFalsy();
		});

		it("isScreen (default)", function() {
			expect(isScreen).toBeTruthy();
		});
	
		it("isMobile (default)", function() {
			expect(isMobile).toBeFalsy();
		});
	
	});

	it("should have access to module config", function() {
		
		var config = null;
		
		var defaultConfig = {
			filesToLoad : ["test.pl/theme/"]
		};

		PRELOADER_MODULES.prototype.TEST5 = function(conf){
			var utils = this;
			var countFiles = function(){ 

				config = conf;
				return 4;

			};
			var fileLoaded = function(url){utils.onLoadFile(url);};
			var loadFiles = function(){utils.onLoadFile("link");};
			return {countFiles: function() {return countFiles();},loadFiles: function() {return loadFiles();}};
		};

		prelaoder = new PRELOADER({
			TEST5: defaultConfig 
		});

		expect(config).toEqual(defaultConfig);

		
	});
	

	/*=========================================
	=            GET ABSOLUTE PATH            =
	=========================================*/
	
	

	it("should have access to getAbsoluteFilePath", function() {

		var path = "";
		
		PRELOADER_MODULES.prototype.TEST5 = function(conf){
			var utils = this;
			var countFiles = function(){ 
				
				path = utils.getAbsoluteFilePath("plik1.css");
				return 4;

			};
			var fileLoaded = function(url){utils.onLoadFile(url);};
			var loadFiles = function(){utils.onLoadFile("link");};
			return {countFiles: function() {return countFiles();},loadFiles: function() {return loadFiles();}};
		};

		prelaoder = new PRELOADER({
			MAIN: {
				absolutePath : "test.pl/theme/"
			}
		});

		expect(path).toBe("test.pl/theme/plik1.css");

	});



	it("should have access to getAbsoluteFilePath (default)", function() {

		var path = "";
		
		PRELOADER_MODULES.prototype.TEST5 = function(conf){
			var utils = this;
			var countFiles = function(){ 

				path = utils.getAbsoluteFilePath("plik1.css");
				return 4;

			};
			var fileLoaded = function(url){utils.onLoadFile(url);};
			var loadFiles = function(){utils.onLoadFile("link");};
			return {countFiles: function() {return countFiles();},loadFiles: function() {return loadFiles();}};
		};

		prelaoder = new PRELOADER({});

		expect(path).toBe("plik1.css");

	});

	/*==========================================
	=            GET MAIN CONFIG            =
	==========================================*/


	it("should have access to MAIN config", function() {
		
		var config = null;
		
		var defaultMainConfig = {
			absolutePath : "test.pl/theme/"
		};

		PRELOADER_MODULES.prototype.TEST5 = function(conf){
			var utils = this;
			var countFiles = function(){ 

				config = utils.getMainConfig();
			
				return 4;

			};
			var fileLoaded = function(url){utils.onLoadFile(url);};
			var loadFiles = function(){utils.onLoadFile("link");};
			return {countFiles: function() {return countFiles();},loadFiles: function() {return loadFiles();}};
		};

		prelaoder = new PRELOADER({
			MAIN: defaultMainConfig
		});

		expect(config).toEqual(defaultMainConfig);

		
	});

	/*===========================================
	=            GET TO SCREEN WIDTH            =
	===========================================*/


	it("should have access to screenWidth", function() {
		

		var screenWidth = null;
		
		PRELOADER_MODULES.prototype.TEST8 = function(conf){
			var utils = this;
			var countFiles = function(){ 

				screenWidth = utils.getWindowWidth();
				return 4;

			};
			var fileLoaded = function(url){utils.onLoadFile(url);};
			var loadFiles = function(){utils.onLoadFile("link");};
			return {countFiles: function() {return countFiles();},loadFiles: function() {return loadFiles();}};
		};


		prelaoder = new PRELOADER({
			MAIN: {
				windowWidth : 480
			}
		});

		expect(screenWidth).toBe(480);
			
	});


	it("should have access to screenWidth (default)", function() {
		

		var screenWidth = null;
		
		PRELOADER_MODULES.prototype.TEST8 = function(conf){
			var utils = this;
			var countFiles = function(){ 

				screenWidth = utils.getWindowWidth();
				return 4;

			};
			var fileLoaded = function(url){utils.onLoadFile(url);};
			var loadFiles = function(){utils.onLoadFile("link");};
			return {countFiles: function() {return countFiles();},loadFiles: function() {return loadFiles();}};
		};

		prelaoder = new PRELOADER({});
		expect(screenWidth).toBeNumber();
			
	});

});