
if(typeof window.PRELOADER_MODULES == 'undefined') PRELOADER_MODULES = function(){};

/**
 * Mockup for module
 * @param {objects} conf object with settings (files) for plugin
 */
window.preloaderMP_MODULE.prototype.CSS = function(conf){
	

	/*-----  Private ------*/

	var version = '1.0';
	
	var utils = this;

	var config = conf; 

	var filesToLoad = [];
	
	var append = function( href, before, media ){
		
      	var ss = window.document.createElement( "link" );
		var ref = document.getElementsByTagName( "head" )[ 0 ];  

		ss.rel = "stylesheet";
		ss.href = href;
		// temporarily, set media to something non-matching to ensure it'll fetch without blocking render
		ss.media = "only x";
		// inject link
		ref.appendChild(ss);
		// set media back to `all` so that the stylesheet applies once it loads
		setTimeout( function(){
			ss.media = media || "all";
		} );
		return ss;

 	};

	/**
	 * Constructor
	 */
	var init = function() {

		utils.testDebug('CSS', 'isBasketJS');

		utils.testDebug('CSS','isGoodSettings', config);

		filesToLoad = (!utils.isMobile()) ? config.screen : config.mobile;
		
	};

	/**
	 * Call by plugin to count files to load
	 * @return {int} file to load
	 */
	var countFiles = function(){

		return filesToLoad.length;

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
	 * @return {[type]} [description]
	 */
	var loadFiles = function(){

		var module = this;

		filesToLoad.forEach(function(url){

			utils.testDebug('MAIN', 'startLoadFile', url);

			basket.require(
						{ url: utils.getAbsoluteFilePath(url), 
						  execute: false,
						  key: url,
				          skipCache: true 
						}).then(function(responses) {
									
					fileLoaded(utils.getAbsoluteFilePath(url));
					append(utils.getAbsoluteFilePath(url));
					
	   		},function(){utils.testDebug('MAIN', 'onFileError', url);});	 

		});
	
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