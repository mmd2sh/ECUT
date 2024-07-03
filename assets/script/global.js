// ECUT Scripts by https://mohamad-sh.ir

$(document).ready(function() {

    // MARK: MEGAMENU ACTIVATOR
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

    // MARK: initiate bootstrap tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // MARK: PRODUCT FAVORITE TOGGLE
    $('[class*=cta-item] [class*=eico-favorite]').on('click', function(ev) {
        var favBtn = $(this);
        ev.preventDefault();
        favBtn.toggleClass('eico-favorite eico-favorite-fill'); // <- comment this line when you using following functions 

        // functions for ajax
        function addFav() {
            favBtn.addClass('eico-favorite-fill');
            favBtn.removeClass('eico-favorite');
        }

        function remFav() {
            favBtn.removeClass('eico-favorite-fill');
            favBtn.addClass('eico-favorite');
        }

        this.blur();
    });
    
}); // doc ready end