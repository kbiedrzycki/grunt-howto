module.exports = function(grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
                separator: "\n"
            },
            js: {
                files: {
                    'js/a.js': ['src/js/file_01.js', 'src/js/file_02.js']
                }
            }
        },
        jshint: {
            options: {
               reporter: require('jshint-stylish')
            },
            build: ['src/js/*.js']
        },
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'js/a.min.js': [
                        'js/a.js'
                    ]
                }
            }
        },
        watch: {
            stylesheets: {
                files: ['src/css/**/*.css', 'src/less/**/*.less', 'src/scss/**/*.scss'],
                tasks: ['css_dev']
            },

            scripts: {
                files: 'src/js/**/*.js',
                tasks: ['js_dev']
            }
        },
        less: {
            development: {
                files: {
                    'css/main.css': 'src/less/**/*.less'
                }
            },
            production: {
                options: {
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
                        new (require('less-plugin-clean-css'))()
                    ],
                    modifyVars: {
                        imgPath: '"http://cdn.reserved.com/path/to/images"'
                    }
                },
                files: {
                    'css/main.css': 'src/less/**/*.less'
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'main_sass.css': 'src/scss/**/*.scss'
                }
            }
        }
    });

    // register tasks..
    grunt.registerTask('js_dev', ['jshint', 'concat:js']);
    grunt.registerTask('js_prod', ['js_dev', 'uglify']);
    grunt.registerTask('css_dev', ['less:development', 'sass']);
    grunt.registerTask('css_prod', ['less:production', 'sass']);

    grunt.registerTask('develop', ['js_dev', 'css_dev', 'watch']);
    grunt.registerTask('production', ['js_prod', 'css_prod']);
};