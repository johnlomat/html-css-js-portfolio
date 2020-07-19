(function ($) {
    $.fn.blurryLoad = function (options) {
        var parentContainer = $(this).parent();
        var imageContainer = $(this);
        var imgLarge = new Image();
        
        imgLarge.src = $(this).attr('data-large');
        imgLarge.onload = function () {
            imageContainer.hide()
            parentContainer.append(imgLarge);
        };
    };
}(jQuery));
