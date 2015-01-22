
/**
 * Mockup for module
 * @param {objects} conf object with settings (files) for plugin
 */
PRELOADER_MODULES.prototype.MODULE = function(conf){
	

	/*-----  Private ------*/

	var version = '1.0';
	
	var utils = this;

	var config = conf; 

	var fileToLoad = [];
	
	/**
	 * Constructor
	 */
	var init = function() {

		
	};

	/**
	 * Call by plugin to count files to load
	 * @return {int} file to load
	 */
	var countFiles = function(){

		return 10;

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

		utils.onLoadFile("link");
		
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