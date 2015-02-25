module.exports = function(grunt) {
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
            },
            css: {
                files: {
                    'css/a.css': ['src/css/file_01.css', 'src/css/file_02.css']
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
        cssmin: {
            build: {
                files: {
                    'css/a.min.css': [
                        'css/a.css'
                    ]
                }
            }
        }
    });

    // load tasks..
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // register tasks..
    grunt.registerTask('js_dev', ['jshint', 'concat:js']);
    grunt.registerTask('js_prod', ['js_dev', 'uglify']);
    grunt.registerTask('css_dev', ['concat:css']);
    grunt.registerTask('css_prod', ['css_dev', 'cssmin']);
};