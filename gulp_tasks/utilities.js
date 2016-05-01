module.exports = (gulp, $, conf) => {
    'use strict';

    let target = conf.arg.all ? [conf.path.o('dev'), conf.path.o('pro'), conf.path.o('tmp'), conf.path.o('cache')] : conf.path.o();

    const _tasks = {
        cache : () => {
            return gulp.src(conf.path.i('', '**/*.*'))
                .pipe($.changed(conf.path.root.cache))
                .pipe(gulp.dest(conf.path.root.cache));
        },
        clean : () => {
            return $.del(target)
                .then(paths => {
                    console.log('Deleted files and folders:\n', paths.join('\n'));
                });
        },
        h2j   : () => {
            let _cf = conf.path.i('templates')[0];

            return gulp.src( _cf + 'html2jade/**/*.*')
                .pipe($.h2j({
                    nspaces : conf.prettify.indent
                }))
                .pipe(gulp.dest(_cf));
        },
        zip   : () => {
            let _src  = conf.path.o(),
                _tsp  = new Date().getTime(),
                _rst  = /[\w\-]+/.exec(_src)[0],
                _name = conf.arg.rename ? conf.arg.rename : _rst + '-' + _tsp;

            return gulp.src(_src + '**/*')
                .pipe($.zip(_name + '.zip'))
                .pipe(gulp.dest('archive/'));
        }
    };

    return _tasks;
};
