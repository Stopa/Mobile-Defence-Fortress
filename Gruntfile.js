module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        src: 'assets/javasctipts/*.js',
        dest: 'public/javascripts/*.min.js'
      }
    },
    qunit: {
      files: ['unit_test.html']
    },
    jshint: {
      files: ['Gruntfile.js', 'assets/javascripts/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    connect: {
    server: {
      options: {
        port: 8080,
        base: '.',
        keepalive: true
      }
    }
  }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['jshint', 'qunit', 'uglify']);

  grunt.registerTask('server', ['connect'])

};