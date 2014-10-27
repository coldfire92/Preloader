


preloaderMP.prototype = (function(){

	var chechObjectUI: function(UI){

			var bad = false;


			if(typeof UI.loadAllFiles != 'function') bad = true;
			if(typeof UI.loadFile != 'function') bad = true;
			if(typeof UI.init != 'function') bad = true;


			if(bad) console.warn('Bad user UI object, check if you have methods [loadAllFiles, loadFile, init] in your object ');
			

	}


	return {

		debbug: function(name){



		}

	}


});





