'use strict';

jQuery(document).ready(function ($) {
	'use strict';

	var cpt = {
		main: $('main'),
		container: $('.bhp__container'),
		filter: $('.bhp__filter'),
		mask: $('.bhp__mask--obfuscator')
	};

	var btn = {
		filter: $('.Filter .option-bar .ob-item')
	};

	var flg = {
		on: 'on',
		off: 'off',
		drawer: '_drawer_'
	};

	// let mainCon = $('main.Content');

	// touch.on(mainCon, 'swipe', function (e) {
	// let [_dir, _sellers, _limitH, _target] = [
	// 	e.direction,
	// 	$('.sellers-section'),
	// 	$('.Header').height() + $('.adverts-section').height(),
	// 	$('.Filter')
	// ];
	// alert(e.direction);

	// if (-_sellers.position().top >= 0) {
	// 	if (_dir === 'up') _target.addClass('on');
	// 	else if (_dir === 'down') _target.removeClass('on');
	// } else {
	// 	_target.removeClass('on');
	// }
	// });

	/**
  * Filter
  * @return {[type]}   [description]
  */
	touch.on(btn.filter, 'touchstart', function (e) {
		var the = $(this),
		    parent = the.parent(),
		    items = parent.find('.ob-item'),
		    _url = cpt.filter.data('require'),
		    _type = the.data('filter-type'),
		    _ajax = the.data('stus-ajax'),
		    _con = '.Filter .filter-result',
		    _wpr = _con + ' .fr-wrapper';

		// Get index
		var _index = parent.find(the).index();

		var _target = $(_wpr + '.' + _type);

		if (!_target.hasClass(flg.on)) {
			multiClass($(_wpr), flg.on, -1);
			items.removeClass('on');
			the.addClass('on');
			_target.addClass(flg.on);
			componentActive(cpt.filter, 1);
		} else {
			items.removeClass('on');
			multiClass($(_wpr), flg.on, -1);
			componentActive(cpt.filter, -1);
		}

		if (!_ajax && _type !== 'undefined') {
			$.ajax({
				url: _url,
				type: 'GET'
			}).done(function (data) {
				var _content = $(data).find(_wpr).eq(_index);

				_content.addClass(_type + ' ' + flg.on);
				$(_con).append(_content);

				the.data('stus-ajax', 'true');
			});
		}
	});

	touch.on('.Filter', 'touchstart', '.frp-item', function (e) {
		var the = $(this),
		    frpItem = the.parent(),
		    frParent = frpItem.parent(),
		    frpItems = frParent.find('.frp-item'),
		    frChildren = frParent.next('.fr-children'),
		    frcItems = frChildren.find('.frc-item'),
		    _i = frParent.find(frpItem).index();

		frcItems.removeClass('on');
		frpItems.removeClass('on');

		frpItem.addClass('on');
		frcItems.eq(_i).addClass('on');
	});
});