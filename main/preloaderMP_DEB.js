
if(typeof window.preloaderMP_DEB == 'undefined') window.preloaderMP_DEB = function(){this.init();};

window.preloaderMP_DEB.prototype.typeMessages = {
	console: {
		log: {
			bgColor: 'blue',
			color: 'white'
		},
		warn: {
			bgColor: 'black',
			color: 'white'
		},
		error: {
			bgColor: 'red',
			color: 'white'
		}
	},
	DOM: {
		loadFile: {
			bgColor: 'green',
			color: 'white'
		}

	}

};

window.preloaderMP_DEB.prototype.options = {

	UI : false,
	onLoadFile: true,
	validConfig: true,
	onComplete: true,
	initVars: true, // show isMobile and screenWidth
	libs: true, // chech if libs are properly included
	output: 'DOM', // console|DOM
	elelementDomId: document.getElementById('debbuger'), // element where show debugger 

};

window.preloaderMP_DEB.prototype.extend = function(out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    if (!arguments[i])
      continue;

    for (var key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key))
        out[key] = arguments[i][key];
    }
  }

  return out;

};



window.preloaderMP_DEB.prototype.init = function(){

	// init all modules
	// 
	for(var module in this){
		

		if(module == module.toUpperCase()){
			// module need to be upperCase
			if(typeof this[module].init != 'undefined') this[module].init.call(this);
		}
		

	}
	
	
};



window.preloaderMP_DEB.prototype.test = function(module, testName, vars){


	for(var mod in this){
		
		if (mod == module){

			return this[mod][testName].call(this, vars);

		}	

	}
	
};


window.preloaderMP_DEB.prototype.isInConsoleType = function(type) {


	for(var typeName in this.typeMessages.console){
		

		if(type == typeName){

			
			return true;
		}
		

	}

	return false;


};

window.preloaderMP_DEB.prototype.show = function(message, type){

		
	if(typeof type == 'undefined') type = 'warn';

	if(this.options.output == 'console') {
		
		type = (this.isInConsoleType(type)) ? type : 'log';
		this.showInConsole(message, type);
		return;
	}

	this.showInDOM(message, type);
	
};

window.preloaderMP_DEB.prototype.showInConsole = function(message, type){
	
	console[type].call(console, message);

};

window.preloaderMP_DEB.prototype.showInDOM = function(message, type){

	
	
	styles = (this.isInConsoleType(type)) ? this.typeMessages.console : this.typeMessages.DOM;

	var li = document.createElement('li');

	var content = document.createTextNode(message);

	 li.style.backgroundColor = styles[type].bgColor;
	 li.style.color = styles[type].color;

	li.appendChild(content);	

	this.options.elelementDomId.appendChild(li);

};


/**
 * Array of objects containing current loading files and start time of loading each of them
 * @type {Object}
 */
window.preloaderMP_DEB.prototype.filesLoading = {};



window.preloaderMP_DEB.prototype.simulateLoad = function(files, fnComplete) {

	var debbuger = this;
	

	var filesCount = (files) ? files : 10;

	if (typeof fnComplete != 'function') {

		fnComplete = function(){};
		this.show("Dont set properly fnComplete to simulateLoad");
	}
	

	var rand = function(min,max){
	    min = parseInt( min, 10 );
	    max = parseInt( max, 10 );

	    if ( min > max ){
	        var tmp = min;
	        min = max;
	        max = tmp;
	    }

	    return Math.floor( Math.random() * ( max - min + 1 ) + min );
	
	};
	

	;(function(debb){
		
		for (var i = 0; i < filesCount; i++) {
		
		var delay = rand(0, 800);

		setTimeout(function(){
			debb.test('MAIN', 'startLoadFile', delay);
			fnComplete(delay);		
		}.bind(this), delay);
		
	}
	
	})(debbuger);

};

window.preloaderMP_DEB.prototype.MAIN = {

	onLoadFile: function(obj) {
	

		var time = new Date().valueOf() - this.filesLoading[obj.name];
		
		if (this.options.onLoadFile){

			if(!obj.error) this.show("Load file: " + obj.name + ' in ' +time+ 'ms', 'loadFile');


		} 
		
	},
	onFileError : function(url){

		this.show("Cant load file: " + url, 'error');

	},
	startLoadFile:function(url) {

		var date = new Date().valueOf();
		
		this.filesLoading[url] = date;

	},

	onComplete : function() {


		if(this.options.onComplete) this.show("Complete loading all files!", 'log');


	},
	showVars: function(obj) {

		if(this.options.initVars) this.show(obj.name + ' : '+ obj.value ,'log');

	},

	runUIMethod: function(method) {

		if(this.options.UI) this.show('Run UI method: '+ method ,'log');

	},

	isGoodScreenWidth: function(width) {

		if(/px/.test(width)) {
			this.show("You pass screenWidth param with px", 'error');
		}
		


	},

	isGoodUI : function(UI) {

		var isOk = true;

		

		if(typeof UI.onLoadFile == 'undefined') {

			isOk = false;
			this.show("You dont pass good UI object- no onLoadFile method", 'error');

		}

		if(typeof UI.init == 'undefined') {

			isOk = false;
			this.show("You dont pass good UI object- no init method", 'error');

		}

		if(typeof UI.complete == 'undefined') {

			isOk = false;

			this.show("You dont pass good UI object- no complete method", 'error');

		}

		return isOk;


	},
	
	isSettignsForPlugin: function(setings) {
		
		
		
		var isOk = false;

		for(var module_setting in setings.config){
			
			if(module_setting == setings.name) isOk = true;
		
		}
			
		if(!isOk) {

			this.show('User dont add settings for plugin: ' + setings.name);

		}

		return isOk;

	}
		

};
