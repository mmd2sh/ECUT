// ECUT Login Scripts by https://mohamad-sh.ir
$(document).ready(function() {
    
    let loading = $('.login-loading');
    let phoneWrap = $('.login-get-phone');
    let otpWrap = $('.login-get-otp');
    let phoneInput = $('.login-phone-input'); 
    let otpInput = $('.login-otp-input');
    let otpResendBtn = $('.login-otp-resend-btn');
    let otpResendText = $('.login-otp-resend-text');
    let phoneNextBtn = $('.login-phone-btn'); 
    let otpNextBtn = $('.login-otp-btn'); 
    let otpPhone = $('.login-otp-phone');
    let otpSegmentInputs = $('.login-otp-segment-inputs input');
    let successWrap = $('.login-success-wrap')

    $('.header-login-btn').on('click', function() {
        setTimeout(function() {
            phoneInput.focus();
        }, 500);
    });

    // MARK: PHONE NEXT CLICK
    phoneNextBtn.on('click', function() {
        
        if (phoneInput.val().match(/^09\d{9}$/)) {
            loading.fadeIn();

            setTimeout(function() {

                loading.fadeOut();
                phoneWrap.slideUp();
                $('.login-get-otp').removeClass('d-none').slideDown();

                otpPhone.text(phoneInput.val());

                otpResendTimer();
                
                otpSegmentInputs.first().focus();
                phoneInput.addClass('is-valid');
                phoneInput.removeClass('is-invalid');

            }, 2000);

        } else {
            phoneInput.addClass('is-invalid');
            phoneInput.removeClass('is-valid');
            phoneInput.focus();
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

    $('.login-change-phone-btn').on('click', function() {
        otpWrap.slideUp();
        phoneWrap.slideDown();
        phoneInput.focus();
    });

    // otp resend timer
    function otpResendTimer() {
        let ticker;
        let timeInSecs = 2 * 60;
        ticker = setInterval(function() {
            let secs = timeInSecs;

            if (secs > 0) {
                timeInSecs--;
            }

            let mins = Math.floor(secs/60);
            secs %= 60;
            let pretty = ( (mins < 10) ? "0" : "" ) + mins + ":" + ( (secs < 10) ? "0" : "" ) + secs;
            $('.login-otp-resend-counter').text(pretty);

            if (mins <= 0 && secs <= 0){
                otpResendText.hide();
                otpResendBtn.show();

                clearInterval(ticker);
            }
        }, 1000);
    };
    
    otpResendBtn.on('click', function() {
        $(this).hide();
        otpResendText.show();
        otpResendTimer();
    });

    otpNextBtn.on('click', function() {

        let filterEmpty = otpSegmentInputs.filter((_, e) => e.value.trim() == '');

        if (filterEmpty.length > 0) {
            filterEmpty.addClass('is-invalid');
        } else {
            otpSegmentInputs.removeClass('is-invalid');
            otpWrap.slideUp();
            successWrap.slideDown();

            $('#LoginCanvas .offcanvas-title').hide();
            $('.offcanvas-success-title').show();
        }
        
    });

    $('.login-go-details-btn').on('click', function() {
        successWrap.slideUp();
        $('.login-details-form').slideDown();

        $('#LoginCanvas .offcanvas-title').hide();
        $('.offcanvas-details-form-title').show();
    });
});