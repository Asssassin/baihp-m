module.exports = (gulp, $, conf) => {
    'use strict';

    let _ck = conf.arg.p || conf.arg.min;

    const _tasks = {
        styles : () => {
            let _cf = conf.styles;

            return gulp.src(_cf.src)
                .pipe($.sass({
                    outputStyle : _cf.sass.outputStyle
                }).on('error', $.sass.logError))
                .pipe($.autoprefixer({
                    browsers : _cf.autoprefixer.browsers
                }))
                .pipe($.if(_ck, $.cssnano()))
                .pipe($.if(_ck, $.rename({
                    suffix: '.min'
                })))
                .pipe($.changed(_cf.dest))
                .pipe(gulp.dest(_cf.dest));
        },
        scripts : () => {
            let _cf = conf.scripts;

            return gulp.src(_cf.src)
                .pipe($.if(_cf.concat.open, $.concat({
                    path : _cf.concat.path
                })))
                .pipe($.if(_cf.babel, $.babel()))
                .pipe($.if(_ck && _cf.uglify, $.uglify()))
                .pipe($.if(_ck, $.rename({
                    suffix : '.min'
                })))
                .pipe($.changed(_cf.dest))
                .pipe(gulp.dest(_cf.dest));
        },
        templates : () => {
            let _cf = conf.templates,
                _suffix = '.min';

            return gulp.src(_cf.src)
                .pipe($.if(_cf.jade, $.jade({pretty : true}))).on('error', console.log)
                .pipe($.if(_cf.include, $.include())).on('error', console.log)
                .pipe($.changed(_cf.dest))
                .pipe($.if(_ck,
                    $.replace(/(\<\!\-\-\smin\/[js|css]+\s\-\-\>\s+\<[script|link]+[\s\w\'\"\=]+[href|src]+[\=\'\"]+[\w\/\-\_]+)([\w\-\_\.]+)(\.[js|css]+[\"\s\w\/\>\<]+\<\!\-\-\smin\/[js|css]+\send\-\-\>)/g, '$1' + '$2' + _suffix + '$3')))
                .pipe($.prettify({indent_size: 4}))
                .pipe(gulp.dest(_cf.dest));
        }
    };

    return _tasks;
};
