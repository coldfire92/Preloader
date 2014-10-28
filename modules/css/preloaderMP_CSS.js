
if(typeof window.preloaderMP_MODULE == 'undefined') window.preloaderMP_MODULE = function(){};


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
				// Arguments explained:
				// `href` is the URL for your CSS file.
				// `before` optionally defines the element we'll use as a reference for injecting our <link>
				// By default, `before` uses the first <script> element in the page.
				// However, since the order in which stylesheets are referenced matters, you might need a more specific location in your document.
				// If so, pass a different reference element to the `before` argument and it'll insert before that instead
				// note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
				var ss = window.document.createElement( "link" );
				var ref = before | window.document.getElementsByTagName( "head" )[ 0 ];
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
						{ url: url, 
						  execute: false,
						  key: url,
				          skipCache: true 
						}).then(function(responses) {
									
					fileLoaded(url);
					append(url);
					
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