jQuery(document).ready(function($) {
	'use strict';

	let maskG = $('.mask-g');

	/**
	 * Form: Battery Charge
	 */
	let [batteryRange, batteryRangeValue] = [
		$('.batterySetRange'),
		$('.batterySetRange + .value')
	]

	batteryRange.on('change', function () {
		let _v = this.value;

		batteryRange.attr('value', _v);
		batteryRangeValue.html(_v);
	});

	let [chargeRange, chargeRangeValue] = [
		$('.chargeIntervalRange'),
		$('.chargeIntervalRange + .value')
	]

	chargeRange.on('change', function () {
		let _v = this.value;

		chargeRange.attr('value', _v);
		chargeRangeValue.html(_v);
	});

	/**
	 * Upload Section
	 */
	let bhp_tab_fold = {
		btns : $('.bhp__tab-fold--btns'),
		btn : $('.bhp__tab-fold--btn'),
		items : $('.bhp__tab-fold--items'),
		item : $('.bhp__tab-fold--item')
	};

	let upui = bhp_tab_fold;
	touch.on(upui.btn, 'tap', function () {
		const the = $(this);

		let index  = the.index(),
			parent = the.parent(),
			matchItems = parent.next(upui.items),
			matchItem  = matchItems.children(upui.item).eq(index);

		multiClass(matchItems, 'on');
		console.log(matchItem);
	});

	console.log(upui);

	let [uploadBar, uploadCon] = [
		$('.upload-bar'),
		$('.upload-container')
	];

	// touch.on(uploadBar, 'tap', () => {
	// 	multiClass([uploadCon], 'on');
	// });

	let upPicClsBtn = uploadCon.find('.item i.close');
	touch.on(upPicClsBtn, 'tap', function () {
		let the = $(this),
			_item = the.parent();

		_item.remove();
	});

	let upItemPic = uploadCon.find('.item .hint');
	touch.on(upItemPic, 'tap', function () {
		this.innerText = '';
	});
	for (let i = 0; i < upItemPic.length; i++) {
		$(upItemPic[i]).keyup(function () {
			setCharacterLimit(this, [15, 0]);
		});
	}

	/**
	 * Footer Navigation
	 */
	let [footerBar, footerCon] = [
		$('.footer-nav-bar'),
		$('.footer-nav-container')
	];

	let hongbaoBtn = footerBar.find('.hongbao-btn'),
		helpBtn = footerBar.find('.help-btn');

	let footerConList = $('.footer-nav-container .fnc-list');

	touch.on(hongbaoBtn, 'tap', () => {
		let _cls = 'second';

		if (footerConList.hasClass(_cls) && footerCon.hasClass('on')) {
			multiClass(footerConList, _cls, -1);
		} else if (! footerCon.hasClass('on')) {
			multiClass(footerConList, _cls, -1);
			multiClass([footerCon, maskG], 'on');
		} else {
			multiClass([footerCon, maskG], 'on');
		}
	});

	touch.on(helpBtn, 'tap', () => {
		let _cls = 'second';

		if (! footerConList.hasClass(_cls) && ! footerCon.hasClass('on')) {
			multiClass(footerConList, _cls, 1);
			multiClass([footerCon, maskG], 'on');
		} else if (! footerConList.hasClass(_cls)) {
			multiClass(footerConList, _cls, 1);
		} else {
			multiClass([footerCon, maskG], 'on');
		}
	});

	touch.on(maskG, 'tap', () => {
		multiClass([footerCon, maskG], 'on', -1);
		multiClass(footerConList, 'second', -1);
	});

});
