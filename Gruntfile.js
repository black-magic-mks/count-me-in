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
        configFile: 'client/karma.conf.js'
      }
    },
    shell: {
      options: {
        stderr: true
      },
      cljs: {
        command: 'lein cljsbuild once'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('dev', ['concat', 'watch']);
  grunt.registerTask('cljs', ['shell:cljs']);
  grunt.registerTask('serve', ['nodemon']);
  grunt.registerTask('deploy', ['concat','nodemon']);
};
