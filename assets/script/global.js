// ECUT Scripts by https://mohamad-sh.ir

// MEGAMENU ACTIVATOR
$('[data-megamenu]:not([data-megamenu=""])').each(function() {
    let target = $(this).attr('data-megamenu');
    
    $(this).hover(function() {
        $(target).addClass('nav-active');
    }, function(/*unhover*/) {

        if (!$(target).is(':hover')) {
            $(target).removeClass('nav-active');
        }
    });

    $(target).hover(function() {}, function(/*unhover*/) {
        $(target).removeClass('nav-active');
    });
});