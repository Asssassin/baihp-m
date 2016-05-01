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
            let _ck = conf.sync,
                _ck2 = conf.arg.live;

            if (_ck === 'browserSync' && ! _ck2) {
                gulp.watch(_cf.src).on('change', $.browserSync.reload);
            } else if (_ck === 'liveReload' || _ck2) {
                $.livereload.listen();
                gulp.watch(_cf.src).on('change', tsk.listen.liveReload);
            }
        },
        cache : () => {}
    };

    return _tasks;
};
