module.exports = function(grunt) {
	grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        connect: {
         	server: {
    			options: {
       				port: 8080,
       				livereload: true,
       				open: true,
       				hostname: 'localhost',
        			base: {
        				path:'dist/',
        				options:{
        					index:'src/index.html'
        				},
        			},
       			},
      		},
    	},


        clean: ['dist/*'],

        copy: {
  			main: {
   				 files: [
   				 	{expand: true, src: ['src/**'], dest: 'dist/'},
   				 	{expand: true, src: ['bower_components/**'], dest: 'dist/vendor/'},
   				 ],
   			},
   		},

      stylus: {
          compile: {
              options: {
                  'compress': true,
                  'paths': ['src/css/styl/']
              },
              files: {
                  'src/css/styles.css': 'src/css/styles.styl'
              }
          }
      },

	    watch: {
	    	options: {
	    			livereload: true
	    	},   

            scripts: { 
        			files:['src/js/*.js'], 
        			tasks:['copy']
      		},

      		css: {
      				files:['src/css/**/*.css'],
      				tasks:['copy']
      		},		

      		html: { 
      			    files: ['src/index.html'],
      			    tasks: ['copy']
            },
	    },

	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default',['clean','copy','stylus','connect','watch']);
};