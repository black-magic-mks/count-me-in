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
      tasks: ['concat', 'karma']
    },
    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    },
    karma: {
      unit: {
        configFile: 'client/karma.conf.js'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-karma');
  

  grunt.registerTask('dev', ['concat', 'karma', 'watch']);
  grunt.registerTask('serve', ['nodemon']);

};