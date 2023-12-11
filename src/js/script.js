import {tns} from 'tiny-slider';

/** Navbar Links **/

function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    const scrollTop = element.offsetTop;

    window.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
    });
}

document.querySelector('.logo').addEventListener('click', () => {
    scrollToElement('home');
});

document.querySelector('.services-link').addEventListener('click', () => {
    scrollToElement('services');
});

document.querySelector('.work-link').addEventListener('click', () => {
    scrollToElement('work');
});

document.querySelector('.reference-link').addEventListener('click', () => {
    scrollToElement('reference');
});

document.querySelector('.contact-link').addEventListener('click', () => {
    scrollToElement('contact');
});

document.querySelector('.get-it-touch-button a').addEventListener('click', () => {
    scrollToElement('contact');
});

const navLinkElements = document.querySelectorAll('.nav-link');

navLinkElements.forEach(navLinkElement => {
    navLinkElement.addEventListener('click', () => {
        const navbarCollapseElement = document.querySelector('.navbar-collapse');
        const collapse = bootstrap.Collapse.getInstance(navbarCollapseElement);
        collapse?.hide();
    });
});

/** Testimonial Slider **/

const testimonialSlider = tns({
    container: '.reference-carousel',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    mouseDrag: true,
    nav: true,
    navPosition: 'bottom',
    rewind: false,
    swipeAngle: false,
    loop: false,
    speed: 400,
});

/** Brands Slider **/

const brandSlider = tns({
    container: '.brands-carousel',
    items: 2,
    autoplay: true,
    autoplayButtonOutput: false,
    controls: false,
    mouseDrag: true,
    nav: false,
    rewind: false,
    swipeAngle: false,
    loop: true,
    speed: 400,
    responsive: {
        576: {
            items: 3,
        },
        768: {
            items: 4,
        },
        992: {
            items: 5,
        }
    },
});