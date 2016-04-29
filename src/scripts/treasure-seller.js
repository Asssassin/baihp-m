jQuery(document).ready(function($) {
	'use strict';

	let [windowInnerH, tableBody, tableFooter, transferBtn, transferForm] = [
		window.innerHeight,
		$('.bhp__tablebox--body'),
		$('.bhp__tablebox--footer'),
		$('.bhp__tablebox--footer .transfer'),
		$('form.transfer-form')
	];

	let [tableBodyTop, tableFooterH, transferFormH] = [
		tableBody.offset().top,
		tableFooter.height(),
		transferForm.height()
	];

	let initTableH = windowInnerH - tableBodyTop - tableFooterH;

	tableBody.height(initTableH);

	touch.on(transferBtn, 'tap', () => {
		transferForm.addClass('on');
		tableBody.height(initTableH - transferFormH - 32);
	});

	$('form').on('submit', function () {
		defineFormAjax(this, {
			dataType: 'html',
			type: 'GET',
			success: (data) => {
				let _sts = $(data).data('status');

				if (_sts === 'success') $(this).find('.responese-text').addClass('on');
			}
		});

		return false;
	});

});
