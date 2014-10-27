var images = {

			get: function(){

				Array.prototype.forEach.call(this.imagesToLoad, function(element, index) {

					// not have any additionals params
					if(!element.min && !element.max && !element.type) this.imagesToLoadCommute = this.imagesToLoadCommute.concat(element.images);

					if(element.min && element.max && element.min <= this.currWidth && element.max >= this.currWidth){

						// if have min and max param
						this.imagesToLoadCommute = this.imagesToLoadCommute.concat(element.images);
						return;

					}

					if(element.min && element.min <= this.currWidth){

						// if have only min param
						this.imagesToLoadCommute = this.imagesToLoadCommute.concat(element.images);
						return;

					}

					if(element.max && element.max >= this.currWidth){

						// if have only min param
						this.imagesToLoadCommute = this.imagesToLoadCommute.concat(element.images);
						return;

					}

					if(element.type=='mobile' && this.isMobile()) this.imagesToLoadCommute = this.imagesToLoadCommute.concat(element.images);
					if(element.type=='screen' && !this.isMobile()) this.imagesToLoadCommute = this.imagesToLoadCommute.concat(element.images);
					  
				}.bind(this));

				this.allObjectsToLoad += this.imagesToLoadCommute.length; // add file to laod

			},

			/**
			 * Init loading images
			 * @return
			 */
			load: function(){

				this.allObjectsToLoad += this.imagesToLoadCommute.length, // all files need to be load (js/css/img)

				this.imagesToLoadCommute.forEach(function(url, index){
					
					var img = new Image();
					img.src = (this.addDirectory) ? this.directory + url : url;
					img.onload = this.onLoadImg();

				}.bind(this));

			},
			/**
			 * When image is loaded
			 * @return
			 */
			onLoad: function(){
				
				this.currentLoadFiles++;
				UI.loadFile(this.currentLoadFiles, this.allObjectsToLoad, 'Loaded Img');
				this.isLoaded();

			},


		};
		
