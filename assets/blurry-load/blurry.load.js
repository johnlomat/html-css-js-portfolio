(function ($) {
    $.fn.blurryLoad = function (options) {
        var parentContainer = $(this).parent();
        var imageContainer = $(this);
        var imgLarge = new Image();
        
        imgLarge.src = $(this).attr('data-large');
        $(window).bind("load", function() { 
             var timeout = setTimeout(function() {
                   imageContainer.hide();
                   parentContainer.append(imgLarge);
             }, 1500);
             var timeout = setTimeout(function() {
                   imageContainer.hide();
                   parentContainer.append(imgLarge);
             }, 2000);
             var timeout = setTimeout(function() {
                   imageContainer.hide();
                   parentContainer.append(imgLarge);
             }, 2500);
             var timeout = setTimeout(function() {
                   imageContainer.hide();
                   parentContainer.append(imgLarge);
             }, 3000);
        });
    };
}(jQuery));
