module.exports = function(grunt) {
	 grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
  		  server: ["./dist"],
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



   	 });
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['connect','clean','copy']);
};