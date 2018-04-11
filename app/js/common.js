$(function() {
    //main_slider
    $('.main-slider__wrap').owlCarousel({
        loop: true,
        nav:true,
        items:1
    });
    //header scroll
    $(window).scroll(function () {
        var sc = $(window).scrollTop();
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

    });

    //fixed sitebar booking
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $(".booking_right_col ").addClass("fixed");
        }


        else {
            $(".booking_right_col").removeClass("fixed");
        }
    });

    $(window).scroll(function() {

        if ($(this).scrollTop() > 200 ) {
            $(".booking_right_col ").addClass("fixed");
        }

        else {
            $(".booking_right_col").removeClass("fixed");
        }



    });

    $(window).scroll(function() {

        if ($(this).scrollTop() > 2500 ) {
            $(".booking_right_col").removeClass("fixed");
        }
        if ($(window).width() < 1200) {
            $(".booking_right_col").removeClass("fixed");
        }


    });




    //mob menu
    $('.personal_link a').on('click', function() {


        $('.personal_link_inform').stop(true, true).slideToggle();
        return false;
    });

    //personal acount
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


//validate

var langs = {
    "an_error_has_occurred" : "An error has occurred",
    "auth_failed" : "Authorisation failed",
    "change_password_failed" : "Failed to change password",
    "close_btn" : "Close",
    "discount_code_incorrect" : "The discount code was entered incorrectly",
    "email_invalid" : "Invalid email",
    "email_phone_invalid" : "The field is not filled in correctly",
    "email_required" : "Enter email",
    "file_handling" : "File handling",
    "invalid_file_format" : "Invalid file format",
    "invalid_file_size" : "Invalid file size",
    "load_image_failed" : "Could not load image",
    "maxlen" : "Maximum length is {0} characters",
    "minlen" : "The minimum length is {0} characters",
    "name_required" : "Enter your name",
    "onlynumber" : "Only numbers are allowed",
    "passmax" : "Password must be up to {0} characters",
    "passmin" : "Password must be from {0} characters",
    "passwords_do_not_match" : "Passwords do not match",
    "passwords_not_match" : "Passwords do not match",
    "password_required" : "`Password` mandatory field",
    "phone_required" : "Enter phone number",
    "processing" : "Processing ...",
    "recovery_failed" : "Password recovery failed",
    "recover_pass_modal_title" : "Password recovery",
    "register_failed" : "Registration failed",
    "required" : "Please complete the field",
    "reset_failed" : "Password change failed",
    "reset_failed" : "Failed to change password",
    "text_required" : "Enter text",
    "update_profile_failed" : "Failed to update profile",
    "uploaded_progress" : "Uploaded:",
    "upload_media_failed" : "File upload failed"
};
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

