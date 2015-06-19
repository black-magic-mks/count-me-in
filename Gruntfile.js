module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['client/**/*.js'],
        dest: 'public/scripts.js'
      },
    },
    watch: {
      files: ['client/**/*.js'],
      tasks: ['concat']
    },
    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-nodemon');
  

  grunt.registerTask('dev', ['concat', 'watch']);
  grunt.registerTask('serve', ['nodemon']);

};