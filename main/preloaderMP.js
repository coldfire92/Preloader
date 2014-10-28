


window.preloaderMP = function(config, user_modules){

	this.version = '1.0';

	this.init(config, user_modules); // call constructor

};


window.preloaderMP.prototype = (function(){


	/*-----  Private methods for preloaderMP  ------*/


		/*================================
		=            SETTINGS            =
		================================*/

		var CACHE = false;
		var settings = {}; // all setings and files passed to object

		/*==================================
		=            RESPONSIVE            =
		==================================*/

		var isMobile = null;
		var screenWidth = null;
		var MAX_MOBILE_WIDTH  = 800;

		/*==================================
		=            FILES VARS            =
		==================================*/
		
		
		var fileToLoad = 0,
			filesLoaded = 0;

		var moduleObj = null; // intance of preloaderMP_MODULE
		var modules = []; // array of loaded modules



		/*================================
		=            DEBUGGER            =
		================================*/

		try{	
			var deb = (preloaderMP_DEB) ? new preloaderMP_DEB() : false; // debugger

		}catch(e){
			
			var deb = false; // if cant get debugger 
		}	


		/*================================
		=            UI                  =
		================================*/

		// default UI
		var UI = {
			onLoadFile: function() {


				var percange = Math.floor((filesLoaded / fileToLoad) * 100) ;

				modelMethods.testDebug('MAIN', 'runUIMethod', 'onLoadFile');
				userUI.onLoadFile(filesLoaded, fileToLoad, percange);	

			},
			init: function() {

				modelMethods.testDebug('MAIN', 'runUIMethod', 'init');
				userUI.init();	

			},
			complete: function(){

				modelMethods.testDebug('MAIN', 'runUIMethod', 'complete');
				userUI.complete();	

			}

		};

		var userUI = {
			onLoadFile: function() {},
			init: function() {},
			complete: function(){}
		};


		var setUI = function(UI) {

			if(UI){

				modelMethods.testDebug('MAIN', 'isGoodUI', UI);

				userUI = UI;

			}
		

		};

		/*=========================================================
		=       METHODS WHICH  EXTENDS preloaderMP_MODEL          =
		=========================================================*/
		

		var modelMethods = {

			cache: CACHE,

		    onLoadFile : function(name, error) {

				filesLoaded++;
				

				this.testDebug('MAIN', 'onLoadFile', {name: name, error: (error) ? true : false});

				UI.onLoadFile();

				if(fileToLoad == filesLoaded) onComplete();

			},

			isMobile : function() {

				return isMobile;

			},

			getScreen : function() {

				return screenWidth;

			},

			testDebug : function(module, name, data){

				if(deb && typeof deb.test != 'undefined') deb.test.call(deb, module, name, data);

			},

			simulateLoad: function(files, fnComplete) {

				if(deb && typeof deb.simulateLoad != 'undefined') deb.simulateLoad.call(deb, files, fnComplete);

			}


		};


		/*=======================================
		=                INIT                   =
		========================================*/

		var initModules = function() {

			moduleObj= new preloaderMP_MODULE();	

			for(var module in moduleObj){

				modelMethods.testDebug('MAIN', 'isSettignsForPlugin', {name: module, config: settings});

				modules.push(moduleObj[module].call(modelMethods, settings[module]));

				fileToLoad += modules[modules.length-1].countFiles(); // cound file to load from module
				
			}

		};

		/*=======================================
		=                LOAD                   =
		========================================*/

		var loadFiles = function() {


			for(var module in modules){

				modules[module].loadFiles();
				
			}

		};

		var onComplete = function() {

			modelMethods.testDebug('MAIN', 'onComplete');
			UI.complete();

			

		};

		/*=======================================
		=          	INIT SETTINGS               =
		========================================*/

		var setScreenWidth = function(MAIN) {

			if(typeof MAIN == 'undefined') {
				// user set
				screenWidth = window.innerWidth;	
				return;
			}

			if(typeof MAIN.screenWidth == 'undefined'){
				// user set MAIN but not screenWidth
				screenWidth = window.innerWidth;	
				return;

			}

			modelMethods.testDebug('MAIN', 'isGoodScreenWidth', MAIN.screenWidth);
			screenWidth = parseInt(MAIN.screenWidth);


		};

		var setIsMobile = function(MAIN) {

			if(typeof MAIN == 'undefined') {
				// user set
				isMobile = (MAX_MOBILE_WIDTH >= screenWidth);	
				return;
			}

			if(typeof MAIN.isMobile == 'undefined'){
				// user set MAIN but not screenWidth
				isMobile = (MAX_MOBILE_WIDTH >= screenWidth);	
				return;

			}

			isMobile = MAIN.isMobile;


		};

		var setSettings = function(MAIN) {


			setScreenWidth(MAIN);
			modelMethods.testDebug('MAIN', 'showVars', {name: 'Screen width', value: screenWidth});

			setIsMobile(MAIN);
			modelMethods.testDebug('MAIN', 'showVars', {name: 'isMobile', value: isMobile});



		};	

		/*-----  Public methods for preloaderMP  ------*/
	
		return {

			init: function(config){

				settings = config; // get user config object
				

				// init UI
				setSettings(config.MAIN);

				// init modules and get file to load
				initModules();

				// init UI
				setUI(config.UI);
				UI.init();

				// load files
				loadFiles();
				
			}


		};
		
	
})();