/**
 * Test if user pass good UI object
 * @param {object} UI 
 * @return {bool} 
 */
DEBUGGER.addMethod("isGoodUI", function(Vars){

  	var isOk = true;


	if(typeof Vars.UI.onLoadFile == 'undefined') {

		isOk = false;
		this.print("Preloader","You dont pass good UI object- no onLoadFile method", 'warn');

	}

	if(typeof Vars.UI.init == 'undefined') {

		isOk = false;
		this.print("Preloader","You dont pass good UI object- no init method", 'warn');

	}

	if(typeof Vars.UI.complete == 'undefined') {

		isOk = false;

		this.print("Preloader","You dont pass good UI object- no complete method", 'warn');

	}

	return isOk;

},['UI']);


/**
 * Test that module has all required methods
 * @param  
 * @return {void}
 */
DEBUGGER.addMethod("isGoodModule", function(Vars){

	var module = Vars.Module,
		name = Vars.Name,
		isOk = true;

	var isInt = function(n){

		 return n === +n && n === (n|0);

	};

	if(typeof module.loadFiles=="undefined"){

		this.print("Preloader", "Module " + Vars.Name + " has not method loadFiles", "error");
		
		isOk = false;

	}

	if(typeof module.countFiles=="undefined"){

		this.print("Preloader", "Module " + Vars.Name + " has not method countFiles", "error");
		
		isOk = false;

	} else {

		// chech if return gool value
		if(typeof module.countFiles()=="undefined" ||
		   !isInt(module.countFiles())
		){

			this.print("Preloader", "Method countFiles of " + Vars.Name + " shoud return intiger", "error");
			
			isOk = false;

		}	

	}

	return isOk;
	
},['Module','Name']);


/**
 * Test RWD parametrs
 */
DEBUGGER.addMethod("testRWD", function(Vars){

	return true;
	
},['Screen','Tablet','Mobile']);


