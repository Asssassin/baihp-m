jQuery(document).ready(function ($) {
	'use strict';

	/**
	 * Area
	 * @param  {[type]} ( [description]
	 * @return {[type]}   [description]
	 */
	(() => {
		let [_string, _flag, _tabcls, _areadata, _styles] = ['', 1, '', {}, ''];

		let [
			bussinessSelect, positionSelect,
			bussinessCon, positionCon,
			selectTabBox, stbItemList, item
		] = [
			$('.companyBusiness-Btn'), $('.companyPosition-Btn'),
			$('.companyBusiness-content'), $('.companyPosition-content'),
			$('.areabox.select-tab-box'), $('.stb-item-list'), $('.stb-item a.item')
		];

		let [inputPro, inputCity, inputZone, inputStreet] = [
			'province', 'city', 'zone', 'street'
		];

		touch.on(positionSelect, 'tap', function () {
			let _url = $(this).data('require');

			$.ajax({
				url      : _url,
				type     : 'GET',
				dataType : 'json'
			})
			.done((data) => {
				if(_flag) {
					let _proItem = '';

					$.each(data, (n, v) => _proItem += '<a class="item" data-metas="' + inputPro + ', ' + v.ID + '">' + v.Name + '</a>');

					stbItemList.find('nav.provinces.container').append(_proItem);

					selectTabBox.addClass('on');
				}
			});
		});

		touch.on(selectTabBox, 'tap', item, function (e) {
			let the    = $(this),
				theCon = the.html(),
				parent = the.parent().parent(),
				url    = parent.parent().parent().data('require'),
				index  = parent.data('tab'),
				metas  = the.data('metas'),
				metasArr, _name, _id;

			if (metas) {
				metasArr = metas.split(', '), _name = metasArr[0], _id = metasArr[1];
			} else {
				return 0;
			}

			_areadata[_name] = _id;

			// _styles += 'tab-' +
			// $('head').append('<style>' + _styles + '</style>');

			$.ajax({
				// url      : 'tmp/area.tmp.php',
				url      : url,
				type     : 'GET',
				dataType : 'html',
				// data     : {_name: _id},
				data     : _areadata
			}).done((data) => {
				console.log(data);
				_string += theCon + ' ';

				// let _newInputHidden = '<input type="hidden" name="' + _name '" value="' + _value + '">';

				if (index === 'a') stbItemList.find('nav.cities.container').append(data);
				if (index === 'b') stbItemList.find('nav.zones.container').append(data);
				if (index === 'c') stbItemList.find('nav.streets.container').append(data);
				if (index === 'end') {
					let _newConItem = '<li class="item"><i class="close ibhp-remove_circle"></i><span class="result">' + _string + '</span></li>';

					positionCon.append(_newConItem);
					positionCon.prev('.bhp__form--placeholder').addClass('off');

					_string = '';
					_flag   = 0;
				}

				$('input[name="' + _name + '"]').val(_id);
			});

			let _tabIndex = 'tab-' + index;

			stbItemList.addClass(_tabIndex);

			_tabcls += _tabIndex + ' ';

			console.log(_tabcls);

			if (index === 'end') {
				selectTabBox.removeClass('on');
				stbItemList.removeClass(_tabcls);
			}
		});
	})();

	/**
	 * Fenlei
	 * @param  {[type]} ( [description]
	 * @return {[type]}   [description]
	 */
	(() => {
		let ajaxData;

		let [_string, _flag, _count, _tabcls, _varr, _varid, _styles] = ['', 1, 0, '', '', 0, ''];

		let [bussiness, bussinessSelect, bussinessCon, selectTabBox] = [
			$('.companyBusiness.bhp__form--section'),
			$('.companyBusiness-Btn'),
			$('.companyBusiness-content'),
			$('.catsbox.select-tab-box')
		];

		let stbItemList = selectTabBox.find('.stb-item-list'),
			item = selectTabBox.find('a.item');

		// let _itemId, _itemName;
		// let _items = '<a class="item" data-metas="f, ' + _itemId + '">' + _itemName + '</a>';

		let _items = '';

		let _generateItems = (_itemId, _itemName) => '<a class="item" data-metas="f, ' + _itemId + '">' + _itemName + '</a>',
			_generateTerm  = (_str) => '<li class="item" data-item="fenlei[' + _varid + ']"><i class="close ibhp-remove_circle"></i><span class="result">' + _str + '</span></li>';

		touch.on(bussinessSelect, 'tap', function () {
			let _url = $(this).data('require');

			if (_count >= 4) return false;

			$.ajax({
				url      : _url,
				type     : 'GET',
				dataType : 'json'
			})
			.done((data) => {
				ajaxData = data;
				if (_flag && _count <= 0) {

					$.each(data, (n, v) => _items += _generateItems(n, v.name));

					stbItemList.find('.stb-item nav.container').eq(0).html(_items);

				}
				selectTabBox.addClass('on');
			});
		});

		touch.on(selectTabBox, 'tap', item, function (e) {
			let the    = $(this),
				theCon = the.html(),
				parent = the.parent().parent(),
				url    = parent.parent().parent().data('require'),
				index  = parent.data('tab'),
				metas  = the.data('metas'),
				metasArr, _name, _id;

			if (metas) {
				metasArr = metas.split(', '), _name = metasArr[0], _id = metasArr[1];
			} else {
				return false;
			}

			_varr += _id + ',';

			// _styles += 'tab-' +
			// $('head').append('<style>' + _styles + '</style>');

			_string += theCon + ' ';

			let _items = '',
				_itemId, _i;

				ajaxData = ajaxData[_id]['list'];
			if (index === 'a') {
				_i = 1;
				$.each(ajaxData, (i, v) => _items += _generateItems(i, v.name));
			}
			if (index === 'b' && ajaxData) {
				_i = 2;
				$.each(ajaxData, (i, v) => _items += _generateItems(i, v));
			}
			if (! ajaxData || index === 'end') {
				let _fenleiIds = _varr.slice(0, -1);
				let _check = bussiness.find('input[value="' + _fenleiIds + '"]').length;

				if (_check >= 1) {
					console.log('This already had');
				} else {
					let _newConItem = _generateTerm(_string);
					let _input = '<input type="hidden" name="fenlei[' + _varid + ']" value="' + _fenleiIds + '">';
					bussinessCon.append(_newConItem);
					bussiness.append(_input);
					_varr = _string = '';
					_count++;
					_varid++;
				}

				bussinessCon.prev('.bhp__form--placeholder').addClass('off');

				_flag = 0;
			}

			if (index === 'a' || index === 'b') stbItemList.find('.stb-item nav.container').eq(_i).html(_items);

			let _tabIndex = 'tab-' + index;

			stbItemList.addClass(_tabIndex);

			_tabcls += _tabIndex + ' ';

			console.log(_string);

			if (! ajaxData || index === 'end') {
				selectTabBox.removeClass('on');
				stbItemList.removeClass(_tabcls);
			}
		});

		touch.on(bussinessCon, 'tap', 'li.item i.close', function () {
			let the = $(this),
				_parent = the.parent(),
				_itemName = _parent.attr('data-item');
			let _delInput = bussiness.find('input[name="' + _itemName + '"]');
			_count--;

			multiMove([_delInput, _parent]);

			let _check = bussiness.find('input[name^="fenlei"]').length;
			if (_check <= 0) bussinessCon.prev('.bhp__form--placeholder').removeClass('off');
		});

		let stbClose = $('.stb-close');
		touch.on(stbClose, 'tap', () => {
			_varr = _string = '';
			selectTabBox.removeClass('on');
			stbItemList.removeClass(_tabcls);
			_flag = 0;
		});
	})();

	let entryForm = $('form.entry-seller-form');
	entryForm.on('submit', function () {
		defineFormAjax(this, {
			success: (data) => {
				console.log(data);
			}
		});
	});
});


// class SelectTabBox {
// 	constructor() {
// 		this.contain = $('<div class="' + this.newBoxCls() + '"></div>');
// 	}
//
// 	newBoxCls() {
// 		let timestamp = new Date().getTime();
// 		return 'bhp__select-tab-box-' + timestamp;
// 	}
//
//
// }
