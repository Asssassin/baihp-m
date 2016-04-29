jQuery(document).ready(($) => {
	'use strict';

	const cpt = {
		main      : $('main'),
		container : $('.bhp__container'),
		header    : $('.bhp__header'),
		drawer    : $('.bhp__drawer'),
		filter    : $('.bhp__filter'),
		navBtm    : $('.bhp__navigator--bottom'),
		mask      : $('.bhp__mask--obfuscator'),
		userboard : $('.user-dashboard'),
		cityCon   : $('.cities-container')
	};

	const btn = {
		drawer     : $('.bhp__button--drawer'),
		userCenter : $('.ue-center'),
		city       : $('.place-entry'),
		peArrow    : $('.pe-arrow'),
		filter     : $('.Filter .option-bar .ob-item')
	};

	const flg = {
		on     : 'on',
		off    : 'off',
		drawer : '_drawer_'
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

	touch.on(cpt.main, 'touchstart', (e) => {
		// e.preventDefault();
	});


	/**
	 * Drawer
	 * @return {[type]}    [description]
	 */
	touch.on(btn.drawer, 'touchstart', () => {
		componentActive(cpt.drawer, 1);
		// multiClass(cpt, flg.on + ' ' + flg.drawer, -1);
		// multiClass(cpt.drawer, flg.on, 1);
		// multiClass(cpt.mask, flg.on + ' ' + flg.drawer, 1);
	});

	let [drawerRankBtn, drawerWrap] = [
		cpt.drawer.find('.action'),
		cpt.drawer.find('.drawer-wrapper')
	];
	let drawerRankBtnCon = drawerRankBtn.html();
	touch.on(drawerRankBtn, 'tap', function () {
		let _txt = $(this).html();
		if (_txt === drawerRankBtnCon) $(this).html('返回');
		else $(this).html(drawerRankBtnCon);
		multiClass(drawerWrap, 'rank-tab');
	});
	touch.on(cpt.mask, 'tap', () => {
		multiClass(drawerWrap, 'rank-tab', -1);
		drawerRankBtn.html(drawerRankBtnCon);
	});
	/**
	 * Mask
	 * @return {Function}          [description]
	 */
	// touch.on(cpt.mask, 'tap', () => multiClass(cpt, flg.on + ' ' + flg.drawer, -1));
	touch.on(cpt.mask, 'tap', () => componentActive([cpt.drawer, cpt.cityCon, cpt.filter], -1));


	/**
	 * City List
	 * @return {[type]}   [description]
	 */
	(() => {
		let [citiesCon, citiesList, city, peArrow] = [
			$('.cities-container'),
			$('.cities-list'),
			$('.cities-list>.city')
		];

		let [cityw, cityh] = [
			city.width(),
			city.height()
		];

		$.each(city, function(index, val) {
			let obj = $(val);

			if ((obj.offset().left + cityw) > (cityw * 3)) obj.addClass('row-end');
		});

		let cityData;
		touch.on(btn.city, 'touchstart', () => {
			$.ajax({
				url      : 'js/city.js',
				type     : 'GET',
				dataType : 'json'
			})
			.done((data) => {
				cityData = data;
				componentActive(cpt.cityCon);
			});
		});

		touch.on(city, 'tap', function (e) {
			let _o  = $(this),
				_t  = $('.cities-list>.city a'),
				_id = _o.data('province-id');

			citiesList.find('.cl-selected').remove();

			if (! _o.hasClass(flg.on)) {
				multiClass(_t, flg.on, -1);

				_o.addClass(flg.on);

				let [rowEnd, newCont, objb] = [
					$('.row-end'),
					$('<ul class="cl-selected"></ul>'),
					_o.offset().top - cityh
				];

				$.each(rowEnd, (index, val) => {
					let _rend = $(val),
						_rendb = _rend.offset().top - cityh;

					if (objb === _rendb) _rend.after(newCont);
				});

				$.each(cityData, (index, val) => {
					if (val.ProID === _id) {
						let _name    = val.name,
							_link    = val.Citylink,
							_content = '<li class="city"><a href="http://' + _link + '.baihp.com">' + _name + '</a></li>';

						newCont.append(_content);
					}
				});
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
function multiClass(obj, cls, tgl = 0) {
	$.each(obj, (index, val) => {
		if (! tgl) $(val).toggleClass(cls);
		if (tgl === 1) $(val).addClass(cls);
		if (tgl === -1) $(val).removeClass(cls);
	});
}

function multiMove(obj) {
	$.each(obj, (index, val) => val.remove());
}

/**
 * Component Activation for Adding Class Name
 * @param  {Object} obj   An Dom Object to Getting Data Attribution
 * @param  {Number} tgl   Control Class Name Type, 1 => add, 0 => toggle, -1 => remove
 * @param  {String} cls   Postfixer of Class Name
 * @param  {Object} outer The Container to Adding Class Name, Default '.bhp__container'
 * @return {String}       The Class Name by outputting
 */
function componentActive(obj, tgl = 0, cls = '', outer = $('.bhp__wrapper')) {
	$.each(obj, (index, val) => {
		let _cptname = $(val).data('component'),
			_ismask  = $(val).data('ismask'),
			_cpt     = 'bhp__' + _cptname + '-active' + cls,
			_msk     = _ismask ? ' bhp__mask--obfuscator-active' : '',
			_cls     = _cpt + _msk;

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
	let _cptname = obj.data('component'),
		_cls     = 'bhp__' + _cptname + '-active';

	return _cls;
}


/**
 * Get Parameters from Url
 * @param  {String} str Default "window.location.search", if manul need a "?" at first
 * @return {Object}     Split Parameters to "{key: value}"
 */
function parseUrlParameter(str = window.location.search) {
	let	_get = str.substr(1),
		_arr = _get.split('&'),
		result = {};

	for (let i = _arr.length - 1; i >= 0; i--) {
	// for (let i of _arr) {
		let _newarr = _arr[i].split('=');
		let [_p, _v] = [_newarr[0], _newarr[1]];

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
	let _form = $(obj);
	let	_args = {
			url      : args.url || _form.attr('action'),
			type     : args.type || _form.attr('method'),
			dataType : args.dataType || '',
			data     : args.data || getFormData(_form),
			success  : args.success,
			done     : args.success,
			fail     : args.fail,
			always   : args.always,
		};

	$.ajax({
		url      : _args.url,
		type     : _args.type,
		dataType : _args.dataType,
		data     : _args.data
	})
	.done(_args.done)
	.fail(_args.fail)
	.always(_args.always);
}


/**
 * Getting Name & Value from Form, then Conver to Object shape
 * @param  {Object} form Jquery Object or Dom node
 * @return {Object}      Converred Data Object
 */
function getFormData(form) {
	let _obj = {},
		_arr = $(form).serializeArray();

	$.each(_arr, (index, val) => _obj[val.name] = val.value);

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
function clearHtmlBlank(str, global = 1) {
    return global ? str.replace(/\s/g, '') : str.replace(/(^\s+)|(\s+$)/g, '');
}

/**
 * [getRealLen description]
 * @param  {String}  str [description]
 * @return {Integer}     [description]
 */
function getRealLen(str) {
    let len = 0;

    for (let i = 0; i < str.length; i++) encodeURI(str.charAt(i)).length > 2 ? len += 1 : len += 0.5;

    return len;
}

function bhp_cpt_notify(args) {
	let _args = {
		cls  : args.cls || '', // String
		des : args.des || '', // String
		act  : args.act || '', // String
		link : args.link || 'javascript:void(0)' // String
	};

	let _cptCt   = '<span class="describe">' + _args.des + '</span><a href="' + _args.link + '" class="action bhp__notify-action">' + _args.act + '</a>',
		_cptItem = '<div class="bhp__notify-item">' + _cptCt + '</div>',
		_cptCon  = '<div class="' + _args.cls + ' bhp__notify bhp__notify--left bhp__notify--transparent">' + _cptItem + '</div>';

	return _cptCon;
}
