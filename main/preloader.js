
if(typeof PRELOADER_MODULES == 'undefined') PRELOADER_MODULES = function(){};


/**
 * Main preloader file
 * @param {object} config 
 */
PRELOADER = function(config){

	this.init(config); // call constructor

};


PRELOADER.prototype = (function(){


		/*================================
		=            SETTINGS            =
		================================*/

		var settings = {}; // all setings and files passed to object

		/*==================================
		=            RESPONSIVE            =
		==================================*/

		var isMobile = null;
		var isScreen = null;
		var isTablet = null;

		/*==================================
		=            FILES VARS            =
		==================================*/
		
		var fileToLoad = 0,
			filesLoaded = 0;


		var modules = []; // array of loaded modules

		/*================================
		=            UI                  =
		================================*/

		// default UI
		var UI = {

			onLoadFile: function() {

				var percange = Math.floor((filesLoaded / fileToLoad) * 100) ;
				
				userUI.onLoadFile(filesLoaded, fileToLoad, percange);	

			},
			init: function() {

				userUI.init();	

			},
			complete: function(){

				userUI.complete();	

			}

		};

		/**
		 * If user dont add UI, use this
		 * @type {Object}
		 */
		var userUI = {
			onLoadFile: function() {},
			init: function() {},
			complete: function(){}
		};


		/**
		 * Check if user UI is good
		 * @param {object} UI 	
		*/
		var setUI = function() {			

			if(typeof settings.UI == "undefined") return;

			if(DEBUGGER.run("isGoodUI",{
				UI : settings.UI
			})){

				userUI = settings.UI;

			}

		};


		/*================================
		=            SETTINGS            =
		================================*/
		
		/**
		 * Test and set RWD parametrs
		 */
		var setRWD = function(){

			screen = settings.MAIN.isScreen || true;
			tablet = settings.MAIN.isTablet || false;
			mobile = settings.MAIN.isMobile || false;

			if(DEBUGGER.run("testRWD", {
				Screen : screen,
				Tablet : tablet,
				Mobile : mobile
			})){

				isScreen = screen;
				isTablet = tablet;
				isMobile = mobile;

			}

		};

		/**
		 * Apply new settings for prelaoder
		 * @param {object} settings 
		 */
		var setSettings = function(configToAdd){


			if(typeof configToAdd=="undefined"){
				DEBUGGER.run("info", "You dont add main config file", "Preloader");
				return;
			}
			

			if(typeof configToAdd.MAIN == "undefined"){

				configToAdd.MAIN = {};

			}

			settings = configToAdd;

			setUI();

			setRWD();

		};
		
		/*===========================================
		=            METHODS FOR MODULES            =
		===========================================*/
		
		var getModelMethods = function(settingsMain){

			return {

				/**
				 * Call this methods in module when file loaded
				 * @param  {string} file name
				 * @param  {bool} error true if error
				 * @return {void} 
				 */
			    onLoadFile : function(name, error) {

					filesLoaded++;

					var time = DEBUGGER.run("stopTimer",name);
					
					if(error){

						DEBUGGER.print("Preloder","Can`t load file: "+ name , "error");

					} else {

						DEBUGGER.print("Preloder","Load file: "+ name + "in " + time , "info");

					}

					UI.onLoadFile();

					if(fileToLoad == filesLoaded) onComplete();

				},

				/**
				 * Call when starting loading file
				 * @param  {string} name 
				 */
				startLoadFile: function(name){

					DEBUGGER.run("startTimer", name);

				},

				/**
				 * Get isMobile
				 * @return {Boolean}
				 */
				isMobile : function() {

					return isMobile;

				},


				/**
				 * Get isTablet
				 * @return {Boolean}
				 */
				isTablet : function() {

					return isTablet;

				},

				/**
				 * Get isScreen
				 * @return {Boolean}
				 */
				isScreen : function() {

					return isScreen;

				},


				/**
				 * get screen width
				 * @return {int} width
				 */
				getWindowWidth: function(){


					return settings.MAIN.windowWidth || window.innerWidth;

				},

				/**
				 * get main config e.g. cache etc.
				 * @return {[type]} [description]
				 */
				getMainConfig: function(){

					return settings.MAIN;

				},

				/**
				 * Get file absolute path
				 * @param  {string} url 
				 * @return {string} absolute path
				 */
				getAbsoluteFilePath: function(url){

					
					if(typeof settings.MAIN.absolutePath != "undefined"){

						return settings.MAIN.absolutePath + url;

					}

					return url;

				}

			};


		}; 


		/*=======================================
		=                INIT                   =
		========================================*/

		/**
		 * Init all modules
		 *  - add to modules array
		 *  - sum files to load from module
		 * 
		 * @return {void} 
		 */
		var initModules = function() {

			var addedModules = new PRELOADER_MODULES();
			
			for(var module in addedModules){

				var moduleTmp = addedModules[module].call(getModelMethods(settings), settings[module]);

				if(DEBUGGER.run("isGoodModule",{
					Module : moduleTmp,
					Name : module
				},"Preloader")){

					modules.push(moduleTmp);

					fileToLoad += parseInt(modules[modules.length-1].countFiles()); // cound file to load from module

				}	

			}

		};

		/*=======================================
		=                LOAD                   =
		========================================*/

		/**
		 * Load all files
		 * @return {void}
		 */
		var loadFiles = function() {

			for(var module in modules){

				modules[module].loadFiles();
				
			}

		};

		/**
		 * Call when all files complete
		 * @return {[type]} [description]
		 */
		var onComplete = function() {

			DEBUGGER.run("Preloader","Load all files", "info");
			UI.complete();	

		};

		/*-----  Public methods for preloaderMP  ------*/
	
		return {

			init: function(config){

				// // init UI
				setSettings(config);
				
				// init modules and get files to load
				initModules();

				// init UI
				UI.init();

				// // load files
				// loadFiles();
				
			}

		};		
	
})();