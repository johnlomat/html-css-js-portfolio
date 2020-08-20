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
    setTimeout(function() {
        $('.lazy-load').each(function() {
            var imageSmall = $(this)
            var imgLarge = imageSmall.data('large')
            
            imageSmall.attr('src', imgLarge)
            imageSmall.removeClass()
        })
    }, 2500)

    //  Project Details
    $('.projects').each(function() {
        var projectDetail = $(this)
        var project = projectDetail.find('.project-title').text()
        var description = projectDetail.find('.project-text').text()
        var type = projectDetail.find('.project-type').text()
        var scopeList = projectDetail.find('.scope-list').html().toString()
               
        projectDetail.find('.detail--button').attr('data-project', project)
        projectDetail.find('.detail--button').attr('data-description', description)
        projectDetail.find('.detail--button').attr('data-type', type)
        projectDetail.find('.detail--button').attr('data-scope-list', scopeList)
    })

    $('#ProjectDetails').on('show.bs.modal', function(event) {
        var modal = $(this)
        var button = $(event.relatedTarget)
        var project = button.data('project')
        var description = button.data('description')
        var link = button.data('link')
        var type = button.data('type')
        var scopeList = button.data('scope-list')
        var techStack = [
            button.data('tech-1'),
            button.data('tech-2'),
            button.data('tech-3'),
            button.data('tech-4'),
            button.data('tech-5'),
            button.data('tech-6'),
        ]
        
        modal.find('.modal-title').text(project)
        modal.find('.modal-text').text(description)
        modal.find('.modal-type').text(type)
        modal.find('.modal-button').attr('href',link)
        modal.find('.modal-scope-list').text('')
        modal.find('.modal-scope-list').append(scopeList)

        $.each(techStack, function(key, value) {
            key++
            var techStack = $('.tech-stack' + '-' + key)

            techStack.attr('style', value)

            if (value == '') {
                techStack.css('height','0')
            }

            if ($(window).outerWidth() <= 490) {
                if (key >= 5 && value != '') {
                    techStack.css('margin-top','10px')
                }
            }
            
            if ($(window).outerWidth() <= 340) {
                if (key >= 4 && value != '') {
                    techStack.css('margin-top','10px')
                }
            }

            $(window).resize(function() {
                if ($(window).outerWidth() <= 490) {
                    if (key >= 5 && value != '') {
                        techStack.css('margin-top','10px')
                    }else {
                        techStack.css('margin-top','')
                    }
                }else if ($(window).outerWidth() >= 490) {
                    if (key >= 5 && value != '') {
                        techStack.css('margin-top','')
                    }
                }

                if ($(window).outerWidth() <= 340) {
                    if (key >= 4 && value != '') {
                        techStack.css('margin-top','10px')
                    }else {
                        techStack.css('margin-top','')
                    }
                }else if ($(window).outerWidth() >= 490) {
                    if (key >= 4 && value != '') {
                        techStack.css('margin-top','')
                    }                 
                }
            })
        })
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
    if ($(window).outerWidth() <= 575) {
        $('.gallery').removeClass('row')
        $('.gallery').flickity({
            wrapAround: true
        })
    }else if ($(window).outerWidth() >= 575) {
        $('.gallery').addClass('row')
    }

    $(window).resize(function() {
        if ($(window).outerWidth() <= 575) {
            $('.gallery').removeClass('row')
            $('.gallery').flickity({
                wrapAround: true
            })
        }else if ($(window).outerWidth() >= 575) {
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
        var form = $('#contact-form')
        var button = $('#contact-form button')

        button.attr('disabled',true)
        button.text('')
        button.append(
            '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Sending...'
        )
    
        if (name.val() == '' || email.val() == '' || subject.val() == '' || message.val() == '') {
            toastr.warning('Please fill out all field')
            button.removeAttr('disabled')
            button.text('Submit')
        }else {
            $.ajax({
                method: 'POST',
                url: url,
                data: data,
                datatype: 'json',
                success: function(data) {
                    form.get(0).reset()
                    toastr.success('Thanks! Your message has been sent')
                    button.removeAttr('disabled')
                    button.text('Submit')
                },
                error: function(data) {   
                    toastr.error('Error sending message!')
                    button.removeAttr('disabled')
                    button.text('Submit')
                }
            })   
        }
    })
})
