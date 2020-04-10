(function ($) {
    "use strict";

    new WOW().init();


    /********* Counter Js FIXED **********/
    $('.statistic-counter').counterUp({
        delay: 10,
        time: 2000
    });

    /********* HEADER FIXED **********/

    $(window).on('scroll', function () {
        var fixheader = $("#header-fix");
        var scroll = $(window).scrollTop();
        if (scroll >= 80) {
            fixheader.addClass("active");
        } else {
            fixheader.removeClass("active");
        }
    });
    /*********** Popup JS ************/

    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    /****************** Screen Js ************/

    $("#owl-demo").owlCarousel({
        items: 4,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        pagination: true,
        navigation: false,
        navigationText: ["", ""],
        slideSpeed: 1000,
        autoPlay: true
    });


    /************* Scrool Js **************/


    $('.scrolling').on('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 75
        }, 1000);
        event.preventDefault();
    });




    /************** Testimonials Js ***************/

    $("#testimonial-slider").owlCarousel({
        items: 2,
        itemsDesktop: [1199, 2],
        itemsDesktopSmall: [979, 2],
        itemsTablet: [768, 1],
        itemsMobile: [600, 1],
        pagination: true,
        navigation: false,
        navigationText: ["", ""],
        slideSpeed: 1000,
        autoPlay: true
    });


    /********** Bg Maker Js **********/
    $('.background-image-maker').each(function () {
        var imgURL = $(this).next('.holder-image').find('img').attr('src');
        $(this).css('background-image', 'url(' + imgURL + ')');
    });

})(jQuery);
