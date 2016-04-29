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
