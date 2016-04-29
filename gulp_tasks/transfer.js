module.exports = (gulp, $, conf) => {
    'use strict';

    const _tasks = {
        fonts  : () => {
            let _cf = conf.fonts;

            return gulp.src(_cf.src)
                .pipe($.changed(_cf.dest))
                .pipe(gulp.dest(_cf.dest));
        },
        libs   : () => {
            let _cf = conf.libs;

            return gulp.src(_cf.src)
                .pipe($.changed(_cf.dest))
                .pipe(gulp.dest(_cf.dest));
        },
        extras : () => {
            let _cf = conf.extras;

            return gulp.src(_cf.src)
                .pipe($.changed(_cf.dest))
                .pipe(gulp.dest(_cf.dest));
        }
    };

    return _tasks;
};
