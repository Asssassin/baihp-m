'use strict';

jQuery(document).ready(function ($) {
	'use strict';

	selectTabBox({
		itemsInfo: ['province', 'city', 'zone', 'street'],
		actCon: $('.companyPosition'),
		actBtn: $('.companyPosition-Btn'),
		popupBox: $('.areabox.select-tab-box'),
		valMethod: 1
	}, function (json, fn, arr, step) {
		var _items = '';
		$.each(json, function (ix, it) {
			var _meta = {
				id: it.ID,
				name: it.Name
			};
			_items += fn(arr[step], _meta);
		});
		return _items;
	});

	var _fenleiJson = void 0;
	selectTabBox({
		itemsInfo: ['lv1', 'lv2', 'lv3'],
		actCon: $('.companyBusiness'),
		actBtn: $('.companyBusiness-Btn'),
		popupBox: $('.catsbox.select-tab-box'),
		valMethod: 0
	}, function (json, fn, arr, step, id) {
		var _items = '';
		var _meta = {};
		switch (step) {
			case 0:
				_fenleiJson = json;
				_items = _eachfn(_fenleiJson);
				break;
			case 1:
				_fenleiJson = _fenleiJson[id].list;
				_items = _eachfn(_fenleiJson);
				break;
			case 2:
				_fenleiJson = _fenleiJson[id].list || '';
				_items = _eachfn(_fenleiJson);
				break;
		}

		function _eachfn(json) {
			var _str = '';

			$.each(json, function (ix, it) {
				_meta.id = ix;
				if (step <= 1) _meta.name = it.name;else _meta.name = it;

				_str += fn(arr[step], _meta);
			});

			return _str;
		}

		return _items;
	}, function (obj, ix, val) {
		$(obj).eq(ix).val(val);
	});

	function selectTabBox(arg, cb0, cb1) {
		/** Base Item Names */
		var itemArr = arg.itemsInfo;

		/** Initial Components UI */
		var UI = {};

		UI.actCon = arg.actCon;
		UI.actBtn = arg.actBtn;
		UI.popupBox = arg.popupBox;

		/** Inner Nodes */
		var conList = UI.popupBox.children('.stb-item-list'),
		    conExit = UI.popupBox.children('.stb-close'),
		    conItem = conList.children('.stb-item'),
		    conContain = conItem.children('.container'),
		    conTarget = conContain.children('.item'),
		    resCon = UI.actCon.children('ul.bhp__form--result-list'),
		    clsBtn = resCon.children('li.item i.close'),
		    formInput = UI.actCon.children('input[type="hidden"].aim');

		/** Inner Datas */
		var count = 1;
		var step = 0;
		var stepItem = '';
		var stepCls = '';
		var stepText = '';
		var ajaxData = {};

		/** Main Outter Datas */

		var Meta = {};
		Meta.idarr = [];
		Meta.initJson = {};
		/**
   * Generater Item of Box
   * @param  {String} metaName [description]
   * @param  {String} metaId   [description]
   * @param  {String} name     [description]
   * @return {String}          [description]
   */
		var _itemGive = function _itemGive(itemName, itemMeta) {
			return '<a class="item" data-metas="' + itemName + ', ' + itemMeta.id + '">' + itemMeta.name + '</a>';
		};

		var _itemCheck = function _itemCheck(parent) {
			return parent.find('.item').length > 0 ? true : false;
		};

		var _eachJson = function _eachJson(json, step, id) {
			var _contain = conContain.eq(step);

			stepItem = cb0(json, _itemGive, itemArr, step, id);
			_contain.html(stepItem);

			return stepItem;
		};

		/**
  * Reset Action
  * @return {[type]} [description]
  */
		var _reset = function _reset() {
			stepItem = '';
			step++;
		};

		var _clear = function _clear(obj, index) {
			var method = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

			if (method) $(obj).val('');else $(obj).eq(index).val('');
			count--;
		};

		var _escape = function _escape() {
			var sts = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
			var val = arguments[1];

			if (sts) _enddo(stepText);

			if (cb1) cb1(formInput, count - 1, val);

			UI.popupBox.removeClass('on');
			conList.removeClass(stepCls);
			step = 0;
			stepItem = '';
			stepText = '';
			ajaxData = {};
			count++;
		};

		var _stepdo = function _stepdo(obj, index, val) {
			var method = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];

			if (method) obj.eq(index).val(val);
			Meta.idarr.push(val); // add to id list
		};

		var _enddo = function _enddo(str) {
			var _newItem = '<li class="item"><i class="close ibhp-remove_circle"></i><span class="result">' + str + '</span></li>';

			resCon.append(_newItem);
			resCon.prev('.bhp__form--placeholder').addClass('off');

			stepText = '';
		};

		/**
   * Component Launcher (Button)
   */
		touch.on(UI.actBtn, 'tap', function () {
			var the = $(this);

			Meta.time = the.attr('data-repeat');

			if (count > Meta.time) return false;

			Meta.url = the.attr('data-require');
			Meta.method = the.attr('data-method');

			var _actAjaxDone = function _actAjaxDone(json) {
				_eachJson(json, step);
				_reset();

				UI.popupBox.addClass('on');
			};

			if (count > 1 && !arg.valMethod) {
				_actAjaxDone(Meta.initJson);
				return 0;
			}

			$.ajax({
				url: Meta.url,
				type: Meta.method,
				dataType: 'json'
			}).done(function (json) {
				Meta.initJson = json;

				_actAjaxDone(Meta.initJson);
			});
		});

		/**
   * Action Target
   */
		touch.on(conContain, 'tap', conTarget, function () {
			var the = $(this);
			var _metas = the.attr('data-metas'),
			    _metasArr = void 0,
			    _meta = void 0;

			if (_metas) {
				_metasArr = _metas.split(', ');
				_meta = {
					name: _metasArr[0],
					id: _metasArr[1],
					text: the.html()
				};
			} else {
				return false;
			}

			ajaxData[_meta.name] = _meta.id;

			var _stepAjaxDone = function _stepAjaxDone(json) {
				var _parent = the.parent().parent(),
				    _contain = conContain.eq(step),
				    _tab = _parent.attr('data-tab'),
				    _cls = 'tab-';

				/** Step Do Something */
				_stepdo(formInput, step - 1, _meta.id, arg.valMethod);

				var _eachResult = _eachJson(json, step, _meta.id);

				_reset();

				conList.addClass(_cls + _tab);

				stepCls += _cls + _tab + ' ';
				stepText += _meta.text + ' ';

				if (_tab === 'end' || _eachResult.length <= 0) _escape(1, _meta.id);
			};

			if (!arg.valMethod) {
				_stepAjaxDone(Meta.initJson);
				return 0;
			}

			$.ajax({
				url: Meta.url,
				type: Meta.method,
				dataType: 'json',
				data: ajaxData
			}).done(function (json) {
				_stepAjaxDone(json);
			}).fail(function () {
				_stepdo(formInput, step - 1, _meta.id, arg.valMethod);
				stepText += _meta.text + ' ';
				_escape(1, _meta.id);
			});
		});

		touch.on(conExit, 'tap', function () {
			_reset();
			_clear(formInput, '', arg.valMethod);
			_escape(0);
		});

		touch.on(resCon, 'tap', clsBtn, function () {
			var the = $(this);
			var _parent = the.parent(),
			    _index = _parent.index();

			_parent.remove();

			if (!_itemCheck(resCon)) resCon.prev('.bhp__form--placeholder').removeClass('off');

			_clear(formInput, _index, arg.valMethod);
		});
	}
});