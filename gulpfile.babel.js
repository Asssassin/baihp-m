'use strict';

let [gulp, $] = [require('gulp'), require('gulp-load-plugins')()];

/** Add Plugins as Property to $ */
$.browserSync = require('browser-sync');
$.argv = require('yargs').argv;
$.del  = require('del');
$.h2j = require('gulp-html2jade');

/**
 * Task Files List
 * @type {Array}
 */
const conf  = require('./gulpconf')($);
const tsk   = {};
const tasks = ['utilities', 'frontend', 'server', 'listen', 'media', 'help', 'transfer'];

for (let n of tasks) tsk[n] = require(conf.path.root.tasks + n)(gulp, $, conf, tsk);

/**
 * REGISTER TASKS
 * Total: 13
 */

/** Utilities */
gulp.task('cache', tsk.utilities.cache);
gulp.task('clean', tsk.utilities.clean);
gulp.task('h2j', tsk.utilities.h2j);
gulp.task('zip', tsk.utilities.zip);

/** Transfer */
gulp.task('transfer', gulp.parallel(tsk.transfer.libs, gulp.parallel(tsk.transfer.fonts, tsk.transfer.extras)));

/** Frontend */
gulp.task('styles', tsk.frontend.styles);
gulp.task('scripts', tsk.frontend.scripts);
gulp.task('templates', tsk.frontend.templates);

/** Media */
gulp.task('images', tsk.media.images);

/** Build */
gulp.task('build', gulp.series('clean', ['styles', 'scripts', 'templates', 'images', 'transfer']));

/** Listen */
gulp.task('watch', gulp.series('build', gulp.parallel(tsk.listen.watch, tsk.listen.reload)));

/** Server */
gulp.task('server', gulp.parallel(tsk.server.web, 'watch'));

/** Help */
gulp.task('test', tsk.help.test);
gulp.task('help', tsk.help.help);

/** Default */
gulp.task('default', gulp.series('help'));
