module.exports = (gulp, $, conf) => {
    'use strict';

    const _tasks = {
        images : () => {
            let _cf = conf.images;
            return gulp.src(_cf.src)
                .pipe($.if(_cf.min || conf.arg.min, $.cache($.imagemin({
                    progressive : _cf.progressive,
                    interlaced  : _cf.interlaced,
                    svgoPlugins : _cf.svgoPlugins
                }))))
                .pipe(gulp.dest(conf.images.dest));
        }
    };

    return _tasks;
};
