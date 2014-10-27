var CSS = {

		stylesToLoadScreen = [],
	    stylesToLoadMobile = [],
	    cssToLoadCommute =[],

		append: function( href, before, media ){
				// Arguments explained:
				// `href` is the URL for your CSS file.
				// `before` optionally defines the element we'll use as a reference for injecting our <link>
				// By default, `before` uses the first <script> element in the page.
				// However, since the order in which stylesheets are referenced matters, you might need a more specific location in your document.
				// If so, pass a different reference element to the `before` argument and it'll insert before that instead
				// note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
				var ss = window.document.createElement( "link" );
				var ref = before || window.document.getElementsByTagName( "script" )[ 0 ];
				ss.rel = "stylesheet";
				ss.href = href;
				// temporarily, set media to something non-matching to ensure it'll fetch without blocking render
				ss.media = "only x";
				// inject link
				ref.parentNode.insertBefore( ss, ref );
				// set media back to `all` so that the stylesheet applies once it loads
				setTimeout( function(){
					ss.media = media || "all";
				} );
				return ss;

 		},
 		get : function(){

 			this.cssToLoadCommute = (!this.isMobile()) ? this.stylesToLoadScreen : stylesToLoadMobile;

 			this.allObjectsToLoad += this.cssToLoadCommute.length; // add file to laod	

 		},
		load: function(){

			var self = this;

			this.cssToLoadCommute.forEach(function(style, index){

				;(function(css){

					var urlCss = (self.addDirectory) ? self.directory + css : css;
					
					basket.require(
						{ url: urlCss, 
						  execute: false,
						  key: style 
						}).then(function(responses) {

							self.appendCss(urlCss);	
							self.onLoadCss(style);
							
	   				 	});	 
				
				})(style);
				
			});		

		},

		onLoad: function(nameFile){

			this.currentLoadFiles++;
			UI.loadFile(this.currentLoadFiles, this.allObjectsToLoad, 'Loaded CSS: ' + nameFile);
			this.isLoaded();

		}

	}