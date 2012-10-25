module.exports = function( grunt ) {
'use strict';

  grunt.registerMultiTask('append', 'Appends and prepends source files with specified header and footer', function() {
    var data = this.data,
        path = require('path'),
        dest = grunt.template.process(data.dest),
        files = grunt.file.expandFiles(this.file.src),
        header = grunt.file.read(grunt.template.process(data.header)),
        footer = grunt.file.read(grunt.template.process(data.footer)),
        sep = grunt.utils.linefeed; 

    files.forEach(function(f) {
        var p = dest + '/' + path.basename(f),
            contents = grunt.file.read(f);

        grunt.file.write(p, header + sep + contents + sep + footer);
        grunt.log.writeln('File "' + p + '" created.');
    });
  });
};