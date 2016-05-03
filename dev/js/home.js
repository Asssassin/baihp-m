'use strict';

jQuery(document).ready(function ($) {
	"use strict";

	var flg = {
		on: 'on',
		off: 'off',
		drawer: '_drawer_'
	};

	/**
  * Carousel Config
  * @type {Number}
  */
	$('.owl-carousel').owlCarousel({
		items: 1,
		margin: 0,
		autoHeight: true,
		dots: true,
		nav: false,
		lazyLoad: true,
		autoplay: true,
		autoplayTimeout: 5000,
		loop: true
	});

	/**
  * Taxonomy Section
  * @return {[type]}    [description]
  */
	var ccBtn = $('.cc-btn');
	touch.on(ccBtn, 'touchstart', function (e) {
		var _o = $(this),
		    _p = _o.parent(),
		    _l = _o.hasClass('l'),
		    _r = _o.hasClass('r'),
		    _btnl = _p.find('.cc-btn.l'),
		    _btnr = _p.find('.cc-btn.r'),
		    _len = _p.find('.cat-tax').length,
		    _con = _p.find('.cats-item-wrapper'),
		    _hasa = _con.hasClass('a'),
		    _hasb = _con.hasClass('b');

		if (_r) {
			if (!_con.hasClass('a')) {
				_con.addClass('a');
				_btnl.addClass(flg.on);
			} else if (!_con.hasClass('b')) {
				_con.addClass('b');
				_o.removeClass(flg.on);
			}
		} else if (_l) {
			if (_con.hasClass('b')) {
				_con.removeClass('b');
				_btnr.addClass(flg.on);
			} else if (_con.hasClass('a') && !_con.hasClass('b')) {
				_con.removeClass('a');
				_o.removeClass(flg.on);
			}
		}
	});

	addToHomescreen(); // Add to Homescreen
});