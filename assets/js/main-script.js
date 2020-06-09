$(document).ready(function(){
    $('nav > div > ul > li > a').click(function(){
        $('#navbarNav').removeClass('show');
        $('.burger').toggleClass('active');
    })
    $('.burger').click(function(){
        $('.burger').toggleClass('active');
    })
});
