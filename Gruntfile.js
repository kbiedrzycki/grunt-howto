module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
                separator: "\n"
            },
            dist: {
                files: {
                    'js/a.js': ['src/js/file_01.js', 'src/js/file_02.js'],
                    'css/a.css': ['src/css/file_01.css', 'src/css/file_02.css']
                }
            }
        }
    });

    // load tasks..
    grunt.loadNpmTasks('grunt-contrib-concat');

    // register tasks..
    grunt.registerTask('default', ['concat']);
};