
if(typeof window.preloaderMP_MODULE == 'undefined') window.preloaderMP_MODULE = function(){};


/**
 * Mockup for module
 * @param {object} conf object with settings (files) for plugin
 */
window.preloaderMP_MODULE.prototype.IMG = function(conf){
	

	/*-----  Private ------*/
	var version = '1.0';

	var utils = this;

	var config = conf; 

	var fileToLoad = [];
	

	/**
	 * Constructor
	 */
	var init = function() {

		utils.testDebug('IMG', 'isGoodSettings', config);

	};

	/**
	 * Call by plugin to count files to load
	 * @return {int} file to load
	 */
	var countFiles = function(){


		config.forEach(function(element, index) {

					
					
					// not have any additionals params
					if(!element.min && !element.max && !element.type) {
						
						fileToLoad = fileToLoad.concat(element.images);
						return;
					}
						

					if(element.min && element.max){

						// if have min and max param
						
						if(element.max >= utils.getScreen() && element.min <= utils.getScreen()) fileToLoad = fileToLoad.concat(element.images);
						return;

					}

					if(element.min && element.min <= utils.getScreen()){

						// if have only min param
						fileToLoad = fileToLoad.concat(element.images);
						return;

					}

					if(element.max && element.max >= utils.getScreen()){

						// if have only max param
						fileToLoad = fileToLoad.concat(element.images);
						
						return;

					}

					if(element.type=='mobile' && utils.isMobile()){
						fileToLoad = fileToLoad.concat(element.images);
					} 
					if(element.type=='screen' && !utils.isMobile()) {
						fileToLoad = fileToLoad.concat(element.images);

					}
					  
		});

		utils.testDebug('IMG', 'showFilesToLoad', fileToLoad);
		
		return	fileToLoad.length;

	};

	/**
	 * Method call when file is loaded, always need to call utils.onLoadFile(url);
	 * @param  {string} url file url
	 */
	var fileLoaded = function(url, error){

		utils.onLoadFile(url, error);

	};

	/**
	 * Method call to start loading files
	 */
	var loadFiles = function(){

		fileToLoad.forEach(function(file){

			try{
			
				utils.testDebug('MAIN', 'startLoadFile', utils.getAbsoluteFilePath(file));

				var obj = new Image();
				obj.src = utils.getAbsoluteFilePath(file);
				obj.onload = function(){
					fileLoaded(utils.getAbsoluteFilePath(file));
				};
				obj.onerror = function(){

					// image isnt much important, so if cant get image, go next
					fileLoaded(file);
					utils.testDebug('MAIN', 'onFileError', utils.getAbsoluteFilePath(file));

				};

			}catch(e){
				
			}

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