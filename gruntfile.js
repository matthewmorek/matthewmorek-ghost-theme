/**
 * @file
 * Grunt configurations.
 */

module.exports = function (grunt) {
  grunt.initConfig({
    env: grunt.option('env') || process.env.NODE_ENV || 'development',
    pkg: grunt.file.readJSON('package.json')
  });

  // Load production tasks by default
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');

  grunt.config('clean', [
    'assets/css',
    'assets/js'
  ]);

  grunt.config('uglify', {
    options: {
      mangle: false,
      wrap: false,
      screwIE8: true
    },
    dist: {
      files: {
        'assets/js/bundle.js': [
          '_js/**/*.js'
        ]
      }
    },
    dev: {
      options: {
        sourceMap: true,
        beautify: true
      },
      files: {
        'assets/js/bundle.js': [
          '_js/**/*.js'
        ]
      }
    }
  });

  grunt.config('postcss', {
    options: {
      syntax: require('postcss-scss'),
      processors: [
        require('autoprefixer')({ browsers: ['last 3 version', 'ff >= 36', 'ie >= 11'] }),
        require('postcss-discard-duplicates')(),
        require('postcss-easing-gradients')()
      ],
      map: {
        inline: false
      }
    },
    dist: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')({ browsers: ['last 3 version', 'ff >= 36', 'ie >= 11'] }),
          require('postcss-discard-duplicates')(),
          require('postcss-easing-gradients')(),
          require('cssnano')()
        ]
      },
      src: 'assets/css/**/*.css'
    },
    dev: {
      src: 'assets/css/**/*.css'
    }
  });

  grunt.config('sass', {
    options: {
      outputStyle: 'expanded',
      sourceMap: true,
      indentedSyntax: true,
      sassDir: '_scss',
      cssDir: 'assets/css',
      includePaths: [
        'node_modules/normalize-scss/sass',
        'node_modules/modularscale-sass/stylesheets',
        'node_modules/typi/scss',
        'node_modules/tachyons-sass'
      ]
    },
    dev: {
      files: [{
        expand: true,
        cwd: '_scss/',
        src: ['**/*.scss'],
        dest: 'assets/css/',
        ext: '.css'
      }]
    },
    dist: {
      options: {
        sourceMap: false
      },
      files: [{
        expand: true,
        cwd: '_scss/',
        src: ['**/*.scss'],
        dest: 'assets/css/',
        ext: '.css'
      }]
    }
  });

  if (grunt.config('env') !== 'production') {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-eslint');

    grunt.config('watch', {
      source: {
        files: ['_scss/**/*.scss', '_js/**/*.js', '**/*.hbs'],
        tasks: ['build']
      }
    });

    grunt.config('eslint', {
      options: {
        ignorePattern: ['_js/lib/**/*.js']
      },
      target: ['assets/js/**/*.js']
    });

    grunt.registerTask('build', ['clean', 'sass:dev', 'postcss:dev', 'eslint', 'uglify:dev']);
  }

  grunt.registerTask('dist', ['clean', 'sass:dist', 'postcss:dist', 'uglify:dist']);
  grunt.registerTask('default', ['build']);
};
