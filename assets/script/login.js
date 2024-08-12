// ECUT Login Scripts by https://mohamad-sh.ir
$(document).ready(function() {

    // phone next click
    $('.login-phone-btn').on('click', function() {
        let phoneInput = $('.login-phone-input');
        
        if (phoneInput.val().match(/^09\d{9}$/)) {
            $('.login-get-phone').slideUp();
            $('.login-get-otp').removeClass('d-none').slideDown();
            phoneInput.addClass('is-valid');
            phoneInput.removeClass('is-invalid');
        } else {
            phoneInput.addClass('is-invalid');
            phoneInput.removeClass('is-valid');
        }
    });
    
    $('.login-phone-input').on('change keypress', function(ev) {
        
        if (ev.type == 'keypress') {
            var key = ev.keyCode || ev.which;
            if (key == '13') { // Enter key
                $('.login-phone-input').click();
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

});