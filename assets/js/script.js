/** Navbar Links **/

$('.logo').click(function () {
    $('html, body').animate(
        {
            scrollTop: $('#home').offset().top,
        },
        500
    );
});

$('.services-link').click(function () {
    $('html, body').animate(
        {
            scrollTop: $('#services').offset().top,
        },
        500
    );
});

$('.work-link').click(function () {
    $('html, body').animate(
        {
            scrollTop: $('#work').offset().top,
        },
        500
    );
});

$('.reference-link').click(function () {
    $('html, body').animate(
        {
            scrollTop: $('#reference').offset().top,
        },
        500
    );
});

$('.contact-link, .get-it-touch-button a').click(function () {
    $('html, body').animate(
        {
            scrollTop: $('#contact').offset().top,
        },
        500
    );
});

$('.nav-link').click(function () {
    $('.navbar-collapse').collapse('hide');
});

/** Testimonial Slider **/

$('.reference-carousel').owlCarousel({
    loop: true,
    margin: 0,
    responsive: {
        0: { items: 1 }
    },
});

/** Brands Slider **/

$('.brands-carousel').owlCarousel({
    loop: true,
    margin: 0,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 3 },
        1200: { items: 5 },
        1600: { items: 6 },
    },
    dots: false,
});
