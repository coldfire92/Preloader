
module.exports = function(grunt) {
  'use strict';
 
  // inicjalizacja konfiguracji zadań
  grunt.initConfig((function(){


    var DEBUG = true; // combine debugger files

    var modulesToLoad = ['CSS', 'JS', 'IMG'];

    var files = []; // fileToLoad

    var main = {
        module: 'main/preloaderMP.js',
        deb: 'main/preloaderMP_DEB.js',
    };

    var libs = {

      basketJS: 'modules/css/lib/basketJS.js'

    };

    var modules = {

      CSS: {
          module: 'modules/css/preloaderMP_CSS.js',
          deb: 'modules/css/preloaderMP_CSS_DEB.js',
          lib: 'basketJS'
      },  
      JS: {
          module: 'modules/js/preloaderMP_JS.js',
          deb: 'modules/js/preloaderMP_JS_DEB.js',
          lib: 'basketJS'
      },
      IMG: {
          module: 'modules/img/preloaderMP_IMG.js',
          deb: 'modules/img/preloaderMP_IMG_DEB.js',
      }
    };

    var getFiles = function() {

      var loadedLibs = []; // array of loaded libs

      modulesToLoad.forEach(function(module){
         

         if(loadedLibs.indexOf(modules[module].lib) == -1 && typeof modules[module].lib != 'undefined'){
            // not alredy add this library
            // 
              var libName = modules[module].lib;
             
              files.push(libs[libName]);
             

              loadedLibs.push(libName); // add taht loaded

         }



         files.push(modules[module].module);

         if(DEBUG) files.push(modules[module].deb);

      });

      //get main files

      if(DEBUG) files.push(main.deb);

      files.push(main.module);

    


    };

    getFiles();


    console.log(files);
    

    return {
       concat: {
          options: {
            separator: '',
          },
          dist: {
            src: files,
            dest: 'output/preloaderMP.js',
          }
        },
        uglify: {
            compress: {
              options: {
              },
              files: {
                'output/preloaderMP.min.js': ['output/preloaderMP.js'],
              },
            },
        }
      };
    
  })()
 );

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default', ['concat']);


};