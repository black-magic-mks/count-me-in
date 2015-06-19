module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        separator: ' '
      },
      dist: {
        src: ['client/**/*.js'],
        dest: 'public/scripts.js'
      },
    },
    watch: {
      files: ['client/**/*.js'],
      tasks: ['concat']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat', 'watch']);

};