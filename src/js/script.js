import { tns } from "tiny-slider";

/** Navbar Links **/

const navLinkElements = document.querySelectorAll(".navbar-nav .nav-link");

navLinkElements.forEach((navLinkElement) => {
  navLinkElement.addEventListener("click", () => {
    const navbarCollapseElement = document.querySelector(".navbar-collapse");
    const collapse = bootstrap.Collapse.getInstance(navbarCollapseElement);
    collapse?.hide();
  });
});

/** Scroll To Top **/

const scrollTopButtonElement = document.querySelector(".scroll-top-button");

if (scrollTopButtonElement) {
  const shouldReduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  const toggleScrollTopButton = () => {
    const isVisible = window.scrollY > 500;

    scrollTopButtonElement.classList.toggle("is-visible", isVisible);
    scrollTopButtonElement.setAttribute("aria-hidden", String(!isVisible));
    scrollTopButtonElement.tabIndex = isVisible ? 0 : -1;
  };

  scrollTopButtonElement.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion.matches ? "auto" : "smooth",
    });
  });

  toggleScrollTopButton();
  window.addEventListener("scroll", toggleScrollTopButton, { passive: true });
}

/** Section Reveal Animations **/

const animatedSectionElements = document.querySelectorAll(
  "#services, #process, #work, #results, #reference, #faq, #contact",
);

if (animatedSectionElements.length > 0) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("section-visible");
        sectionObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.18 },
  );

  animatedSectionElements.forEach((sectionElement) => {
    sectionObserver.observe(sectionElement);
  });
}

/** Results Animation **/

const resultsSection = document.querySelector("#results");

if (resultsSection) {
  const resultsObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) {
        return;
      }

      resultsSection.classList.add("results-visible");
      resultsObserver.unobserve(resultsSection);
    },
    { threshold: 0.35 },
  );

  resultsObserver.observe(resultsSection);
}

/** Testimonial Slider **/

const testimonialSlider = tns({
  container: ".reference-carousel",
  items: 1,
  slideBy: "page",
  autoplay: false,
  controls: false,
  mouseDrag: true,
  nav: true,
  navPosition: "bottom",
  rewind: false,
  swipeAngle: false,
  loop: false,
  speed: 400,
});

/** Brands Slider **/

const brandSlider = tns({
  container: ".brands-carousel",
  items: 2,
  autoplay: true,
  autoplayButtonOutput: false,
  autoplayHoverPause: false,
  autoplayResetOnVisibility: false,
  autoplayTimeout: 2500,
  controls: false,
  freezable: false,
  mouseDrag: true,
  nav: false,
  rewind: false,
  slideBy: 1,
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
    },
  },
});
