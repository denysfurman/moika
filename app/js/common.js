$(function() {


    $('.main-slider__wrap').owlCarousel({
        loop: true,
        nav:true,
        items:1
    });



    $('.menu-button').on('click', function() {

        $(this).toggleClass('active');
        $('.main-header__topline_nav').stop(true).slideToggle();


    });



    //animated
    $('.car_help').addClass('animated bounceInLeft');
    $('.main-serviced__img-car').addClass('animated bounceInRight');

});
