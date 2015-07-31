module.exports = function(grunt) {
  // load time-grunt and all grunt plugins found in the package.json
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  grunt.initConfig({
    app: {
      app: 'app',
      dist: '_site',
      baseurl: '',
      styleurl:'assets/themes/fumatech/css/'
    },
    csslint: {
      test: {
        options: {
          import: 2
        },
        src: ['<%= app.styleurl %>main.css']
      }
    },

    /*        concat : {
                dist : {
                    src : [ 'css/libs/*.css',
                            'css/main.css' ],
                    dest : 'assets/main.css',
                }
            },
    */
    cssc: {
      build: {
        options: {
          // consolidateViaDeclarations: true,
          // consolidateViaSelectors:    true,
          // consolidateMediaQueries:    true
        },
        files: {
          '<%= app.styleurl %>main.css': '<%= app.styleurl %>main0.css'
        }
      }
    },

    cssmin: {
      build: {
        src: '<%= app.styleurl %>main.css',
        dest: '<%= app.styleurl %>main.min.css'
      }
    },

    sass: {
      build: {
        files: {
          '<%= app.styleurl %>main0.css': '_sass/main.scss'
        }
      }
    },

    shell: {
      jekyllBuild: {
        command: 'jekyll build'
      },
      jekyllServe: {
        command: 'jekyll serve -w'
      }
    },

    watch: {
      /*css: {
        files: ['_sass/*.scss'],
        tasks: ['buildcss',
              ]
      },*/
      shell: {
        files: [
          // '_includes/**/*.html',
          'style/css/main.scss',
          '_sass/*.scss'
          /*'_layouts/*.html',
          '_posts/*.markdown',
          '_config.yml',
          'index.html'        */],
        tasks: [
                'shell:jekyllServe',
              ]
      },
      /*files : [ '_layouts/*.html',
                '_posts/*.markdown',
                'assets/fumatech/css/*.css',
                '_config.yml',
                'index.html',
                '404.html',
                '_site/*' ],
      tasks : [ 'cssmin',
                'shell:jekyllServe' ],
      */
      options : {
          spawn : false,
          interrupt : true,
          atBegin : true,
          livereload : true
      }
    },
    htmlhint: {
      build: {
        options: {
          'tag-pair': true,
          // Force tags to have a closing pair
          'tagname-lowercase': true,
          // Force tags to be lowercase
          'attr-lowercase': true,
          // Force attribute names to be lowercase e.g. <div id="header"> is invalid
          'attr-value-double-quotes': true,
          // Force attributes to have double quotes rather than single
          'doctype-first': true,
          // Force the DOCTYPE declaration to come first in the document
          'spec-char-escape': true,
          // Force special characters to be escaped
          'id-unique': true,
          // Prevent using the same ID multiple times in a document
          'head-script-disabled': true,
          // Prevent script tags being loaded in the  for performance reasons
          'style-disabled': true
            // Prevent style tags. CSS should be loaded through 
        },
        src: ['_site/*']
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: true,
          minifyJS: true,
          minifyCSS: true
        },
        files: [{
          expand: true, //设置为true打开以下选项
          cwd: '<%= app.dist %>/<%= app.baseurl %>', //所有src指定的文件相对于这个属性指定的路径
          src: '**/*.html', // 要匹配的路径，相对与cwd
          dest: '<%= app.dist %>/<%= app.baseurl %>' //生成的目标路径前缀
        }]
      }
    },
    'html-prettyprinter-dir': {
      expansion: {
        // Expands to ['dirty/index.html', 'dirty/main.html']
        src: ['_site/*.html'],
        dest: '_site/',
        options: {
          indent_size: 2,
        }
      },
    }
  });

  // register custom grunt tasks
  grunt.registerTask('default', []);
  grunt.registerTask('test', ['csslint']);
  grunt.registerTask('buildcss', ['sass', 'cssc', 'cssmin']);
  grunt.registerTask('deploy', ['buildcss', 'shell:jekyllBuild'])
};
