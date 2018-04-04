$(function() {
    //main_slider
    $('.main-slider__wrap').owlCarousel({
        loop: true,
        nav:true,
        items:1
    });
    //header scroll
    $(window).scroll(function () {
        var sc = $(window).scrollTop()
        if (sc > 80) {
            $(".main-header .main-header__topline , .text-header .main-header__topline").addClass("header-sroll");
        } else {
            $(".main-header .main-header__topline , .text-header .main-header__topline").removeClass("header-sroll");
        }
    });

    //popup
    $(".fancybox_text").fancybox({
        toolbar: false,
        protect: true,
        touch: false,
        smallBtn: true

    })
    //mob menu
    $('.menu-button').on('click', function() {

        $(this).toggleClass('active');
        $('.main-header__topline_nav').stop(true, true).slideToggle();
        return false;
    });
    // form
    $('.form_style').styler({
        selectSearch: true
    });
    //animated
    $('.car_help').addClass('animated bounceInLeft');
    $('.main-serviced__img-car').addClass('animated bounceInRight');
    // lk nav
    $('.nav-trigger').on('click', function() {

        $(this).toggleClass('is-active');
        $(".personal-sitebar").slideToggle();
    });
    //faq
    $('.accordion a').on('click', function() {

        $(this).toggleClass('active');
        $(this).next(".content").toggleClass('active');
    });
});





