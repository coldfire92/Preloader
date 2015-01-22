#Preloader
Modular, easy to upgrade preloader framework with let you preload diffrent types of files.

To init add combined file
```html
<script src="dist/debugger.js"></script>
```
and create new preloader.
```js
new PRELOADER({
    MODULE_01: {},
    MODULE_02: {},
    MAIN {},
    UI {}
});
```
## 'MAIN' Config file
In 'MAIN' config file you can set properties with later you can use in modules.

| Argument | Type | Default | Description
|--------|---------|------|------
| `isScreen` | `boolean` | true | Load files for screen resolutions
| `isMobile` | `boolean` | false | Load files for mobile resolutions
| `isTablet` | `boolean` |  false | Load files for tablet resolutions
| `windowWidth` | `int` | window.innerWidth | Set window width
| `absolutePath` | `string` | '' | Usefull e.g. for wordpress themes

## 'UI' Config file
Events for preloader. Object UI must containt:

| Method | Arguments | Description
|--------|---------|------
| `onLoadFile` | loadedFiles(int), allFilesToLoad(int), percange(int) | Call when file is loaded
| `init` | - | Call when init preloader
| `complete` | - | Call when all files loaded

Example:
```js
new PRELOADER({
    ...
    UI: {
     onLoadFile: function(loadedFiles, allFilesToLoad, percange) {
        console.log(loaded + '/' + all + ' | ' + percange);
     },
     init: function() {},
     complete: function(){}
    }
    ...
});
```

##Defining your modules
Your module always must have 2 methods:
- countFiles() - count all files to load
- loadFiles() - start loading file

List of methods in 'this' object with plugin can "sometimes must" use.

| Method | Arguments | Return | Description
|--------|---------|------|---
| `onLoadFile` | nameFile(string), error(bool) | void | You must call when file loaded or error occure
| `startLoadFile` | nameFile(string) | void | You must call when start loading file
| `isTablet` | - | bool | Load files to tablet view
| `isMobile` | - | bool | Load files to tablet view
| `isScreen` | - | bool | Load files to tablet view
| `getWindowWidth` | - | int | Get window width
| `getAbsoluteFilePath` | url(string) | absoluteUrl(string) | Get absolute file url

Here`s some mockup for modules.

```js

/**
 * Mockup for module
 * @param {objects} config object with settings (files) for plugin
 */
PRELOADER_MODULES.prototype.MODULE = function(config){
	
	/*-----  Private ------*/
	var version = '1.0',
		utils = this,
		fileToLoad = [];
		
	/**
	 * Constructor
	 */
	var init = function() {
	};

	/**
	 * Call by plugin to count files to load
	 * @return {int} file to load
	 */
	var countFiles = function(){
		return 10;
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
	 */
	var loadFiles = function(){
		utils.onLoadFile("link");
	};
	init(); // call constructor
	return {
		countFiles: function() {	return countFiles();	},
		loadFiles: function() { return loadFiles();}
	};
};
```

##Example


##Instalation
Type in console to download all dependencies.
```Bash
npm install && bower install
```

##Dependencies:
- Debbuger https://github.com/coldfire92/debugger To easy control correctness of passing objects, configs etc.
- BasketJS - to JS module

##To do:
- add font module
- add video module
