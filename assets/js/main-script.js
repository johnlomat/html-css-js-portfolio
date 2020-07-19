$(document).ready(function() {
    $('nav > div > ul > li > a').click(function() {
        $('#navbarNav').removeClass('show');
        $('.burger').removeClass('active');
    })
    $('.burger').click(function() {
        $('.burger').toggleClass('active');
    })

    $('.content-2a > div > div:nth-child(even)').addClass('flex-row-reverse');
    
    //  Check if element is scrolled into view
    function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }
    //  If element is scrolled into view, fade it in
    $(window).scroll(function() {
        $('.content-2a > div > div:nth-child(odd) > div:nth-child(odd)').each(function() {
            if (isScrolledIntoView(this) === true) {
                $(this).addClass('fadeInLeft');
            }
        });
        $('.content-2a > div > div:nth-child(odd) > div:nth-child(even)').each(function() {
            if (isScrolledIntoView(this) === true) {
                $(this).addClass('fadeInRight');
            }
        });
    });
    //  Blurry Load Effect
    $('.navbar-brand > img').blurryLoad();
    $('.banner img').blurryLoad();
    $('.content-2a > div > div:nth-child(odd) img').blurryLoad();
    $('.content-2a > div > div:nth-child(even) img').blurryLoad();

    //  Media Queries
    //  Scroll Animations Mobile Devices
    if ($(window).width() <= 767) {
        $(window).scroll(function() {
            $('.content-2a > div > div:nth-child(even) > div:nth-child(odd)').each(function() {
                if (isScrolledIntoView(this) === true) {
                    $(this).addClass('fadeInLeft');
                }
            });
            $('.content-2a > div > div:nth-child(even) > div:nth-child(even)').each(function() {
                if (isScrolledIntoView(this) === true) {
                    $(this).addClass('fadeInRight');
                }
            });
            $('.content-2b > div > div:nth-child(odd) > div:nth-child(odd)').each(function() {
                if (isScrolledIntoView(this) === true) {
                    $(this).addClass('fadeInRight');
                }
            });
            $('.content-2b > div > div:nth-child(odd) > div:nth-child(even)').each(function() {
                if (isScrolledIntoView(this) === true) {
                    $(this).addClass('fadeInLeft');
                }
            });
            $('.content-2b > div > div:nth-child(even) > div:nth-child(even)').each(function() {
                if (isScrolledIntoView(this) === true) {
                    $(this).addClass('fadeInLeft');
                }
            });
            $('.content-2b > div > div:nth-child(even) > div:nth-child(odd)').each(function() {
                if (isScrolledIntoView(this) === true) {
                    $(this).addClass('fadeInRight');
                }
            });           
        });
    }else if ($(window).width() >= 767) {
        $(window).scroll(function() {
            $('.content-2a > div > div:nth-child(even) > div:nth-child(odd)').each(function() {
                if (isScrolledIntoView(this) === true) {
                    $(this).addClass('fadeInRight');
                }
            });
            $('.content-2a > div > div:nth-child(even) > div:nth-child(even)').each(function() {
                if (isScrolledIntoView(this) === true) {
                    $(this).addClass('fadeInLeft');
                }
            });
            $('.content-2b > div > div:nth-child(odd) > div:nth-child(odd)').each(function() {
                if (isScrolledIntoView(this) === true) {
                    $(this).addClass('fadeInLeft');
                }
            });
            $('.content-2b > div > div:nth-child(odd) > div:nth-child(even)').each(function() {
                if (isScrolledIntoView(this) === true) {
                    $(this).addClass('fadeInRight');
                }
            });
            $('.content-2b > div > div:nth-child(even) > div:nth-child(even)').each(function() {
                if (isScrolledIntoView(this) === true) {
                    $(this).addClass('fadeInRight');
                }
            });
            $('.content-2b > div > div:nth-child(even) > div:nth-child(odd)').each(function() {
                if (isScrolledIntoView(this) === true) {
                    $(this).addClass('fadeInLeft');
                }
            });
        });
    }

    if ($(window).width() <= 767) {  
        $('.content-2b > div > div').addClass('flex-column-reverse');
    }else if ($(window).width() >= 767) {
        $('.content-2b > div > div').removeClass('flex-column-reverse');
    }

    $(window).resize(function(){
        if ($(window).width() <= 767) {  
            $('.content-2b > div > div').addClass('flex-column-reverse');
        }else if ($(window).width() >= 767) {
            $('.content-2b > div > div').removeClass('flex-column-reverse');
        }      
    });

    //  AJAX Request
    $('#contact-form').submit(function(e) {
        e.preventDefault();
        var name = $('#name');
        var email = $('#email');
        var subject = $('#subject');
        var message = $('#message');
        var url = 'https://usebasin.com/f/d8282983945a.json';
        var data = $('#contact-form').serialize();
    
        if (name.val() == '' || email.val() == '' || subject.val() == '' || message.val() == '') {
            $('#form-status').text("Please fill out all field");
            $('#form-status').css('color','#F84545');
        }else {
            $.ajax({
                method: 'POST',
                url: url,
                data: data,
                datatype: 'json',
                success: function(data) {
                    $('#contact-form').get(0).reset();
                    $('#contact-form button').hide();
                    $('#form-status').text("Thanks! Your message has been sent");
                    $('#form-status').css('color','#20C98B');
                },
                error: function(data) {
                    $('#form-status').text('Error Sending Message');
                    $('#form-status').css('color','#F84545');
                }
            })   
        }
    });
});
