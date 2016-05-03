'use strict';

jQuery(document).ready(function ($) {
	'use strict';

	var cpt = {
		main: $('main'),
		container: $('.bhp__container'),
		header: $('.bhp__header'),
		drawer: $('.bhp__drawer'),
		filter: $('.bhp__filter'),
		navBtm: $('.bhp__navigator--bottom'),
		mask: $('.bhp__mask--obfuscator'),
		userboard: $('.user-dashboard'),
		cityCon: $('.cities-container')
	};

	var btn = {
		drawer: $('.bhp__button--drawer'),
		userCenter: $('.ue-center'),
		city: $('.place-entry'),
		peArrow: $('.pe-arrow'),
		filter: $('.Filter .option-bar .ob-item')
	};

	var flg = {
		on: 'on',
		off: 'off',
		drawer: '_drawer_'
	};

	/**
  * Main Content Controlling
  * @return {[type]}    [description]
  */
	// touch.on(cpt.main, 'drag', (e) => {
	// 	let [_dir, _top] = [
	// 		e.direction,
	// 		cpt.main.find('*').eq(0).offset().top
	// 	];

	// 	if (_top <= -10) multiClass(cpt.header, flg.on, 1);
	// 	else multiClass(cpt.header, flg.on, -1);
	// });

	touch.on(cpt.main, 'touchstart', function (e) {
		// e.preventDefault();
	});

	/**
  * Drawer
  * @return {[type]}    [description]
  */
	touch.on(btn.drawer, 'touchstart', function () {
		componentActive(cpt.drawer, 1);
		// multiClass(cpt, flg.on + ' ' + flg.drawer, -1);
		// multiClass(cpt.drawer, flg.on, 1);
		// multiClass(cpt.mask, flg.on + ' ' + flg.drawer, 1);
	});

	var drawerRankBtn = cpt.drawer.find('.action');
	var drawerWrap = cpt.drawer.find('.drawer-wrapper');

	var drawerRankBtnCon = drawerRankBtn.html();
	touch.on(drawerRankBtn, 'tap', function () {
		var _txt = $(this).html();
		if (_txt === drawerRankBtnCon) $(this).html('返回');else $(this).html(drawerRankBtnCon);
		multiClass(drawerWrap, 'rank-tab');
	});
	touch.on(cpt.mask, 'tap', function () {
		multiClass(drawerWrap, 'rank-tab', -1);
		drawerRankBtn.html(drawerRankBtnCon);
	});
	/**
  * Mask
  * @return {Function}          [description]
  */
	// touch.on(cpt.mask, 'tap', () => multiClass(cpt, flg.on + ' ' + flg.drawer, -1));
	touch.on(cpt.mask, 'tap', function () {
		return componentActive([cpt.drawer, cpt.cityCon, cpt.filter], -1);
	});

	/**
  * City List
  * @return {[type]}   [description]
  */
	(function () {
		var _ref = [$('.cities-container'), $('.cities-list'), $('.cities-list>.city')];
		var citiesCon = _ref[0];
		var citiesList = _ref[1];
		var city = _ref[2];
		var peArrow = _ref[3];
		var cityw = city.width();
		var cityh = city.height();


		$.each(city, function (index, val) {
			var obj = $(val);

			if (obj.offset().left + cityw > cityw * 3) obj.addClass('row-end');
		});

		var cityData = void 0;
		touch.on(btn.city, 'touchstart', function () {
			$.ajax({
				url: 'js/city.js',
				type: 'GET',
				dataType: 'json'
			}).done(function (data) {
				cityData = data;
				componentActive(cpt.cityCon);
			});
		});

		touch.on(city, 'tap', function (e) {
			var _o = $(this),
			    _t = $('.cities-list>.city a'),
			    _id = _o.data('province-id');

			citiesList.find('.cl-selected').remove();

			if (!_o.hasClass(flg.on)) {
				(function () {
					multiClass(_t, flg.on, -1);

					_o.addClass(flg.on);

					var rowEnd = $('.row-end');
					var newCont = $('<ul class="cl-selected"></ul>');
					var objb = _o.offset().top - cityh;


					$.each(rowEnd, function (index, val) {
						var _rend = $(val),
						    _rendb = _rend.offset().top - cityh;

						if (objb === _rendb) _rend.after(newCont);
					});

					$.each(cityData, function (index, val) {
						if (val.ProID === _id) {
							var _name = val.name,
							    _link = val.Citylink,
							    _content = '<li class="city"><a href="http://' + _link + '.baihp.com">' + _name + '</a></li>';

							newCont.append(_content);
						}
					});
				})();
			} else {
				multiClass(_t, flg.on, -1);
			}
		});
	})();
});

/**
 * Multiply Change Class Name
 * @param  {Object} obj [description]
 * @param  {String} cls [description]
 * @param  {Number} ck  [description]
 */
function multiClass(obj, cls) {
	var tgl = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

	$.each(obj, function (index, val) {
		if (!tgl) $(val).toggleClass(cls);
		if (tgl === 1) $(val).addClass(cls);
		if (tgl === -1) $(val).removeClass(cls);
	});
}

