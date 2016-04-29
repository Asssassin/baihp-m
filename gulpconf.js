/**
 * Gulp Tasks Config File
 * @param  {Object} $ Plugins and some utilities
 * @return {Object}   All options of the config
 */
module.exports = function ($) {
    'use strict';

    const _$   = $.argv;
    const path = {
        /**
         * Root's Directories
         * @type {Object}
         */
        root : {
            tasks : './gulp_tasks/',
            src   : 'src/',
            dev   : 'dev/',
            pro   : 'asset/',
            tmp   : ((_hy) => {
                let _dir = 'tmp';

                _dir += _$.t && _$.t !== true ? _hy + _$.t : '';
                _dir += _$.all ? '*' : '';
                _dir += '/';

                return _dir;
            })('-'),
            zip   : 'archive/',
            cache : 'cache/'
        },
        /**
         * Source's Directories
         * @type {Object}
         */
        src : {
            styles    : 'styles',
            scripts   : 'scripts',
            templates : 'templates',
            libs      : 'libs',
            extras    : 'extras',
            images    : 'images',
            fonts     : 'fonts'
        },
        /**
         * Destination's Directories
         * @type {Object}
         */
        dest : {
            styles    : 'css',
            scripts   : 'js',
            templates : '',
            libs      : '',
            extras    : '',
            images    : 'images',
            fonts     : 'fonts'
        },
        /**
         * Src Path Generator
         * @param  {String} child   A directory in the root directory, such css or js etc.
         * @param  {[type]} aim     Matching files, such as '*.*'
         * @param  {[type]} exclude Exclude sources
         * @return {String}         A path string as src directory
         */
        i : function (child, aim = '', exclude = []) {
            let _oparr = [],
                _op = this.root.src;

            ! child ? _op += '' : _op += child + '/';

            _oparr[0] = _op + aim;

            if (exclude.length > 0 && typeof exclude === 'object') {
                for (let x of exclude) _oparr.push('!' + _op + x);
            } else if (typeof exclude === 'string') {
                _oparr.push('!' + _op + exclude);
            }

            /**
             * Abandoned Sources
             * @type {Array}
             */
            let _abandon = [
                '**/_*.*',
                '**/*.*~'
            ];

            for (let _ab of _abandon) _oparr.push('!' + _op + _ab);

            return _oparr;
        },
        /**
         * Dest Path Generator
         * @param  {Boolean} mod   Argv
         * @param  {String}  child A directory in the root directory, such Styles or Scripts etc.
         * @return {String}        [description]
         */
        o : function (mod, child) {
            let _ed = this.root.dev;

            if (! mod) {
                if (_$.d) _ed = this.o('dev');
                if (_$.p) _ed = this.o('pro');
                if (_$.t) _ed = this.o('tmp');
                if (_$.z) _ed = this.o('zip');
            } else {
                for (let m in this.root) _ed = m === mod ? this.root[mod] : _ed;
            }

            ! child ? _ed += '' : _ed += child + '/';

            return _ed;
        },
        /**
         * Cache Path
         * @param  {[type]} child [description]
         * @return {[type]}       [description]
         */
        c : function (child) {
            return this.o('cache', child);
        }
    };

    /**
     * Global Config
     * @type {Object}
     * sync String  "browserSync" or "liveReload"
     */
    const config = {
        path : path,
        sync : 'browserSync'
    };

    config.arg  = _$;

    /**
     * Help Infomations
     * @type {Object}
     */
    config.help = {};

    /**
     * Server Task Options
     * @type {Object}
     * ui       {Object}  False to turn off ui
     * open     {Boolean} Turn on/off auto open browser
     * port     {Integer} Port of server
     * index    {String}  File
     * logLevel {String}  Console info level [debug | info | silent]
     */
    config.server = {
        reloadOnRestart : true,
        port     : 9000,
        ui       : {
            port : 9001
        },
        server   : {
            baseDir : './',
            index    : 'index.html'
        },
        open     : false,
        notify   : false,
        quiet    : false,
        logLevel : 'info'
    };

    /**
     * Listen Task Options
     * @type {Object}
     * tasks
     */
    config.listen = {
        src   : [path.o() + '**/*.*', './index.{html,htm,php,json}'],
        watch : {
            styles    : 'frontend',
            scripts   : 'frontend',
            templates : 'frontend',
            images    : 'media',
            fonts     : 'transfer',
            libs      : 'transfer',
            extras    : 'transfer'
        }
    };

    /**
     * Styles Task Options
     * @type {Object}
     */
    config.styles = {
        src  : path.i(path.src.styles, '**/*.scss', ['libs/**/*.scss']),
        dest : path.o('', path.dest.styles),
        sass : {
            outputStyle : 'expanded'
        },
        autoprefixer : {
            browsers : ['> 1%', 'last 2 versions', 'Firefox >= 20', 'iOS 7']
        }
    };

    /**
     * Scripts Task Options
     * @type {Object}
     */
    config.scripts = {
        src    : path.i(path.src.scripts, '**/*.js', ['libs/**/*.js']),
        dest   : path.o('', path.dest.scripts),
        babel  : true,
        uglify : true,
        concat : {
            open : false,
            path : 'main.js'
        }
    };

    /**
     * Templates Task Options
     * @type {Object}
     */
    config.templates = {
        src     : path.i('templates', '**/*.*', ['components/**/*.*']),
        dest    : path.o('', path.dest.templates),
        jade    : false,
        include : true,
    };

    /**
     * Images Task Options
     * @type {Object}
     */
    config.images = {
        src         : path.i(path.src.images, ['**/*.*']),
        dest        : path.o('', path.dest.images),
        min         : false,
        progressive : true,
        interlaced  : true,
        svgoPlugins : [{
            cleanupIDs : false
        }]
    };

    /**
     * Transfer Task Options
     * @type {Object}
     */
    config.libs = {
        src  : path.i(path.src.libs, ['**/*.*']),
        dest : path.o('', path.dest.libs)
    };

    config.fonts = {
        src  : path.i(path.src.fonts, ['**/*.*']),
        dest : path.o('', path.dest.fonts)
    };

    config.extras = {
        src  : path.i(path.src.extras, ['**/*']),
        dest : path.o('', path.dest.extras)
    };

    return config;
};
