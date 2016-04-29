module.exports = (gulp, $, conf, tsk) => {
    'use strict';

    let _cf = conf.listen;

    const _tasks = {
        watch : () => {
            for (let t in _cf.watch) gulp.watch(conf[t].src, tsk[_cf.watch[t]][t]);
        },
        liveReload : (event) => {
            return gulp.src(event)
                .pipe($.livereload({
                    quiet : conf.server.quiet
                }));
        },
        reload : () => {
            let _ck = conf.sync;

            if (_ck === 'browserSync') {
                gulp.watch(_cf.src).on('change', $.browserSync.reload);
            } else if (_ck === 'liveReload') {
                $.livereload.listen();
                gulp.watch(_cf.src).on('change', tsk.listen.liveReload);
            }
        },
        cache : () => {}
    };

    return _tasks;
};
