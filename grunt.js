/*
 * grunt
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT
 */

module.exports = function(grunt) {



  // Project configuration.
  grunt.initConfig({

    // Reduce repetitive tasks
    paths: {
      less: [
        'assets',
        'assets/less',
        'assets/less/bootstrap',
        'assets/less/toolkit'
      ]
    },

    wrap: {
      assets: {
        header: 'assets/parts/head.html',
        footer: 'assets/parts/footer.html',
        src:    'assets/pages/*.html',
        dest:   './' // destination *directory*
      },
      docs: {
        header: 'docs/parts/head.html',
        footer: 'docs/parts/footer.html',
        src:    'docs/pages/*.html',
        dest:   'docs' // destination *directory*
      }
    },

    less: {
      all: {
        options: {
          paths: '<config:paths.less>',
          compress: false
        },
        files: {
          "assets/css/*.css": ['assets/*.less'] }
      },
      min: {
        options: {
          paths: '<config:paths.less>',
          compress: true
        },
        files: {
          "assets/css/*.min.css": ['assets/*.less'] }
      }
    },

    recess: {
      less: {
        src: ['assets/css/pre.css'],
        dest: 'assets/css/pre.css',
        options: {
          compile: true,
          compress: false
        }
      },
      responsive: {
        src: ['assets/css/responsive.css'],
        dest: 'assets/css/responsive.css',
        options: {
          compile: true,
          compress: false
        }
      }
    },

    // Concatenate scripts
    concat: {
      head: {
        src: [
              'assets/js/vendor/jquery.js',
              'assets/js/vendor/modernizr.js',
        ],
        dest: 'assets/js/head.js' // only script in the head
      },
      footer: {
        src: [
              'assets/js/lib/bootstrap/bootstrap.js',
              'assets/js/lib/bootstrap/application.js',                      // application.js is for docs
              'assets/js/lib/bootstrap/google-code-prettify/prettify.js',    // google code prettify
              'assets/js/plugins/fittext.js',                                // Responsive text in masthead
              'assets/js/plugins/holder.js',                                 // image placeholders
              'assets/js/lib/pre-paralax.js'                                 // custom scripts go last
        ],
        dest: 'assets/js/footer.js' // place this in the footer
      }
    },

    // Minify scripts
    min: {
      head: {
        src: ['assets/js/head.js'],
        dest: 'assets/js/head.min.js'
      },
      footer: {
        src: ['assets/js/footer.js'],
        dest: 'assets/js/footer.min.js'
      }
    },

    lint: {
      files: ['assets/js/*.js']
    },

    watch: {
      all: {
        files: ['assets/**/*.*'],
        tasks: 'wrap less recess:responsive concat'
      },
      docs: {
        files: ['docs/**/*.*'],
        tasks: 'wrap less recess:responsive concat'
      }
    }
  });

  grunt.loadTasks('build');
  grunt.loadNpmTasks('grunt-contrib');

  // Default task.
  grunt.registerTask('default', 'wrap less recess concat min watch');

};

