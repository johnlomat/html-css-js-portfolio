$(document).ready(function() {
    $('nav > div > ul > li > a').click(function() {
        $('#navbarNav').removeClass('show');
        $('.burger').removeClass('active');
    })
    $('.burger').click(function() {
        $('.burger').toggleClass('active');
    })

    // Check if element is scrolled into view
    function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }
    // If element is scrolled into view, fade it in
    $(window).scroll(function() {
        $('.scroll-animations > div:nth-child(odd)').each(function() {
            if (isScrolledIntoView(this) === true) {
                $(this).addClass('fadeInLeft');
            }
        });
        $('.scroll-animations > div:nth-child(even)').each(function() {
            if (isScrolledIntoView(this) === true) {
                $(this).addClass('fadeInRight');
            }
        });
    });
    
    // AJAX Request

});
