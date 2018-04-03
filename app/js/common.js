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

    //lk_menu
    var navTrigger = document.querySelector('.nav-trigger');

    navTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.toggle('is-active');
        $(".personal-sitebar").slideToggle();
    }, false);

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
        $('.main-header__topline_nav').stop(true, true).slideToggle();



    });

    // form
    $('.form_style').styler({
        selectSearch: true
    });



    //animated
    $('.car_help').addClass('animated bounceInLeft');
    $('.main-serviced__img-car').addClass('animated bounceInRight');

});