function login(){
    var form = $('#login_form');

    if(form.length < 1){
        return false;
    };

    var lock = false,
        status = $("#status_login"),
        btn = form.find('input[type="submit"]');

    form.validate({
        submitHandler   : function(){
            if(!lock){
                form.find(".alert").text("").hide();

                $.ajax({
                    type        : "POST",
                    url         : form.attr("action"),
                    data        : form.serialize(),
                    dataType    : "json",
                    beforeSend  : function(request){
                        lock = true;
                        btn.attr('disabled', true);

                        status.hide();

                        status.removeClass('error');
                        status.removeClass('alert-danger');

                        status.addClass('alert-info');

                        status.text(langs.processing);
                        status.show();

                        return request.setRequestHeader('X-CSRF-Token', $("meta[name='csrf-token']").attr('content'));
                    },
                    success     : function(response){
                        status.hide();

                        status.removeClass('alert-info');

                        if(response.msg.length > 0){
                            status.text(response.msg);
                        };

                        if(response.status){
                            status.addClass('alert-success');
                            status.show();

                            form.trigger('reset');

                            window.location.href = '/account';

                            return false;
                        } else {
                            status.addClass('error');
                            status.addClass('alert-danger');

                            lock = false;
                            btn.attr('disabled', false);

                            if(response.errors){
                                $.each(response.errors, function (name, error) {
                                    form.find("#error_login_" + name).text(error).show();
                                });
                            };
                        };

                        if(response.msg.length < 1){
                            status.text(langs.auth_failed).show();
                        };

                        status.show();
                    },
                    error       : function(){
                        lock = false;
                        btn.attr('disabled', false);

                        status.hide();

                        status.removeClass('alert-info');

                        status.addClass('error');
                        status.addClass('alert-danger');

                        status.text(langs.auth_failed).show();
                    }
                });
            };

            return false;
        },
        onkeyup         : false,
        focusCleanup    : true,
        rules           : {
            'email' : {
                required    : true,
                email       : true
            },
            'password' : {
                required    : true,
                minlength   : 7,
                maxlength   : 20,
            }
        },
        messages        : {
            'email' : {
                required    : langs.email_required,
                email       : langs.email_invalid
            },
            'password' : {
                required    : langs.password_required,
                minlength   : jQuery.validator.format(langs.passmin),
                maxlength   : jQuery.validator.format(langs.passmax)
            }
        },
        errorPlacement  : function(error, element){
            var name = element.attr("name"),
                element2 = $('#error_login_' + name);

            element2.text(error.text()).show();

            element.unbind('click');

            element.bind('click', function(){
                element.unbind('click');

                element2.hide();
            });
        }
    });


};
login();



function register(){


    var form = $("#registration-form");

    if(form.length < 1){
        return false;
    };

    var lock = false,
        status = $("#status_register"),
        btn = form.find('input[type="submit"]');

    form.validate({
        submitHandler: function(){
            if(!lock){
                form.find(".alert").text("").hide();

                $.ajax({
                    type: "POST",
                    url: form.attr("action"),
                    data: form.serialize(),
                    dataType: "json",
                    beforeSend: function(request){
                        lock = true;
                        btn.attr('disabled', true);

                        status.hide();

                        status.removeClass('error');
                        status.removeClass('alert-danger');

                        status.addClass('alert-info');

                        status.text(langs.processing);
                        status.show();

                        return request.setRequestHeader('X-CSRF-Token', $("meta[name='csrf-token']").attr('content'));
                    },
                    success: function(response){
                        status.hide();

                        status.removeClass('alert-info');

                        if(response.msg.length > 0){
                            status.html(response.msg);
                        };

                        lock = false;
                        btn.attr('disabled', false);

                        if(response.status){
                            status.addClass('alert-success');
                            status.show();

                            form.trigger('reset');

                            return false;
                        } else {
                            status.addClass('error');
                            status.addClass('alert-danger');

                            if(response.errors){
                                $.each(response.errors, function (name, error) {
                                    form.find("#error_register_" + name).text(error).show();
                                });
                            };
                        };

                        if(response.msg.length < 1){
                            status.text(langs.register_failed).show();
                        };

                        status.show();
                    },
                    error: function(){
                        lock = false;
                        btn.attr('disabled', false);

                        status.hide();

                        status.removeClass('alert-info');

                        status.addClass('error');
                        status.addClass('alert-danger');

                        status.text(langs.register_failed).show();
                    }
                });
            };

            return false;
        },
        onkeyup: false,
        focusCleanup: true,
        ignore: [],
        rules : {

            'email' : {
                required    : true,
                email       : true
            },
            'source' : {
                required: true
            },

            'password' : {
                required    : true,
                minlength   : 7,
                maxlength   : 20,
            }

        },
        messages : {

            'email' : {
                required    : langs.email_required,
                email       : langs.email_invalid
            },

            'source' : {
                required    : langs.required
            },
            'password' : {
                required    : langs.password_required,
                minlength   : jQuery.validator.format(langs.passmin),
                maxlength   : jQuery.validator.format(langs.passmax)
            },

        },
        errorPlacement: function(error, element){
            var name = element.attr("name"),
                element2 = $('#error_register_' + name);

            element2.text(error.text()).show();

            element.unbind('click');

            element.bind('click', function(){
                element.unbind('click');

                element2.hide();
            });
        }
    });
};
register();

