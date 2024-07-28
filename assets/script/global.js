// ECUT Scripts by https://mohamad-sh.ir

$(document).ready(function() {
    // MARK: SWIPER INIT BY ATTRIBUTE
    $('.swiper[swiper]').each(function() {
        try {
            let options = $(this).attr('swiper');
            eval('options=' + options);
            new Swiper(this, options);
        } catch (err) {
            console.error('Check swiper options', err);
        }
    });

    // MARK: MEGAMENU ACTIVATOR
    $('[data-megamenu]:not([data-megamenu=""])').each(function() {
        let navLink = this;
        let target = $(navLink).attr('data-megamenu');
        
        $(navLink).hover(function() {
            $(navLink).addClass('nav-active');
            $(target).addClass('nav-active');
        }, function(/*unhover*/) {

            if (!$(target).is(':hover')) {
                $(navLink).removeClass('nav-active');
                $(target).removeClass('nav-active');
            }
        });

        $(target).hover(function() {}, function(/*unhover*/) {
            $(navLink).removeClass('nav-active');
            $(target).removeClass('nav-active');
            $('.category-slider-item').removeClass('active');
            $('.megamenu-products').addClass('active');
        });
    });

    // MARK: SEARCH TOGGLE
    $('.header-search-btn').on('click', function() {
        let wrap = $('.header-search-wrap');
        wrap.toggleClass('active');
        $(this).toggleClass('active', wrap.is('.active'));
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

    // MARK: CATEGORY SLIDER
    $('[category-slider]').each(function(i, link) {
        let name = $(link).attr('category-slider');
        let products = $('.megamenu-products');
        
        if (name != '') {
            $(link).on('click', function(ev) {
                ev.preventDefault();
                var slider = $(`[category-slider-item=${name}]`);
                slider.toggleClass('active');
    
                if (slider.is('.active')) {
                    slider.siblings().removeClass('active');
                }

                if ($('.category-slider-item').is('.active')) {
                    products.removeClass('active');
                } else {
                    products.addClass('active');
                }
            });
        }
    });
    // initiate sliders
    $('.category-slider-item > .swiper').each(function() {
        new Swiper(this, {
            autoHeight: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            }
        });
    });
    
}); // doc ready end