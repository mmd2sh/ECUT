// ECUT Login Scripts by https://mohamad-sh.ir
$(document).ready(function() {

    let loading = $('.login-loading');
    let otpWrap = $('.login-otp-wrap');
    let loginSubmit = $('.login-submit');
    let showPass = $('.login-show-pass');
    let otpResend = $('.login-otp-resend');
    let toOtpBtn = $('.login-with-otp-btn');
    let mobileWrap = $('.login-mobile-wrap');
    let passWrap = $('.login-password-wrap');
    let registerWrap = $('.form-container-4');
    let toPassBtn = $('.login-with-pass-btn');
    let otpInput = $('.login-otp-input');
    let changePhoneBtn = $('.login-otp-change-phone');
    let otpSegmentInputs = $('.login-otp-segment-inputs input');

    let phoneInput = $('.login-phone-input'); 
    let phoneNextBtn = $('.login-phone-btn'); 
    let otpNextBtn = $('.login-otp-btn'); 

    // MARK: PHONE NEXT CLICK
    phoneNextBtn.on('click', function() {
        
        if (phoneInput.val().match(/^09\d{9}$/)) {
            loading.fadeIn();

            setTimeout(function() {
                loading.fadeOut();
            }, 2000);

            $('.login-get-phone').slideUp();
            $('.login-get-otp').removeClass('d-none').slideDown();
            otpSegmentInputs.first().focus();
            phoneInput.addClass('is-valid');
            phoneInput.removeClass('is-invalid');
        } else {
            phoneInput.addClass('is-invalid');
            phoneInput.removeClass('is-valid');
        }
    });

    // MARK: PHONE INPUT VALIDATION
    phoneInput.on('change keypress', function(ev) {
        
        if (ev.type == 'keypress') {

            var key = ev.keyCode || ev.which;
            if (key == 13) { // Enter key
                $('.login-phone-btn').click();
            }
        } else {
            
            if (this.value.match(/^09\d{9}$/)) {
                $(this).addClass('is-valid');
                $(this).removeClass('is-invalid');
            } else {
                $(this).addClass('is-invalid');
                $(this).removeClass('is-valid');
            }
        }
    });

    showPass.on('click', function(ev) {
        ev.preventDefault();
        $(this).toggleClass('active');
        $('input', passWrap).attr('type', function(_, type) {
            return type == 'text' ? 'password' : 'text';
        });
    });

    // otp segmented inputs
    otpSegmentInputs.on('input change keydown keyup keypress click paste', function(ev) {
        var inp = $(this);
        var key = ev.charCode || ev.keyCode;

        if (key == 8 && ev.type == 'keydown') { // backspace key
            inp.val('');
            inp.prev().select().focus();
            ev.preventDefault();
        }

        if (key == 13 && ev.type == 'keydown') { // enter key
            otpNextBtn.click();
            ev.preventDefault();
        }

        if (ev.type == 'keyup') {
            if (key == 39) { // right arrow
                inp.next().select().focus();

            } else if (key == 37) { // left arrow
                inp.prev().select().focus();
            }
        }

        if (ev.type == 'input' && this.value.length > 0 && key != 37 && key != 39) {
            inp.next().select().focus();
        }

        if (ev.type == 'click') {
            inp.select();
        }

        if (ev.type != 'keydown') {
            otpInput.each(function () {
                $(this).val(function () {
                    return otpSegmentInputs.map(function () {
                        return this.value;
                    }).get().join('');
                });
            });
        }

        if (ev.type == 'keypress') {
            if (key >= 48 && key <= 57 || // Number keys
                key >= 65 && key <= 90 || // Letter keys
                key >= 186 && key <= 222) // Punctuation marks
            {
                inp.val(ev.key);
                inp.next().select().focus();
            }
        }

        if (ev.type == 'paste') { // auto split value to next inputs
            var text = (ev.originalEvent || ev).clipboardData.getData('text/plain');

            if (typeof text == 'string') {
                var next = inp;
                var split = text.split('').filter(x => x.trim() != '');

                split.map(function(t) {
                    next.val(t);
                    next = next.next().select().focus();
                });
            }
        }

        otpInput.change();
    }); // otp segment ens

    otpNextBtn.on('click', function() {
        
    });

});