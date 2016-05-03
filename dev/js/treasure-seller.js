'use strict';

jQuery(document).ready(function ($) {
	'use strict';

	var windowInnerH = window.innerHeight;
	var tableBody = $('.bhp__tablebox--body');
	var tableFooter = $('.bhp__tablebox--footer');
	var transferBtn = $('.bhp__tablebox--footer .transfer');
	var transferForm = $('form.transfer-form');
	var tableBodyTop = tableBody.offset().top;
	var tableFooterH = tableFooter.height();
	var transferFormH = transferForm.height();


	var initTableH = windowInnerH - tableBodyTop - tableFooterH;

	tableBody.height(initTableH);

	touch.on(transferBtn, 'tap', function () {
		transferForm.addClass('on');
		tableBody.height(initTableH - transferFormH - 32);
	});

	$('form').on('submit', function () {
		var _this = this;

		defineFormAjax(this, {
			dataType: 'html',
			type: 'GET',
			success: function success(data) {
				var _sts = $(data).data('status');

				if (_sts === 'success') $(_this).find('.responese-text').addClass('on');
			}
		});

		return false;
	});
});