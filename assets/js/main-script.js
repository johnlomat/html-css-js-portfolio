jQuery(document).ready(function ($) {
  $("nav > div > ul > li > a").click(function () {
    $("#navbarNav").removeClass("show");
    $(".burger").removeClass("active");
  });

  $(".burger").click(function () {
    $(this).toggleClass("active");
  });

  //  Check if element is scrolled into view
  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop(),
      docViewBottom = docViewTop + $(window).height(),
      elemTop = $(elem).offset().top,
      elemBottom = elemTop + $(elem).height();

    return elemBottom <= docViewBottom && elemTop >= docViewTop;
  }
  //  If element is scrolled into view, fade it in
  $(window).scroll(function () {
    $(".animate__animated").each(function () {
      if (isScrolledIntoView("#about") === true) {
        $("#about").addClass("animate__fadeInUp");
      }
      if (isScrolledIntoView("#development .animate__animated:nth-child(1)") === true) {
        $("#development .animate__animated:nth-child(1)").addClass("animate__fadeInUp");
      }
      if (isScrolledIntoView("#development .animate__animated:nth-child(2)") === true) {
        $("#development .animate__animated:nth-child(2)").addClass("animate__fadeInUp");
      }
      if (isScrolledIntoView("#contact .animate__animated") === true) {
        $("#contact .animate__animated").addClass("animate__fadeInUp");
      }
    });
  });

  function fillProjectsData() {
    $(".projects")
      .each(function () {})
      .hover(
        function () {
          $(this).find("h5").addClass("animate__fadeInDown");
          $(this).find("button").addClass("animate__fadeInUp");
        },
        function () {
          $(this).find("h5").removeClass("animate__fadeInDown");
          $(this).find("button").removeClass("animate__fadeInUp");
        }
      );

    //  Project Details
    $(".projects").each(function () {
      let projectDetail = $(this),
        project = projectDetail.find(".project-title").text(),
        description = projectDetail.find(".project-text").text(),
        type = projectDetail.find(".project-type").text(),
        scopeList = projectDetail.find(".scope-list").html().toString(),
        button = $(".detail--button");

      projectDetail.find(button).attr("data-project", project);
      projectDetail.find(button).attr("data-description", description);
      projectDetail.find(button).attr("data-type", type);
      projectDetail.find(button).attr("data-scope-list", scopeList);
    });
  }

  fillProjectsData();

  $("#ProjectDetails").on("show.bs.modal", function (event) {
    let modal = $(this),
      button = $(event.relatedTarget),
      project = button.data("project"),
      description = button.data("description"),
      screenshotLink = button.data("modal-content").screenshot_link,
      demoLink = button.data("modal-content").demo_link,
      type = button.data("type"),
      scopeList = button.data("scope-list"),
      techStack = button.data("modal-content").techStack,
      techStackTitle = button.data("modal-content").techStack;

    modal.find(".modal-title").text(project);
    modal.find(".modal-text").text(description);
    modal.find(".modal-type").text(type);
    modal.find(".modal-scope-list").text("");
    modal.find(".modal-scope-list").append(scopeList);

    if (screenshotLink) {
      modal.find(".modal-footer a:first-child").attr("href", screenshotLink);
      modal.find(".modal-footer a:first-child").show();
    } else {
      modal.find(".modal-footer a:first-child").hide();
    }

    if (demoLink) {
      modal.find(".modal-button").attr("href", demoLink);
      modal.find(".modal-button").show();
    } else {
      modal.find(".modal-button").hide();
    }

    $(".modal-body .tech-stack-wrapper").text("");

    $.each(techStack, function (key, value) {
      key++;

      $(".modal-body .tech-stack-wrapper").append('<div class="col-xl-2 col-lg-2 col-md-2 col-sm-2"><span class="tech-stack-' + key + '"></span></div>');

      let techStack = $(".tech-stack" + "-" + key);

      techStack.attr("style", value.logo);

      if (value == "") {
        techStack.css("height", "0");
      }

      if ($(window).outerWidth() <= 490) {
        if (key >= 5 && value != "") {
          techStack.css("margin-top", "10px");
        }
      }

      if ($(window).outerWidth() <= 330) {
        if (key >= 4 && value != "") {
          techStack.css("margin-top", "10px");
        }
      }

      $(window).resize(function () {
        if ($(window).outerWidth() <= 490) {
          if (key >= 5 && value != "") {
            techStack.css("margin-top", "10px");
          } else {
            techStack.css("margin-top", "");
          }
        } else if ($(window).outerWidth() >= 490) {
          if (key >= 5 && value != "") {
            techStack.css("margin-top", "");
          }
        }

        if ($(window).outerWidth() <= 330) {
          if (key >= 4 && value != "") {
            techStack.css("margin-top", "10px");
          } else {
            techStack.css("margin-top", "");
          }
        } else if ($(window).outerWidth() >= 490) {
          if (key >= 4 && value != "") {
            techStack.css("margin-top", "");
          }
        }
      });
    });

    $.each(techStackTitle, function (key, value) {
      key++;

      let techStackTitle = $(".tech-stack" + "-" + key);

      techStackTitle.attr("title", value.title);
    });
  });

  //  toastr options
  toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: "toast-bottom-center",
    preventDuplicates: true,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };

  //  Responsiveness
  $(document).ready(function () {
    let gallery = $(".gallery");

    if ($(window).outerWidth() <= 575) {
      gallery.removeClass("row");
      gallery.flickity({
        groupCells: 2,
      });
    } else if ($(window).outerWidth() >= 575) {
      gallery.addClass("row");
      gallery.flickity();
      gallery.flickity("destroy");
    }

    $(window).resize(function () {
      if ($(window).outerWidth() <= 575) {
        gallery.removeClass("row");
        gallery.flickity({
          groupCells: 2,
        });
      } else if ($(window).outerWidth() >= 575) {
        gallery.addClass("row");
        gallery.flickity();
        gallery.flickity("destroy");
      }
    });
  });

  let projectContainer = $(".infinite-scroll--section");
  let currentRecord = projectContainer.children().length;

  // Infinite Scroll Initialization
  projectContainer.infiniteScroll({
    path: function () {
      return `https://api.jsonbin.io/v3/b/65617b6712a5d376599e5e61`;
    },
    responseBody: "json",
    status: ".page-load-status",
    scrollThreshold: false,
    history: false,
    button: ".infinite-scroll--button",
    fetchOptions: {
      method: "GET",
      headers: {
        "X-Master-Key": "$2b$10$2FpDu/QcS/y2UDvOdExx1e9HroxD1TrpPMAHLQCB8WhdnoT3TB/zO",
      },
    },
  });

  // use element to turn HTML string into elements
  let proxyElem = document.createElement("div");
  let infScroll = projectContainer.data("infiniteScroll");

  projectContainer.on("load.infiniteScroll", function (event, body) {
    let records = body.record,
      recordPaginate = currentRecord * infScroll.loadCount,
      recordPaginateRange = recordPaginate + currentRecord,
      recordSlice = records.slice(recordPaginate, recordPaginateRange);

    if (recordSlice.length !== 0) {
      let records = recordSlice;

      var itemsHTML = records.map(getProjects).join("");

      proxyElem.innerHTML = itemsHTML;

      projectContainer.append(...proxyElem.children);
    } else {
      $(".infinite-scroll--button").hide();
      projectContainer.infiniteScroll("destroy");
    }

    fillProjectsData();
    lazyLoadInstance.update();
  });

  function getProjects({ title, description, type, scope_list_html, image: { optimized, full, alt_text }, modal_content }) {
    return `
      <div class="col-xl-4 col-lg-4 col-md-4 portfolio">
        <div class="project-thumbnail--container">
          <div class="projects overlay">
            <div>
              <h5 class="animate__animated animate__faster">${title}</h5>
              <button
                class="detail--button animate__animated animate__faster"
                type="button"
                data-toggle="modal"
                data-target="#ProjectDetails"
                data-modal-content='${JSON.stringify(modal_content)}'
              >
                Details
              </button>
              <div class="detail d-none">
                <h3 class="project-title">${title}</h3>
                <p class="project-text">${description}</p>
                <h6 class="project-type">${type}</h6>
                <ul class="scope-list">${scope_list_html}</ul>
              </div>
            </div>
          </div>
          <img class="lazy" src="${optimized}" data-src="${full}" alt="${alt_text}" width="840" height="495" />
        </div>
      </div>
    `;
  }

  //  AJAX Request
  $("#contact-form").submit(function (e) {
    e.preventDefault();
    let name = $("#name"),
      email = $("#email"),
      subject = $("#subject"),
      message = $("#message"),
      url = "https://usebasin.com/f/d8282983945a.json",
      data = $("#contact-form").serialize(),
      form = $("#contact-form"),
      button = $("#contact-form button");

    button.attr("disabled", true);
    button.text("");
    button.append('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Sending...');

    if (name.val() == "" || email.val() == "" || subject.val() == "" || message.val() == "") {
      toastr.warning("Please fill out all field");
      button.removeAttr("disabled");
      button.text("Submit");
    } else {
      $.ajax({
        method: "POST",
        url: url,
        data: data,
        datatype: "json",
        success: function (data) {
          form.get(0).reset();
          toastr.success("Thanks! Your message has been sent");
          button.removeAttr("disabled");
          button.text("Submit");
        },
        error: function (data) {
          toastr.error("Error sending message!");
          button.removeAttr("disabled");
          button.text("Submit");
        },
      });
    }
  });
});
