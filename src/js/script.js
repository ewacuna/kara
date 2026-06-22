import { tns } from "tiny-slider";

/** Hero Canvas **/

const heroCanvasElement = document.querySelector(".hero-canvas");

if (heroCanvasElement) {
  const heroCanvasContext = heroCanvasElement.getContext("2d");
  const shouldReduceHeroMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  const heroPalette = {
    glow: "rgba(92, 151, 211, 0.45)",
    line: "rgba(152, 180, 238, 0.3)",
    point: "rgba(229, 236, 255, 0.72)",
    accent: "rgba(193, 155, 224, 0.34)",
  };
  let heroAnimationFrame;
  let heroCanvasWidth = 0;
  let heroCanvasHeight = 0;
  let heroPixelRatio = 1;

  const resizeHeroCanvas = () => {
    const { width, height } = heroCanvasElement.getBoundingClientRect();

    heroPixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    heroCanvasWidth = Math.floor(width);
    heroCanvasHeight = Math.floor(height);
    heroCanvasElement.width = Math.floor(heroCanvasWidth * heroPixelRatio);
    heroCanvasElement.height = Math.floor(heroCanvasHeight * heroPixelRatio);
    heroCanvasContext.setTransform(
      heroPixelRatio,
      0,
      0,
      heroPixelRatio,
      0,
      0,
    );
  };

  const getWavePoint = (wave, progress, speed) => {
    const x =
      progress * heroCanvasWidth +
      Math.sin(progress * Math.PI * 2 + speed + wave.phase) * wave.drift;
    const y =
      heroCanvasHeight * wave.base +
      Math.sin(progress * Math.PI * 2 * wave.frequency + speed + wave.phase) *
        wave.amplitude +
      Math.cos(progress * Math.PI * 3 + speed * 0.72 + wave.phase) *
        wave.secondaryAmplitude;

    return { x, y };
  };

  const drawHeroCanvas = (time = 0) => {
    const speed = shouldReduceHeroMotion.matches ? 0 : time * 0.00028;
    const waves = [
      {
        amplitude: heroCanvasHeight * 0.07,
        base: 0.56,
        drift: heroCanvasWidth * 0.025,
        frequency: 1.45,
        phase: 0,
        secondaryAmplitude: heroCanvasHeight * 0.025,
      },
      {
        amplitude: heroCanvasHeight * 0.06,
        base: 0.66,
        drift: heroCanvasWidth * 0.02,
        frequency: 1.18,
        phase: 1.8,
        secondaryAmplitude: heroCanvasHeight * 0.032,
      },
      {
        amplitude: heroCanvasHeight * 0.052,
        base: 0.75,
        drift: heroCanvasWidth * 0.03,
        frequency: 1.62,
        phase: 3.4,
        secondaryAmplitude: heroCanvasHeight * 0.02,
      },
      {
        amplitude: heroCanvasHeight * 0.042,
        base: 0.84,
        drift: heroCanvasWidth * 0.018,
        frequency: 1.05,
        phase: 5.1,
        secondaryAmplitude: heroCanvasHeight * 0.026,
      },
    ];

    heroCanvasContext.clearRect(0, 0, heroCanvasWidth, heroCanvasHeight);

    const lightSweep = heroCanvasContext.createLinearGradient(
      0,
      heroCanvasHeight,
      heroCanvasWidth * 0.68,
      heroCanvasHeight * 0.28,
    );
    lightSweep.addColorStop(0, heroPalette.glow);
    lightSweep.addColorStop(0.42, "rgba(62, 110, 179, 0.16)");
    lightSweep.addColorStop(1, "rgba(62, 110, 179, 0)");
    heroCanvasContext.fillStyle = lightSweep;
    heroCanvasContext.fillRect(0, 0, heroCanvasWidth, heroCanvasHeight);

    waves.forEach((wave, waveIndex) => {
      const segments = 84;
      const particleCount = 5;
      const opacity = 0.18 + waveIndex * 0.08;
      const lineGradient = heroCanvasContext.createLinearGradient(
        0,
        0,
        heroCanvasWidth,
        0,
      );

      lineGradient.addColorStop(0, "rgba(152, 180, 238, 0)");
      lineGradient.addColorStop(0.28, heroPalette.line.replace("0.3", String(opacity)));
      lineGradient.addColorStop(0.7, heroPalette.accent);
      lineGradient.addColorStop(1, "rgba(152, 180, 238, 0)");
      heroCanvasContext.beginPath();

      for (let segment = 0; segment <= segments; segment += 1) {
        const progress = segment / segments;
        const point = getWavePoint(wave, progress, speed);

        if (segment === 0) {
          heroCanvasContext.moveTo(point.x, point.y);
        } else {
          heroCanvasContext.lineTo(point.x, point.y);
        }
      }

      heroCanvasContext.strokeStyle = lineGradient;
      heroCanvasContext.lineWidth = 1.4 + waveIndex * 0.35;
      heroCanvasContext.stroke();

      for (let particle = 0; particle < particleCount; particle += 1) {
        const progress =
          (speed * (0.08 + waveIndex * 0.012) + particle / particleCount) % 1;
        const point = getWavePoint(wave, progress, speed);
        const pulse = 0.62 + Math.sin(speed * 4 + particle + waveIndex) * 0.22;
        const radius = 2.4 + waveIndex * 0.42;

        heroCanvasContext.beginPath();
        heroCanvasContext.fillStyle = heroPalette.point.replace(
          "0.72",
          String(0.42 + pulse * 0.25),
        );
        heroCanvasContext.arc(point.x, point.y, radius, 0, Math.PI * 2);
        heroCanvasContext.fill();

        heroCanvasContext.beginPath();
        heroCanvasContext.fillStyle = heroPalette.glow.replace("0.45", "0.12");
        heroCanvasContext.arc(point.x, point.y, radius * 4.2, 0, Math.PI * 2);
        heroCanvasContext.fill();
      }
    });

    for (let marker = 0; marker < 34; marker += 1) {
      const progress = marker / 33;
      const wave = waves[marker % waves.length];
      const point = getWavePoint(wave, progress, speed * 0.55);
      const alpha = 0.1 + Math.sin(progress * Math.PI) * 0.18;
      heroCanvasContext.beginPath();
      heroCanvasContext.fillStyle = heroPalette.point.replace(
        "0.72",
        String(alpha),
      );
      heroCanvasContext.arc(point.x, point.y, 1.3, 0, Math.PI * 2);
      heroCanvasContext.fill();
    }

    if (!shouldReduceHeroMotion.matches) {
      heroAnimationFrame = window.requestAnimationFrame(drawHeroCanvas);
    }
  };

  const startHeroCanvas = () => {
    window.cancelAnimationFrame(heroAnimationFrame);
    resizeHeroCanvas();
    drawHeroCanvas();
  };

  startHeroCanvas();
  window.addEventListener("resize", startHeroCanvas, { passive: true });
  shouldReduceHeroMotion.addEventListener("change", startHeroCanvas);
}

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