function multiMove(obj) {
	$.each(obj, function (index, val) {
		return val.remove();
	});
}

/**
 * Component Activation for Adding Class Name
 * @param  {Object} obj   An Dom Object to Getting Data Attribution
 * @param  {Number} tgl   Control Class Name Type, 1 => add, 0 => toggle, -1 => remove
 * @param  {String} cls   Postfixer of Class Name
 * @param  {Object} outer The Container to Adding Class Name, Default '.bhp__container'
 * @return {String}       The Class Name by outputting
 */
function componentActive(obj) {
	var tgl = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	var cls = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
	var outer = arguments.length <= 3 || arguments[3] === undefined ? $('.bhp__wrapper') : arguments[3];

	$.each(obj, function (index, val) {
		var _cptname = $(val).data('component'),
		    _ismask = $(val).data('ismask'),
		    _cpt = 'bhp__' + _cptname + '-active' + cls,
		    _msk = _ismask ? ' bhp__mask--obfuscator-active' : '',
		    _cls = _cpt + _msk;

		if (tgl === 1) outer.addClass(_cls);
		if (tgl === -1) outer.removeClass(_cls);
		if (tgl === 0) outer.toggleClass(_cls);

		return _cls;
	});
}

/**
 * [getComponentClass description]
 * @param  {Object} obj [description]
 * @return {[type]}     [description]
 */
function getComponentClass(obj) {
	var _cptname = obj.data('component'),
	    _cls = 'bhp__' + _cptname + '-active';

	return _cls;
}

/**
 * Get Parameters from Url
 * @param  {String} str Default "window.location.search", if manul need a "?" at first
 * @return {Object}     Split Parameters to "{key: value}"
 */
function parseUrlParameter() {
	var str = arguments.length <= 0 || arguments[0] === undefined ? window.location.search : arguments[0];

	var _get = str.substr(1),
	    _arr = _get.split('&'),
	    result = {};

	for (var i = _arr.length - 1; i >= 0; i--) {
		// for (let i of _arr) {
		var _newarr = _arr[i].split('=');
		var _p = _newarr[0];
		var _v = _newarr[1];


		result[_p] = _v;
	}

	return result;
}

/**
 * Define Form Submit Method in Ajax
 * @param  {Object} obj  Jquery Object or Dom node
 * @param  {Object} args Set Ajax Arguments by Object
 */
function defineFormAjax(obj, args) {
	var _form = $(obj);
	var _args = {
		url: args.url || _form.attr('action'),
		type: args.type || _form.attr('method'),
		dataType: args.dataType || '',
		data: args.data || getFormData(_form),
		success: args.success,
		done: args.success,
		fail: args.fail,
		always: args.always
	};

	$.ajax({
		url: _args.url,
		type: _args.type,
		dataType: _args.dataType,
		data: _args.data
	}).done(_args.done).fail(_args.fail).always(_args.always);
}

/**
 * Getting Name & Value from Form, then Conver to Object shape
 * @param  {Object} form Jquery Object or Dom node
 * @return {Object}      Converred Data Object
 */
function getFormData(form) {
	var _obj = {},
	    _arr = $(form).serializeArray();

	$.each(_arr, function (index, val) {
		return _obj[val.name] = val.value;
	});

	return _obj;
}

/**
 * [trimHtml description]
 * @param  {String} str [description]
 * @return {String}     [description]
 */
function trimHtml(str) {
	return clearHtmlBlank(clearHtmlTags(str));
}

/**
 * [clearHtmlTags description]
 * @param  {String} str [description]
 * @return {String}     [description]
 */
function clearHtmlTags(str) {
	return str.replace(/<[^>]+>/g, '');
}

/**
 * [clearHtmlBlank description]
 * @param  {String}  str    [description]
 * @param  {Boolean} global [description]
 * @return {String}         [description]
 */
function clearHtmlBlank(str) {
	var global = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

	return global ? str.replace(/\s/g, '') : str.replace(/(^\s+)|(\s+$)/g, '');
}

/**
 * [getRealLen description]
 * @param  {String}  str [description]
 * @return {Integer}     [description]
 */
function getRealLen(str) {
	var len = 0;

	for (var i = 0; i < str.length; i++) {
		encodeURI(str.charAt(i)).length > 2 ? len += 1 : len += 0.5;
	}return len;
}

function bhp_cpt_notify(args) {
	var _args = {
		cls: args.cls || '', // String
		des: args.des || '', // String
		act: args.act || '', // String
		link: args.link || 'javascript:void(0)' // String
	};

	var _cptCt = '<span class="describe">' + _args.des + '</span><a href="' + _args.link + '" class="action bhp__notify-action">' + _args.act + '</a>',
	    _cptItem = '<div class="bhp__notify-item">' + _cptCt + '</div>',
	    _cptCon = '<div class="' + _args.cls + ' bhp__notify bhp__notify--left bhp__notify--transparent">' + _cptItem + '</div>';

	return _cptCon;
}