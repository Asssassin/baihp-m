module.exports = (gulp, $, conf) => {
    'use strict';

    const _tasks = {
        web : () => {
            let _cf = conf.server;

            $.browserSync({
                ui     : _cf.ui,
                open   : _cf.open,
                notify : _cf.notify,
                port   : _cf.port,
                server : {
                    baseDir : _cf.server.baseDir,
                    index   : _cf.server.index
                },
                reloadOnRestart : _cf.reloadOnRestart,
                logLevel        : _cf.logLevel
            });
        }
    };

    return _tasks;
};
