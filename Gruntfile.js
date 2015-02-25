module.exports = function(grunt) {
    // Podstawowe zadanie pokazujące jak coś wyświetlić w konsoli...
    grunt.registerTask('default', 'Basic logger task', function() {
        grunt.log.writeln('Zalogowano... ');
        return true;
    });
};