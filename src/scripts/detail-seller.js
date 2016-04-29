jQuery(document).ready(function ($) {
    'use strict';

    let appWrapper = $('.Wrapper.bhp__wrapper');

    /**
     * Excerpt
     */
    let [excerptCon, excerptContCon, excerptMoreBtn] = [
        $('.excerpt'),
        $('.excerpt > .content'),
        $('.excerpt .more-btn')
    ];

    if (excerptCon.height() < excerptContCon.height()) excerptCon.removeClass('off');

    touch.on(excerptMoreBtn, 'tap', function (e) {
        let _parent = $(this).parent();

        _parent.toggleClass('on');
    });

    /**
     * Comments
     */
    let [commentCon, commentsWrap, loaderAct] = [
        $('.comments-container'),
        $('.comments-wrapper'),
        $('.comments-container .loader')
    ];

    touch.on(loaderAct, 'tap', function (e) {
        let the = $(this),
            moreHref = the.data('require');

        if (!moreHref) return false;

        $.ajax({
                url: moreHref,
                type: 'GET',
                cache: false,
                dataType: 'html'
            })
            .done((data) => {
                let _comments = $(data).find('.comments-wrapper').html(),
                    _moreHref = $(data).find('.loader').data('require');

                the.attr('data-require', _moreHref);
                if (_moreHref.length <= 0) {
                    commentsWrap.append(_comments);
                    return the.html('已经完了');
                }

                commentsWrap.append(_comments);
            });
    });

    let [commentForm, fakeTextarea, hiddenTextarea] = [
        $('form.submit-comment'),
        $('.submit-comment .textarea'),
        $('textarea.commentContent')
    ];

    // fakeTextarea.on('keyup', function () {
    // 	let _content = $(this).html();
    // 	hiddenTextarea.val(_content);
    // });

    let _notifyCls = 'comment-notify';

    if ($('.' + _notifyCls).length === 0) appWrapper.prepend(bhp_cpt_notify({
        cls: _notifyCls,
        act: '好的'
    }));

    let commentOffsetTop = $('.comments-tab').position().top;

    let _commentNotify = $('.comment-notify.bhp__notify'),
        _commentNotifyBck = _commentNotify.find('.action');

    touch.on(_commentNotifyBck, 'tap', () => _commentNotify.removeClass('on'));

    commentForm.on('submit', function () {

        let _getContent = fakeTextarea.html(),
            _content = trimHtml(_getContent);

        let _contentLen = getRealLen(_content),
            _limitLen = fakeTextarea.attr('data-maxlength');

        if (_contentLen >= _limitLen || _contentLen <= 0) {
            let _alert = _contentLen <= 0 ? '请输入内容后再提交' : '内容超过300字限制';

            _commentNotify.find('.describe').html(_alert);
            _commentNotify.addClass('on');

            setTimeout(() => _commentNotify.removeClass('on'), 5000);

            return false;
        }

        hiddenTextarea.val(_getContent);

        defineFormAjax(this, {
            dataType: 'html',
            success: (data) => {
                let _comment = commentsWrap.find('.comment').eq(0).clone(true),
                    _top = commentOffsetTop - _comment.height();

                _comment.find('.comment-body').html(_content);
                commentsWrap.prepend(_comment);
                fakeTextarea.html('');
                hiddenTextarea.val('');
                $('main.Content').animate({
                    scrollTop: _top
                }, 300);
            }
        });

        return false;
    });

    /**
     * Battery Charge
     * @param  {[type]} ( [description]
     * @return {[type]}   [description]
     */
    (() => {
        let [batteryBtn, batteryCon, power, batteryInfo, remainingInfo] = [
            $('.battery-btn'),
            $('.battery'),
            $('.battery .power'),
            $('.power-info .text'),
            $('.remaining-info .text')
        ];

        touch.on(batteryBtn, 'touchstart', () => {
            let _url = batteryCon.data('require');

            let [_uid, _fuid, _sts] = [
                parseUrlParameter(_url).uid,
                parseUrlParameter(_url).fuid,
                batteryCon.data('status')
            ];

            let _notifyCls = 'battery-notify';

            if ($('.' + _notifyCls).length === 0) appWrapper.prepend(bhp_cpt_notify({
                cls: _notifyCls
            }));

            multiClass([batteryBtn, batteryCon], 'on', 1);

            // let powerWidth = batteryCon.find('.power').attr('style'),
            // 	powerNum   = powerWidth.match(/width\:\s([\d\.]+)/)[1];



            $.ajax({
                    url: _url,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        uid: _uid,
                        fuid: _fuid
                    }
                })
                .done((data) => {
                    let _status = data.status,
                        _power = data.power,
                        _alert = data.alert,
                        _remain = data.remaining,
                        _actN = data.actName,
                        _actL = data.actLink,
						_ctime = data.countdown;

                    let notifyCon = $('.battery-notify.bhp__notify');

                    let [ntfDes, ntfAct] = [
                        notifyCon.find('.describe'),
                        notifyCon.find('.action')
                    ];

                    ntfDes.html(_alert);
                    ntfAct.html(_actN);
                    ntfAct.attr('href', _actL);

					let batteryTimeout = $('.battery-btn.countdown'),
						_countdownNubm = batteryTimeout.children('.v');

					let _countdown = (t) => {
					    let _clock = setTimeout(function () {
					        _countdown(t-1);
					    }, 1000);

						if (t <= 0) clearTimeout(_clock);

						_countdownNubm.html(t);
					}

					if (_ctime === 0) _ctime = 5; // Default countdown time

                    let _setcountdown = setTimeout(() => {
						_countdown(_ctime);
					}, 1000);

                    setTimeout(() => {
						multiClass([batteryBtn, batteryCon], 'on', -1);
						clearTimeout(_countdown);
					}, _ctime * 1000);

                    setTimeout(() => {
                        if (_status === 'success') {
                            power.css('width', _power + '%');
                            batteryInfo.html(_power);
                        } else if (_status === 'fail' || !_status) {}
                        remainingInfo.html(_remain);
                        multiClass([remainingInfo.parent(), notifyCon], 'on', 1);
                    }, 3000);

                    setTimeout(() => multiClass([remainingInfo.parent(), notifyCon], 'on', -1), 5000);
                });
        });
    })();

    /**
     * Component:Lightbox
     */
    (() => {
        let [lbCon, galleryCon] = [
            $('.Lightbox'),
            $('.seller-intro .gallery')
        ];

        let _pic = galleryCon.find('img.pic');

        touch.on(_pic, 'tap', function (e) {
            let the = $(this),
                _src = the.data('origin-src'),
                _des = the.next('.describe').html();

            let [lbPic, lbDes] = [
                lbCon.find('img.pic'),
                lbCon.find('.metas .text')
            ];

            lbPic.attr('src', _src);
            lbDes.html(_des);

            lbCon.addClass('on');
        });

        let closeBtn = lbCon.find('.close-btn');

        touch.on(closeBtn, 'tap', () => {
            lbCon.removeClass('on');
        });
    })();
});
