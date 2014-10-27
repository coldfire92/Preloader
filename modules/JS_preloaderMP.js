
		var JS = {

			scriptsToLoadScreen = [],
			scriptsToLoadMobile = [],
			jsToLoadCommute = [], // all commuted js witch shoul be loadded to current page width (with directory)

			get: function(){

				var self = this;

				this.jsToLoadCommute = (!this.isMobile()) ? this.scriptsToLoadScreen : scriptsToLoadMobile;

				for (var key in this.jsToLoadCommute) {


					 var library = (self.addDirectory) ? self.directory + key : key; // main library- like jQuery 
					 var JsFiles = this.jsToLoadCommute[key]; // plugins to jQuery (array)
					 var jsFilesObjects = []; // array for objects to basketJs plugin

				
					 if(JsFiles.length <= 0 && !(JsFiles instanceof Array)){

					 	// only one file to load
					 
					 	self.allObjectsToLoad++; // add one file to load
					 	continue;	

					 }
					   
					 // we have plugins
					 
					 (function(prelObj, lib, plug) {


					 		prelObj.allObjectsToLoad++;


					 			plug.forEach(function(script, index){


					 				prelObj.allObjectsToLoad++;
					 				

					 			});
					 			 
	    
	   				 })(self, library , JsFiles);

				}

			},

			load: function(){

				var self = this;
				
		
				for (var key in this.jsToLoadCommute) {


					 var library = (self.addDirectory) ? self.directory + key : key; // main library- like jQuery 
					 var JsFiles = this.jsToLoadCommute[key]; // plugins to jQuery (array)
					 var jsFilesObjects = []; // array for objects to basketJs plugin

				

					 if(JsFiles.length <= 0 && !(JsFiles instanceof Array)){

					 	// only one file to load
					 
					 	basket.require({url: library,skipCache: self.notCache}).then(function(){self.onLoadJs();});
					 	continue;	

					 }
					   
					 // we have plugins

					 (function(prelObj, lib, plug) {


					 		basket.require({url: lib,skipCache: self.notCache}).then(function(){

					 			plug.forEach(function(script, index){

					 				basket.require({url: (prelObj.addDirectory) ? prelObj.directory + script : script, skipCache: self.notCache}).then(function(){
					 					prelObj.onLoadJs(script);

					 				});


					 			});
					 			 


					 		});

					 		prelObj.onLoadJs(lib);
					 	
	    
	   				 })(self, library , JsFiles);

				}

			},

			/**
			 * When current file or files are loaded
			 * @param  {[type]} count [description]
			 * @return {[type]}       [description]
			 */
			onLoad: function(fileName){

				this.currentLoadFiles++;
				UI.loadFile(this.currentLoadFiles, this.allObjectsToLoad, 'Loaded JS: ' + fileName);
				this.isLoaded();
				
			}


		}

		