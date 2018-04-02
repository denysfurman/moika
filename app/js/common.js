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

    //faq
    const items = document.querySelectorAll(".accordion a");

    function toggleAccordion(){
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('active');
    }

    items.forEach(item => item.addEventListener('click', toggleAccordion));


    //mob menu
    $('.menu-button').on('click', function() {

        $(this).toggleClass('active');
        $('.main-header__topline_nav').stop(true).slideToggle();
        return false;


    });

    // form
    $('.form_style').styler({
        selectSearch: true
    });



    //animated
    $('.car_help').addClass('animated bounceInLeft');
    $('.main-serviced__img-car').addClass('animated bounceInRight');

});
