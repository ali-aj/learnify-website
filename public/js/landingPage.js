(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

// const courses = [
//     { name: 'Web Design', image: '/img/cat-1.jpg', count: 51 },
//     { name: 'Graphic Design', image: '/img/cat-2.jpg', count: 49 },
//     { name: 'Video Editing', image: '/img/cat-3.jpg', count: 49 },
//     { name: 'Online Marketing', image: '/img/cat-4.jpg', count: 49 },
//     { name: 'Online Marketing', image: '/img/cat-4.jpg', count: 49 },
//   ];

// function createCourseHTML(course) {
//     return `
//       <div class="col-lg-6 col-md-12 wow zoomIn" data-wow-delay="0.3s">
//         <a class="position-relative d-block overflow-hidden" href="">
//           <img class="img-fluid" src="${course.image}" alt="">
//           <div class="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3" style="margin: 1px;">
//             <h5 class="m-0">${course.name}</h5>
//             <small class="text-primary">${course.count} Courses</small>
//           </div>
//         </a>
//       </div>
//     `;
//   }

//   const courseContainer = document.querySelector('.row.g-3');
//   courses.forEach(course => {
//     const courseHTML = createCourseHTML(course);
//     courseContainer.innerHTML += courseHTML;
//   });