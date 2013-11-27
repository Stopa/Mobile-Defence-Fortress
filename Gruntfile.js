module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      javascripts: {
        files: {
          'public/app.min.js': ['assets/javascripts/*.js']
        }
      },
      css: {
        files: {
          'public/app.min.css': ['assets/stylesheets/*.css']
        }
      }
    },
    qunit: {
      all: {
        options: {
          urls: ['http://localhost:8080/unit_test.html'] // TODO: WE NEEDS TA RUN GRUNT SERVER BEFORE WE CAN TEST, B0SS
        }
      }
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
          base: '.'
        }
      },
    },
    watch: {
      files: ['*'],
      tasks: ['qunit', 'connect']
    },
    copy: {
      main: {
        src: ['*.js', '*.html'],
        dest: 'public/'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('test', ['connect', 'qunit']);

  grunt.registerTask('default', ['jshint', 'qunit', 'uglify', 'copy', 'connect']);

  grunt.registerTask('server', ['connect']);

};