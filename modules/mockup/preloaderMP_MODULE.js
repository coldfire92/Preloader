
if(typeof window.preloaderMP_MODULE == 'undefined') window.preloaderMP_MODULE = function(){};


/**
 * Mockup for module
 * @param {objects} conf object with settings (files) for plugin
 */
window.preloaderMP_MODULE.prototype.MODULE = function(conf){
	

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