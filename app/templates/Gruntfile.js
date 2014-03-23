'use strict';

var LIVERELOAD_PORT = 35729;

module.exports = function (grunt) {
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time at the end
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
    dir: {
      asset: 'assets/',
      build: 'build/',
      bower: 'bower_components/'
    },
    // Task configuration.
    clean: {
      build: [
        '<%= dir.build %>*'
      ]
    },
    copy: {
      static: {
        files: [
          { cwd: '<%= dir.bower %>font-awesome/fonts/', src: ['**'], dest: 'public/fonts/',  expand: true }
        ]
      },
      js: {
        files: [
          { cwd: '<%= dir.bower %>es5-shim/',         src: ['es5-shim.js'],         dest: '<%= dir.build %>dashing/',     expand: true },
          { cwd: '<%= dir.bower %>jquery/dist/',      src: ['jquery.js'],           dest: '<%= dir.build %>dashing/',     expand: true },
          { cwd: '<%= dir.bower %>gridster/dist/',    src: ['jquery.gridster.js'],  dest: '<%= dir.build %>application/', expand: true },
          { cwd: '<%= dir.bower %>jquery-knob/js/',   src: ['jquery.knob.js'],      dest: '<%= dir.build %>application/', expand: true },
          { cwd: '<%= dir.bower %>jquery-leanmodal/', src: ['jquery.leanModal.js'], dest: '<%= dir.build %>application/', expand: true },
          { cwd: '<%= dir.bower %>rickshaw/',         src: ['rickshaw.js'],         dest: '<%= dir.build %>application/', expand: true },
          { cwd: '<%= dir.bower %>d3/',               src: ['d3.js'],               dest: '<%= dir.build %>application/', expand: true }
        ]
      },
      css: {
        files: [
          { cwd: '<%= dir.bower %>font-awesome/css/', src: ['font-awesome.css'],    dest: '<%= dir.build %>css/lib/', expand: true },
          { cwd: '<%= dir.bower %>gridster/dist/',    src: ['jquery.gridster.css'], dest: '<%= dir.build %>css/lib/', expand: true }
        ]
      },
      coffee: {
        files: [
          { cwd: '<%= dir.asset %>javascripts/', src: ['dashing.coffee'],     dest: '<%= dir.build %>dashing/',     expand: true },
          { cwd: '<%= dir.asset %>javascripts/', src: ['application.coffee'], dest: '<%= dir.build %>application/', expand: true }
        ]
      }
    },
    'string-replace': {
      fix_abstract_binding: {
        options: {
          replacements: [
            { pattern: /(@accessor 'filteredValue')$/m, replacement: "$1," },
            { pattern: /(@accessor 'unfilteredValue')$/m, replacement: "$1," }
          ]
        },
        src:  '<%= dir.bower %>batman/src/view/bindings/abstract_binding.coffee',
        dest: '<%= dir.bower %>batman/src/view/bindings/abstract_binding.coffee'
      },
      fix_view: {
        options: {
          replacements: [
            { pattern: /(@accessor 'node')$/m, replacement: "$1," }
          ]
        },
        src:  '<%= dir.bower %>batman/src/view/view.coffee',
        dest: '<%= dir.bower %>batman/src/view/view.coffee'
      }
    },
    snockets: {
      batman: {
        src:  '<%= dir.bower %>batman/src/batman.coffee',
        dest: '<%= dir.build %>dashing/batman.js'
      },
      batman_jquery: {
        src:  '<%= dir.bower %>batman/src/platform/jquery.coffee',
        dest: '<%= dir.build %>dashing/batman.jquery.js'
      },
      dashing: {
        src:  '<%= dir.build %>dashing/dashing.coffee',
        dest: '<%= dir.build %>application/dashing.js'
      },
      application: {
        src:  '<%= dir.build %>application/application.coffee',
        dest: 'public/javascripts/application.js'
      }
    },
    sass: {
      widgets: {
        cwd: 'widgets/',
        src: '**/*.scss',
        dest: '<%= dir.build %>css/widgets/',
        expand: true,
        flatten: true,
        ext: '.css'
      },
      application: {
        src:  '<%= dir.asset %>stylesheets/application.scss',
        dest: '<%= dir.build %>css/application.css'
      }
    },
    concat: {
      css: {
        src: [
          '<%= dir.build %>css/lib/*.css',
          '<%= dir.build %>css/widgets/*.css',
          '<%= dir.build %>css/application.css'
        ],
        dest: 'public/stylesheets/application.css',
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      application: {
        src:  '<%= snockets.application.dest %>',
        dest: '<%= snockets.application.dest %>'
      }
    },
    cssmin: {
      application: {
        src:  '<%= concat.css.dest %>',
        dest: '<%= concat.css.dest %>'
      }
    },
    watch: {
      options: {
        livereload: LIVERELOAD_PORT
      },
      src: {
        files: [
          '<%= dir.asset %>javascripts/**/*',
          '<%= dir.asset %>stylesheets/**/*',
          'widgets/**/*'
        ],
        tasks: ['build']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          'public/**/*'
        ]
      }
    },
    connect: {
      options: {
        hostname: '0.0.0.0',
        port: 9000,
        livereload: LIVERELOAD_PORT
      },
      server: {
        proxies: [
          {
            context: [''],
            host: '0.0.0.0',
            port: 3000,
            https: false,
            changeOrigin: false
          }
        ],
      },
      livereload: {
        options: {
          open: true,
          base: ['public'],
          middleware: function () {
            return [require('grunt-connect-proxy/lib/utils').proxyRequest];
          }
        }
      }
    }
  });

  grunt.registerTask('init', ['clean', 'copy:static', 'copy:js', 'copy:css', 'string-replace', 'snockets:batman', 'snockets:batman_jquery']);

  grunt.registerTask('js', ['copy:coffee', 'snockets:dashing', 'snockets:application']);
  grunt.registerTask('css', ['sass', 'concat:css']);
  grunt.registerTask('build', ['js', 'css']);
  grunt.registerTask('minify', ['uglify', 'cssmin']);

  grunt.registerTask('serve', ['build', 'configureProxies:server', 'connect:livereload', 'watch']);
};
