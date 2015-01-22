

if(typeof window.preloaderMP_MODULE == 'undefined') window.preloaderMP_MODULE = function(){};


/**
 * Mockup for module
 * @param {objects} conf object with settings (files) for plugin
 */
window.preloaderMP_MODULE.prototype.JS = function(conf){
	
	/*-----  Private ------*/

	var version = '1.0';
	
	var utils = this;

	var config = conf; 

	var fileToLoad = [];
	

	/**
	 * Constructor
	 */
	var init = function() {


		utils.testDebug('CSS', 'isBasketJS');

		utils.testDebug('CSS','isGoodSettings', config);

		filesToLoad = (!utils.isMobile()) ? config.screen : config.mobile;

	};

	/**
	 * Parse if is object with test or only url(string)
	 * @param  {[type]} file [description]
	 * @return {[type]}      [description]
	 */
	var parseFileIsLoad = function(file){

		if (typeof file == "string") return true;

		if (typeof file == "object" && file.test) return true;

		return false; 
			
	};

	var getFileUrl = function(file){

		if (typeof file == "string") return utils.getAbsoluteFilePath(file);

		if (typeof file == "object" && file.test) return utils.getAbsoluteFilePath(file.url);

	};

	/**
	 * Call by plugin to count files to load
	 * @return {int} file to load
	 */
	var countFiles = function(){

		var howMany = 0;

		
		for (var library in filesToLoad) {


					 var JsFiles = filesToLoad[library]; // plugins to jQuery (array)
					 var jsFilesObjects = []; // array for objects to basketJs plugin

					   
					 // we have plugins
					 
					 (function(prelObj, lib, plug) {


					 		if(parseFileIsLoad(lib)) howMany++; // library


					 		plug.forEach(function(script, index){


								 	if(parseFileIsLoad(script)) howMany++; // plugins
					 				

					 		});

	    
	   				 })(self, library, JsFiles);

		}

		return howMany;		

	};

	/**
	 * Method call when file is loaded, always need to call utils.onLoadFile(url);
	 * @param  {string} url file url
	 */
	var fileLoaded = function(url){


		utils.onLoadFile(url);

	};

	/**
	 * Method call to start loading files
	 */
	var loadFiles = function(){


		for (var library in filesToLoad) {


					 var JsFiles = filesToLoad[library]; // plugins to jQuery (array)
					 var jsFilesObjects = []; // array for objects to basketJs plugin

				
					 if(JsFiles.length <= 0 && !(JsFiles instanceof Array)){

					 	// only one file to load
					 	utils.testDebug('MAIN', 'startLoadFile', library);

					 	if(parseFileIsLoad(library)){

					 		basket.require({url: getFileUrl(library), skipCache: !utils.cache}).then(function(){ fileLoaded(library)},function(){utils.testDebug('MAIN', 'onFileError', library);});

					 	}
					 	
					 	continue;	

					 }
					   
					 // we have plugins
					 
					 (function(prelObj, lib, plug) {

					 	utils.testDebug('MAIN', 'startLoadFile', library);

					 	basket.require({url: getFileUrl(lib), skipCache: !utils.cache}).then(function(){

					 			fileLoaded(getFileUrl(library));

					 			plug.forEach(function(script, index){


					 				utils.testDebug('MAIN', 'startLoadFile', getFileUrl(script));

					 				if(parseFileIsLoad(script)){

						 				basket.require({url: getFileUrl(script), skipCache: !utils.cache}).then(function(){
						 					
						 					fileLoaded(getFileUrl(script));	

						 				}, function(){utils.testDebug('MAIN', 'onFileError', getFileUrl(script) )});

					 				}


					 	});
					 			 


					 	},function(){utils.testDebug('MAIN', 'onFileError', lib);});

					 			
	   		 })(self, library, JsFiles);

		}

		
	};


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