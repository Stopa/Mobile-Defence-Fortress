module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      javascripts: {
        files: {
          'public/javascripts/actors.min.js' : ['assets/javascripts/actor/*.js'],
          'public/javascripts/collisions.min.js' : ['assets/javascripts/collision/*.js'],
          'public/javascripts/facilities.min.js' : ['assets/javascripts/facility/*.js'],
          'public/javascripts/projectiles.min.js' : ['assets/javascripts/projectile/*.js'],
          'public/javascripts/sounds.min.js' : ['assets/javascripts/sound/*.js'],
          'public/javascripts/spawn_engine.min.js' : ['assets/javascripts/spawn_engine/*.js'],
          'public/javascripts/ui.min.js' : ['assets/javascripts/ui/*.js'],
          'public/javascripts/weapons.min.js' : ['assets/javascripts/weapon/*.js'],
          'public/javascripts/default.min.js' : ['assets/javascripts/*.js'],
          'public/javascripts/libs.min.js' : ['assets/javascripts/lib/*.js']
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'public/stylesheet.css': ['assets/stylesheets/*.css']
        }
      }
    },
    qunit: {
      all: {
        options: {
          urls: ['http://localhost:8080/unit_test.html']
        }
      }
    },
    jshint: {
      files: [
        'Gruntfile.js', 
        'assets/javascripts/actor/*.js',
        'assets/javascripts/collision/*.js',
        'assets/javascripts/facility/*.js',
        'assets/javascripts/projectile/*.js',
        'assets/javascripts/sound/*.js',
        'assets/javascripts/spawn_engine/*.js',
        'assets/javascripts/ui/*.js',
        'assets/javascripts/weapon/*.js',
        'assets/javascripts/*.js'
      ],
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
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('test', ['connect', 'qunit']);

  grunt.registerTask('default', ['jshint', 'test', 'cssmin', 'copy']);

  grunt.registerTask('server', ['connect', 'watch']);

};