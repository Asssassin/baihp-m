module.exports = (gulp, $, conf, tsk) => {
    'use strict';

    let target = conf.arg.all ? [conf.path.o('dev'), conf.path.o('pro'), conf.path.o('tmp')] : conf.path.o();

    const _tasks = {
        test : () => {
            // console.log(target);
            console.log(conf.path.i('', '**/*.scss', ['components/**/*.*', 'libs/**/*']));
        },
        help : () => {
            console.log('Help Infomation is Comming...')
        }
    };

    return _tasks;
};
