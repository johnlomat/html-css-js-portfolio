$(document).ready(function() {
    $('nav > div > ul > li > a').click(function() {
        $('#navbarNav').removeClass('show');
        $('.burger').removeClass('active');
    })
    $('.burger').click(function() {
        $('.burger').toggleClass('active');
    })

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
        $('.animated').each(function() {
            if (isScrolledIntoView(this) === true) {
                $(this).addClass('fadeInUp');
            }
        });
    });

    //  Blurry Load Effect
    setTimeout(function () {
        $('.lazy-load').each(function () {
            var imageSmall = $(this)
            var imgLarge = imageSmall.data('large')
            $(imageSmall).attr('src', imgLarge)
        })
    }, 2500)

    //  Project Details
    $('.projects').each(function () {
        var projectDetail = $(this)
        var project = projectDetail.find('.project-title').text()
        var description = projectDetail.find('.project-text').text()
        
        projectDetail.find('.detail--button').attr('data-project',project)
        projectDetail.find('.detail--button').attr('data-description',description)
        
    })
    $('#ProjectDetails').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget)
        var project = button.data('project')
        var description = button.data('description')
        var link = button.data('link')

        var modal = $(this)
        modal.find('.modal-title').text(project)
        modal.find('.modal-text').text(description)
        modal.find('.modal-button').attr('href',link)
    })

    //  toastr options
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    //  Responsiveness
    if ($(window).width() <= 559) {
        $('.gallery').removeClass('row')
        $('.gallery').flickity({
            wrapAround: true
        })
    }else if ($(window).width() >= 559) {
        $('.gallery').addClass('row')
    }

    $(window).resize(function(){
        if ($(window).width() <= 559) {  
            $('.gallery').removeClass('row')
            $('.gallery').flickity({
                wrapAround: true
            })
        }else if ($(window).width() >= 559) {
            $('.gallery').addClass('row')
            $('.gallery').flickity('destroy')
        }      
    })

    //  AJAX Request
    $('#contact-form').submit(function(e) {
        e.preventDefault()
        var name = $('#name')
        var email = $('#email')
        var subject = $('#subject')
        var message = $('#message')
        var url = 'https://usebasin.com/f/d8282983945a.json'
        var data = $('#contact-form').serialize()

        $('#contact-form button').attr('disabled',true)
        $('#contact-form button').text('')
        $('#contact-form button').append(
            '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Sending...'
        )
    
        if (name.val() == '' || email.val() == '' || subject.val() == '' || message.val() == '') {
            toastr.warning('Please fill out all field')
            $('#contact-form button').removeAttr('disabled')
            $('#contact-form button').text('Submit')
        }else {
            $.ajax({
                method: 'POST',
                url: url,
                data: data,
                datatype: 'json',
                success: function(data) {
                    $('#contact-form').get(0).reset()
                    toastr.success('Thanks! Your message has been sent')
                    $('#contact-form button').removeAttr('disabled')
                    $('#contact-form button').text('Submit')
                },
                error: function(data) {   
                    toastr.error('Error sending message!')
                    $('#contact-form button').removeAttr('disabled')
                    $('#contact-form button').text('Submit')
                }
            })   
        }
    })
})