module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['client/app/**/*.js'],
        dest: 'public/scripts.js'
      },
    },
    watch: {
      files: ['client/app/**/*.js'],
      tasks: ['concat']
    },
    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('dev', ['concat', 'watch']);
  grunt.registerTask('serve', ['nodemon']);

};
