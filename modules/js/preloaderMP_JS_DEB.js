
if(typeof window.preloaderMP_DEB == 'undefined') window.preloaderMP_DEB = function(){this.init();};


window.preloaderMP_DEB.prototype.JS = {

	
		isBasketJS : function() {

			if(!window.basket){

				if(this.options.libs) this.show("You don`t include basketJS",'error');
				return false;
			}

			return true;

		},

		isGoodSettings: function(settings) {

			var isOk = true;

			if(typeof settings.screen == 'undefined'){

				isOk = false;
				if(this.options.validConfig) this.show('You dont properly set config for CSS Module- dont use screen');

			}

			if(typeof settings.mobile == 'undefined'){

				isOk = false;
				if(this.options.validConfig) this.show('You dont properly set config for CSS Module- dont use mobile');

			}


			return isOk;


		}

};

