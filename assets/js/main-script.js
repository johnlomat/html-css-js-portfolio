jQuery(document).ready(function($) {
    $('nav > div > ul > li > a').click(function() {
        $('#navbarNav').removeClass('show')
        $('.burger').removeClass('active')
    })
    
    $('.burger').click(function() {
        $(this).toggleClass('active')
    })

    //  Check if element is scrolled into view
    function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop(),
            docViewBottom = docViewTop + $(window).height(),
            elemTop = $(elem).offset().top,
            elemBottom = elemTop + $(elem).height()

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop))
    }
    //  If element is scrolled into view, fade it in
    $(window).scroll(function() {
        $('.animate__animated').each(function() {
            if (isScrolledIntoView('#about') === true) {
                $('#about').addClass('animate__fadeInUp')
            }
            if (isScrolledIntoView('#development .animate__animated:nth-child(1)') === true) {
                $('#development .animate__animated:nth-child(1)').addClass('animate__fadeInUp')
            }
            if (isScrolledIntoView('#development .animate__animated:nth-child(2)') === true) {
                $('#development .animate__animated:nth-child(2)').addClass('animate__fadeInUp')
            }            
            if (isScrolledIntoView('#contact .animate__animated') === true) {
                $('#contact .animate__animated').addClass('animate__fadeInUp')
            }
        })
    })

    function fillProjectsData() {
        $('.projects').each(function() {}).hover(function() {
            $(this).find('h5').addClass('animate__fadeInDown')
            $(this).find('button').addClass('animate__fadeInUp')
        }, function() {
            $(this).find('h5').removeClass('animate__fadeInDown')
            $(this).find('button').removeClass('animate__fadeInUp')
        })
    
        //  Project Details
        $('.projects').each(function() {
            let projectDetail = $(this),
                project = projectDetail.find('.project-title').text(),
                description = projectDetail.find('.project-text').text(),
                type = projectDetail.find('.project-type').text(),
                scopeList = projectDetail.find('.scope-list').html().toString(),
                button = $('.detail--button')
    
            projectDetail.find(button).attr('data-project', project)
            projectDetail.find(button).attr('data-description', description)
            projectDetail.find(button).attr('data-type', type)
            projectDetail.find(button).attr('data-scope-list', scopeList)
        })
    }

    fillProjectsData()

    $('#ProjectDetails').on('show.bs.modal', function(event) {
        let modal = $(this),
            button = $(event.relatedTarget),
            project = button.data('project'),
            description = button.data('description'),
            screenshotLink = button.data('modal-content').screenshotLink,
            demoLink = button.data('modal-content').demoLink,
            type = button.data('type'),
            scopeList = button.data('scope-list'),
            techStack = button.data('modal-content').techStack,
            techStackTitle = button.data('modal-content').techStack
        
        modal.find('.modal-title').text(project)
        modal.find('.modal-text').text(description)
        modal.find('.modal-type').text(type)
        modal.find('.modal-footer a:first-child').attr('href', screenshotLink)
        modal.find('.modal-button').attr('href', demoLink)
        modal.find('.modal-scope-list').text('')
        modal.find('.modal-scope-list').append(scopeList)

        $('.modal-body .tech-stack-wrapper').text('')

        $.each(techStack, function(key, value) {
            key++

            $('.modal-body .tech-stack-wrapper').append('<div class="col-xl-2 col-lg-2 col-md-2 col-sm-2"><span class="tech-stack-' + key + '"></span></div>')

            let techStack = $('.tech-stack' + '-' + key)

            techStack.attr('style', value.logo)

            if (value == '') {
                techStack.css('height','0')
            }

            if ($(window).outerWidth() <= 490) {
                if (key >= 5 && value != '') {
                    techStack.css('margin-top','10px')
                }
            }
            
            if ($(window).outerWidth() <= 330) {
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

                if ($(window).outerWidth() <= 330) {
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

        $.each(techStackTitle, function(key, value) {
            key++

            let techStackTitle = $('.tech-stack' + '-' + key)

            techStackTitle.attr('title', value.title)
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
    $(document).ready(function() {
        let gallery = $('.gallery')

        if ($(window).outerWidth() <= 575) {   
            gallery.removeClass('row')
            gallery.flickity({
                groupCells: 2
            })
        }else if ($(window).outerWidth() >= 575) {   
            gallery.addClass('row')
            gallery.flickity()
            gallery.flickity('destroy')
        }
    
        $(window).resize(function() {  
            if ($(window).outerWidth() <= 575) {
                gallery.removeClass('row')
                gallery.flickity({
                    groupCells: 2
                })
            }else if ($(window).outerWidth() >= 575) {
                gallery.addClass('row')
                gallery.flickity()
                gallery.flickity('destroy')
            }
        })
    })

    // Infinite Scroll Initialization
    $('.infinite-scroll--section').infiniteScroll({
        // options
        path: loadMoreProjects,
        append: '.portfolio',
        button: '.infinite-scroll--button',
        status: '.page-load-status',
        scrollThreshold: false,
        loadOnScroll: false,
        history: false,
    })

    function loadMoreProjects () {
        const nextPages = [
            '2',
            '3',
        ];

        let slug = nextPages[ this.loadCount ];

        if ( slug ) return '/projects/page/' + nextPages[ this.loadCount ] + '.html';   
    }

    $('.infinite-scroll--section').on('DOMSubtreeModified', function() {
        fillProjectsData()
        lazyLoadInstance.update()
    })

    //  AJAX Request
    $('#contact-form').submit(function(e) {
        e.preventDefault()
        let name = $('#name'),
            email = $('#email'),
            subject = $('#subject'),
            message = $('#message'),
            url = 'https://usebasin.com/f/d8282983945a.json',
            data = $('#contact-form').serialize(),
            form = $('#contact-form'),
            button = $('#contact-form button')

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