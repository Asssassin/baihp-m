'use strict';

jQuery(document).ready(function ($) {
	'use strict';

	var maskG = $('.mask-g');

	/**
  * Form: Battery Charge
  */
	var batteryRange = $('.batterySetRange');
	var batteryRangeValue = $('.batterySetRange + .value');


	batteryRange.on('change', function () {
		var _v = this.value;

		batteryRange.attr('value', _v);
		batteryRangeValue.html(_v);
	});

	var chargeRange = $('.chargeIntervalRange');
	var chargeRangeValue = $('.chargeIntervalRange + .value');


	chargeRange.on('change', function () {
		var _v = this.value;

		chargeRange.attr('value', _v);
		chargeRangeValue.html(_v);
	});

	/**
  * Upload Section
  */
	var bhp_tab_fold = {
		btns: $('.bhp__tab-fold--btns'),
		btn: $('.bhp__tab-fold--btn'),
		items: $('.bhp__tab-fold--items'),
		wrapper: $('.bhp__tab-fold--wrapper'),
		item: $('.bhp__tab-fold--item')
	};

	var upui = bhp_tab_fold;

	touch.on(upui.btns, 'tap', upui.btn, function () {
		var the = $(this);

		var index = the.index(),
		    parent = the.parent(),
		    aimItems = parent.next(upui.items),
		    tabIndex = parseInt(aimItems.attr('data-tab')),
		    aimWrap = aimItems.children(upui.wrapper),
		    aimItem = aimWrap.children(upui.item).eq(index);

		aimItems.attr('data-tab', index);

		if (aimItems.hasClass('on') && tabIndex === index) multiClass(aimItems, 'on', -1);else multiClass(aimItems, 'on', +1);

		if (tabIndex !== index) aimWrap.css('transform', 'translateX(-' + index * 100 + '%)');
	});

	var uploadBar = $('.upload-bar');
	var uploadCon = $('.upload-container');

	// touch.on(uploadBar, 'tap', () => {
	// 	multiClass([uploadCon], 'on');
	// });

	var upPicClsBtn = uploadCon.find('.item i.close');
	touch.on(upPicClsBtn, 'tap', function () {
		var the = $(this),
		    _item = the.parent();

		_item.remove();
	});

	var upItemPic = uploadCon.find('.item .hint');
	touch.on(upItemPic, 'tap', function () {
		this.innerText = '';
	});
	for (var i = 0; i < upItemPic.length; i++) {
		$(upItemPic[i]).keyup(function () {
			setCharacterLimit(this, [15, 0]);
		});
	}

	/**
  * Footer Navigation
  */
	var footerBar = $('.footer-nav-bar');
	var footerCon = $('.footer-nav-container');


	var hongbaoBtn = footerBar.find('.hongbao-btn'),
	    helpBtn = footerBar.find('.help-btn');

	var footerConList = $('.footer-nav-container .fnc-list');

	touch.on(hongbaoBtn, 'tap', function () {
		var _cls = 'second';

		if (footerConList.hasClass(_cls) && footerCon.hasClass('on')) {
			multiClass(footerConList, _cls, -1);
		} else if (!footerCon.hasClass('on')) {
			multiClass(footerConList, _cls, -1);
			multiClass([footerCon, maskG], 'on');
		} else {
			multiClass([footerCon, maskG], 'on');
		}
	});

	touch.on(helpBtn, 'tap', function () {
		var _cls = 'second';

		if (!footerConList.hasClass(_cls) && !footerCon.hasClass('on')) {
			multiClass(footerConList, _cls, 1);
			multiClass([footerCon, maskG], 'on');
		} else if (!footerConList.hasClass(_cls)) {
			multiClass(footerConList, _cls, 1);
		} else {
			multiClass([footerCon, maskG], 'on');
		}
	});

	touch.on(maskG, 'tap', function () {
		multiClass([footerCon, maskG], 'on', -1);
		multiClass(footerConList, 'second', -1);
	});
});