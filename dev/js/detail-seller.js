'use strict';

jQuery(document).ready(function ($) {
    'use strict';

    var appWrapper = $('.Wrapper.bhp__wrapper');

    /**
     * Excerpt
     */
    var excerptCon = $('.excerpt');
    var excerptContCon = $('.excerpt > .content');
    var excerptMoreBtn = $('.excerpt .more-btn');


    if (excerptCon.height() < excerptContCon.height()) excerptCon.removeClass('off');

    touch.on(excerptMoreBtn, 'tap', function (e) {
        var _parent = $(this).parent();

        _parent.toggleClass('on');
    });

    /**
     * Comments
     */
    var commentCon = $('.comments-container');
    var commentsWrap = $('.comments-wrapper');
    var loaderAct = $('.comments-container .loader');


    touch.on(loaderAct, 'tap', function (e) {
        var the = $(this),
            moreHref = the.data('require');

        if (!moreHref) return false;

        $.ajax({
            url: moreHref,
            type: 'GET',
            cache: false,
            dataType: 'html'
        }).done(function (data) {
            var _comments = $(data).find('.comments-wrapper').html(),
                _moreHref = $(data).find('.loader').data('require');

            the.attr('data-require', _moreHref);
            if (_moreHref.length <= 0) {
                commentsWrap.append(_comments);
                return the.html('已经完了');
            }

            commentsWrap.append(_comments);
        });
    });

    var commentForm = $('form.submit-comment');
    var fakeTextarea = $('.submit-comment .textarea');
    var hiddenTextarea = $('textarea.commentContent');

    // fakeTextarea.on('keyup', function () {
    // 	let _content = $(this).html();
    // 	hiddenTextarea.val(_content);
    // });

    var _notifyCls = 'comment-notify';

    if ($('.' + _notifyCls).length === 0) appWrapper.prepend(bhp_cpt_notify({
        cls: _notifyCls,
        act: '好的'
    }));

    var commentOffsetTop = $('.comments-tab').position().top;

    var _commentNotify = $('.comment-notify.bhp__notify'),
        _commentNotifyBck = _commentNotify.find('.action');

    touch.on(_commentNotifyBck, 'tap', function () {
        return _commentNotify.removeClass('on');
    });

    commentForm.on('submit', function () {

        var _getContent = fakeTextarea.html(),
            _content = trimHtml(_getContent);

        var _contentLen = getRealLen(_content),
            _limitLen = fakeTextarea.attr('data-maxlength');

        if (_contentLen >= _limitLen || _contentLen <= 0) {
            var _alert = _contentLen <= 0 ? '请输入内容后再提交' : '内容超过300字限制';

            _commentNotify.find('.describe').html(_alert);
            _commentNotify.addClass('on');

            setTimeout(function () {
                return _commentNotify.removeClass('on');
            }, 5000);

            return false;
        }

        hiddenTextarea.val(_getContent);

        defineFormAjax(this, {
            dataType: 'html',
            success: function success(data) {
                var _comment = commentsWrap.find('.comment').eq(0).clone(true),
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
    (function () {
        var batteryBtn = $('.battery-btn');
        var batteryCon = $('.battery');
        var power = $('.battery .power');
        var batteryInfo = $('.power-info .text');
        var remainingInfo = $('.remaining-info .text');


        touch.on(batteryBtn, 'touchstart', function () {
            var _url = batteryCon.data('require');

            var _uid = parseUrlParameter(_url).uid;
            var _fuid = parseUrlParameter(_url).fuid;

            var _sts = batteryCon.data('status');

            var _notifyCls = 'battery-notify';

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
            }).done(function (data) {
                var _status = data.status,
                    _power = data.power,
                    _alert = data.alert,
                    _remain = data.remaining,
                    _actN = data.actName,
                    _actL = data.actLink,
                    _ctime = data.countdown;

                var notifyCon = $('.battery-notify.bhp__notify');

                var ntfDes = notifyCon.find('.describe');
                var ntfAct = notifyCon.find('.action');


                ntfDes.html(_alert);
                ntfAct.html(_actN);
                ntfAct.attr('href', _actL);

                var batteryTimeout = $('.battery-btn.countdown'),
                    _countdownNubm = batteryTimeout.children('.v');

                var _countdown = function _countdown(t) {
                    var _clock = setTimeout(function () {
                        _countdown(t - 1);
                    }, 1000);

                    if (t <= 0) clearTimeout(_clock);

                    _countdownNubm.html(t);
                };

                if (_ctime === 0) _ctime = 5; // Default countdown time

                var _setcountdown = setTimeout(function () {
                    _countdown(_ctime);
                }, 1000);

                setTimeout(function () {
                    multiClass([batteryBtn, batteryCon], 'on', -1);
                    clearTimeout(_countdown);
                }, _ctime * 1000);

                setTimeout(function () {
                    if (_status === 'success') {
                        power.css('width', _power + '%');
                        batteryInfo.html(_power);
                    } else if (_status === 'fail' || !_status) {}
                    remainingInfo.html(_remain);
                    multiClass([remainingInfo.parent(), notifyCon], 'on', 1);
                }, 3000);

                setTimeout(function () {
                    return multiClass([remainingInfo.parent(), notifyCon], 'on', -1);
                }, 5000);
            });
        });
    })();

    /**
     * Component:Lightbox
     */
    (function () {
        var lbCon = $('.Lightbox');
        var galleryCon = $('.seller-intro .gallery');


        var _pic = galleryCon.find('img.pic');

        touch.on(_pic, 'tap', function (e) {
            var the = $(this),
                _src = the.data('origin-src'),
                _des = the.next('.describe').html();

            var lbPic = lbCon.find('img.pic');
            var lbDes = lbCon.find('.metas .text');


            lbPic.attr('src', _src);
            lbDes.html(_des);

            lbCon.addClass('on');
        });

        var closeBtn = lbCon.find('.close-btn');

        touch.on(closeBtn, 'tap', function () {
            lbCon.removeClass('on');
        });
    })();
});