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

    append: {
      docs: {
        header: 'docs/parts/head.html',
        footer: 'docs/parts/footer.html',
        src: [
            'docs/pages/base-css.html',
            'docs/pages/components.html',
            'docs/pages/customize.html',
            'docs/pages/extend.html',
            'docs/pages/getting-started.html',
            'docs/pages/index.html',
            'docs/pages/javascript.html',
            'docs/pages/scaffolding.html'
        ],
        dest: 'docs' // destination *directory*, unnecessary to specify paths twice
      },
      html: {
        header: 'assets/parts/head.html',
        footer: 'assets/parts/footer.html',
        src: [
            'assets/pages/index.html',
            'assets/pages/about.html',
            'assets/pages/get-started.html'
        ],
        dest: '.' // destination *directory*, unnecessary to specify paths twice
      }
    },

    less: {
      dist: {
        options: {
          paths: ['assets','assets/less','assets/less/bootstrap','assets/less/toolkit'],
          yuicompress: false,
          compress: false
        },
        files: {
          "assets/css/project-responsive-unlinted.css": ['assets/project-responsive.less'], // responsive
          "assets/css/project-unlinted.css": ['assets/project.less'], // standard
          "assets/css/project-docs.css": ['assets/project-docs.less'] // docs
        }
      }
    },

    recess: {
      less: {
        src: ['assets/css/project-unlinted.css'],
        dest: 'assets/css/project.css',
        options: {
          compile: true,
          compress: false,             // Compress your compiled code
          noIDs: true,                 // Doesn't complain about using IDs in your stylesheets
          noJSPrefix: true,            // Doesn't complain about styling .js- prefixed classnames
          noOverqualifying: true,      // Doesn't complain about overqualified selectors (ie: div#foo.bar)
          noUnderscores: true,         // Doesn't complain about using underscores in your class names
          noUniversalSelectors: true,  // Doesn't complain about using the universal * selector
          prefixWhitespace: true,      // Adds whitespace prefix to line up vender prefixed properties
          strictPropertyOrder: true,   // Complains if not strict property order
          stripColors: true,           // Strip colors from the Terminal output
          zeroUnits: true              // Doesn't complain if you add units to values of 0 
        }
      },
      responsive: {
        src: ['assets/css/project-responsive-unlinted.css'],
        dest: 'assets/css/project-responsive.css',
        options: {
          compile: true,
          compress: false,             // Compress your compiled code
          noIDs: true,                 // Doesn't complain about using IDs in your stylesheets
          noJSPrefix: true,            // Doesn't complain about styling .js- prefixed classnames
          noOverqualifying: true,      // Doesn't complain about overqualified selectors (ie: div#foo.bar)
          noUnderscores: true,         // Doesn't complain about using underscores in your class names
          noUniversalSelectors: true,  // Doesn't complain about using the universal * selector
          prefixWhitespace: true,      // Adds whitespace prefix to line up vender prefixed properties
          strictPropertyOrder: true,   // Complains if not strict property order
          stripColors: true,           // Strip colors from the Terminal output
          zeroUnits: true              // Doesn't complain if you add units to values of 0 
        }
      }
    },
    concat: {
      'assets/js/main.js' : [
        'assets/js/vendor/bootstrap/bootstrap.js',
        'assets/js/vendor/bootstrap/application.js',
        'assets/js/vendor/bootstrap/google-code-prettify/prettify.js',
        'assets/js/vendor/strftime.js'
      ]
    },
/*
    // Optimize images
    jpgmin: {
      src: ['assets/img/stock/*.jpg'],
      dest: 'assets/img/optimized'
    },
*/
    // Minify scripts
    min: {
      'assets/js/main.js' : ['assets/js/main.js']
    },

    lint: {
      files: ['assets/js/*.js']
    },

    watch: {
      dist: {
        files: ['assets/**/*.*','docs/**/*.*'], 
        tasks: 'append less recess concat'
      },
      scripts: {
        files: ['assets/**/*.js'],
        tasks: 'lint test'
      },
      less: {
        files: ['assets/**/*.less'], 
        tasks: 'less recess'
      }
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib');

  // Default task.
  grunt.registerTask('default', 'append less recess concat watch:dist');

};

