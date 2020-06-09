$(document).ready(function(){
    $('nav > div > ul > li > a').click(function(){
        $('#navbarNav').removeClass('show');
        $('.burger').removeClass('active');
    })
    $('.burger').click(function(){
        $('.burger').toggleClass('active');
    })
});
