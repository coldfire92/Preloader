
if(typeof window.preloaderMP_DEB == 'undefined') window.preloaderMP_DEB = function(){};


window.preloaderMP_DEB.prototype.IMG = {

		init: function(){

			this.extend(this.options, {
				showImagesToLoad: true
			});
		

		},

		showFilesToLoad: function(images) {

			if(this.options.showImagesToLoad){
				this.show('Images to load:','log'); 
				this.show(images,'log'); 
			}
		},

		isGoodSettings: function(settings) {

			var isOk = true;

			settings.forEach(function(set){

				if(typeof set.images == 'undefined'){
					isOk=false;
					this.show('One object set to IMG module dont have property images', 'error');

				} 


			});


			return isOk;


		}




};



