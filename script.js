// header Java
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const logos = document.querySelectorAll('.logo');
  const hero = document.querySelector('.hero-section');
  let lastScrollY = window.scrollY;
  let observer;

  const maxScroll = 650;
  const maxPadding = 64;
  const minPadding = 40;
  const maxLogo = 90;
  const minLogo = 60;

  let isLargeScreen = window.innerWidth > 900;

  function applyDesktopHeaderBehavior() {
    window.addEventListener('scroll', onScrollResizeHeader);
    window.addEventListener('scroll', onScrollHideHeader);

    observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        header.classList.add('header--fixed');
      } else {
        header.classList.remove('header--fixed');
      }
    }, { threshold: 0 });

    observer.observe(hero);
  }

  function onScrollResizeHeader() {
    const scrollY = Math.min(window.scrollY, maxScroll);
    const scrollRatio = scrollY / maxScroll;
    const currentPadding = maxPadding - (maxPadding - minPadding) * scrollRatio;
    const currentLogo = maxLogo - (maxLogo - minLogo) * scrollRatio;

    header.style.padding = `${currentPadding}px 1rem`;
    logos.forEach(logo => logo.style.height = `${currentLogo}px`);
  }

  function onScrollHideHeader() {
    const currentScroll = window.scrollY;
    if (currentScroll > 1100) {
      if (currentScroll > lastScrollY) {
        header.classList.add('header--hide');
      } else {
        header.classList.remove('header--hide');
      }
    } else {
      header.classList.remove('header--hide');
    }
    lastScrollY = currentScroll;
  }

  function applyMobileHeaderBehavior() {
    header.style.padding = '1rem 1rem';

    observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        header.classList.add('header--fixed');
      } else {
        header.classList.remove('header--fixed');
      }
    }, {
      rootMargin: '0px',
      threshold: 0
    });

    observer.observe(hero);
  }

  function cleanup() {
    if (observer) observer.disconnect();
    window.removeEventListener('scroll', onScrollResizeHeader);
    window.removeEventListener('scroll', onScrollHideHeader);
    header.classList.remove('header--fixed', 'header--hide');
    header.style.padding = '';
    logos.forEach(logo => logo.style.height = '');
  }

  function checkWidthAndApplyBehavior() {
    const nowLarge = window.innerWidth > 900;
    if (nowLarge && !isLargeScreen) {
      cleanup();
      isLargeScreen = true;
      applyDesktopHeaderBehavior();
    } else if (!nowLarge && isLargeScreen) {
      cleanup();
      isLargeScreen = false;
      applyMobileHeaderBehavior();
    }
  }

  // Initial run
  isLargeScreen ? applyDesktopHeaderBehavior() : applyMobileHeaderBehavior();

  window.addEventListener('resize', checkWidthAndApplyBehavior);

  // Hamburger menu logic
  const toggleMenu = document.getElementById('nav-toggle');
  const closeMenu = document.getElementById('nav-close');
  const navMenu = document.getElementById('nav-menu');

  toggleMenu.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });

  closeMenu.addEventListener('click', () => {
    navMenu.classList.remove('show');
  });

  const navLink = document.querySelectorAll('.nav__link');
  navLink.forEach(n =>
    n.addEventListener('click', function () {
      navLink.forEach(n => n.classList.remove('active'));
      this.classList.add('active');
      navMenu.classList.remove('show');
    })
  );

  // ScrollTo Section
  window.scrollToSection = function (sectionClass) {
    const section = document.querySelector(`.${sectionClass}`);
    if (section) {
      const offset = 130;
      const sectionPosition = section.offsetTop - offset;
      const currentPosition = window.scrollY;
      const distance = sectionPosition - currentPosition;
      const duration = 1000;
      const startTime = performance.now();

      function animateScroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeInOutQuad =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        window.scrollTo(0, currentPosition + distance * easeInOutQuad);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      }

      requestAnimationFrame(animateScroll);
    }
  };
});









//typewriter animation for the home page
const words = ["Security", "Privacy", "Efficiency"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const textElement = document.querySelector(".home-text");
const typingSpeed = 120; // typing speed in ms
const deletingSpeed = 100; // deleting speed in ms
const pauseTime = 1500; // pause before deleting

function type() {
  const currentWord = words[wordIndex];
  if (isDeleting) {
    charIndex--;
    textElement.textContent = currentWord.substring(0, charIndex);
  } else {
    charIndex++;
    textElement.textContent = currentWord.substring(0, charIndex);
  }

  let timeout = isDeleting ? deletingSpeed : typingSpeed;

  if (!isDeleting && charIndex === currentWord.length) {
    timeout = pauseTime;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    timeout = typingSpeed;
  }

  setTimeout(type, timeout);
}

type(); // start typing on page load





document.addEventListener('DOMContentLoaded', () => {
  // GSAP Timeline for entrance
  const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 1 } });

  // Animate the logo
  tl.from(".logo", { y: -50, opacity: 0 });

  // Stagger in the nav links
  tl.from(".nav__link", { y: -30, opacity: 0, stagger: 0.15 }, "-=0.7");

  // Animate the 'Schedule Now' button
  tl.from(".cta", { scale: 0.5, opacity: 0 }, "-=0.5");
});




// GSAP Timeline for Hero Section
const heroTimeline = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.8 } });

// Animate h2 first
heroTimeline.from(".hero-text h2", { y: 30, opacity: 0 });

// Animate h1 and image1 together
heroTimeline.from(".hero-text h1", { y: 40, opacity: 0 }, "0.8");
heroTimeline.from(".image1", { y: 60, opacity: 0, duration: 2 }, "1");  // "<" = start at same time as h1

// Animate the paragraph
heroTimeline.from(".hero-text p", { y: 30, opacity: 0 }, "1.4");

// Animate the second image
heroTimeline.from(".image2", { y: 100, opacity: 0, duration: 2 }, "1.8");

// Animate the gray box below
heroTimeline.from(".box-below", { scale: 0.8, opacity: 0, duration: 1.6 }, "2");

// Animate the scroll down arrow (fade in + slight slide from bottom)
heroTimeline.from(".scroll-arrow", { y: 20, opacity: 0, duration: 0.8, ease: "power2.out" }, "2.4");













/*scrolling animation*/
document.addEventListener("scroll", () => {
  const isMobile = window.innerWidth <= 768; // Adjust breakpoint if needed

  document.querySelectorAll(".scroll-animate").forEach((el) => {
    const elementPosition = el.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.1;

    if (elementPosition < screenPosition) {
      el.classList.add("active");
      el.classList.remove("scroll-out"); // Ensure scroll-out is removed
    } else if (!isMobile) {
      el.classList.remove("active"); // Reset animation only on larger screens
    }
  });

  if (!isMobile) {
    document.querySelectorAll(".scroll-out-100").forEach((el) => {
      const elementPosition = el.getBoundingClientRect().top;
      const scrollOutTrigger = 30;
      if (elementPosition < scrollOutTrigger) {
        el.classList.add("scroll-out");
        el.classList.remove("active");
      }
    });

    document.querySelectorAll(".scroll-out-20").forEach((el) => {
      const elementPosition = el.getBoundingClientRect().top;
      const scrollOutTrigger = -25;
      if (elementPosition < scrollOutTrigger) {
        el.classList.add("scroll-out");
        el.classList.remove("active");
      }
    });
  }
});



// Home-screen animation: Slide logo up from bottom
window.addEventListener("load", () => {
  document.querySelectorAll(".title-animate").forEach((el) => {
    setTimeout(() => {
      el.classList.add("title-active");
    }, 5);
  });
});



/*scrolling animation for the title*/
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll('.animate-section');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('title-active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    observer.observe(section);
  });
});




/*scroll down button at the section1*/
function scrollToSection(sectionClass) {
  const section = document.querySelector(`.${sectionClass}`);
  if (section) {
    const offset = 130;
    const sectionPosition = section.offsetTop - offset;
    const currentPosition = window.scrollY;
    const distance = sectionPosition - currentPosition;
    const duration = 1000;
    const startTime = performance.now();

    function animateScroll(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeInOutQuad =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      window.scrollTo(0, currentPosition + distance * easeInOutQuad);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }

    requestAnimationFrame(animateScroll);
  }
}




/*scroll up button at the footer*/
function scrollToTop() {
  const duration = 1000;
  const start = window.scrollY;
  const startTime = performance.now();

  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeInOutQuad =
      progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    window.scrollTo(0, start * (1 - easeInOutQuad));

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}














//for the film section under the home page
const tabs = document.querySelectorAll('.film-tab');
const title = document.getElementById('film-title');
const description = document.getElementById('film-description');
const image = document.getElementById('film-image').querySelector('img');

const filmContent = {
  security: {
    title: 'Serious Protection, Built-In',
    desc: `ArmorTint connects you with Madico Safety & Security Films—impact-resistant layers that help hold glass together during break-ins, natural disasters, and accidents. If someone tries to smash through, this film can delay forced entry up to 5–10 minutes**, giving you time to call for help or get to safety. Plus, it helps reduce injuries from flying glass during storms or explosions. Madico security films meet rigorous safety standards like ANSI Z97.1 and CPSC 16 CFR 1201.`,
    img: 'photo/film-tab-section-1.jpg'
  },
  privacy: {
    title: 'Privacy Without Losing Light',
    desc: `Privacy films from Madico help you block unwanted views from outside without making your space feel dark. Whether it's your home office, conference room, or bathroom, you’ll enjoy clear views from inside while limiting what people can see in. Options range from subtle frosts to reflective tints, and they also help block UV rays—protecting furniture and skin from sun damage.`,
    img: 'photo/film-tab-section-2.jpg'
  },
  efficiency: {
    title: 'Control the Sun, Cut the Heat',
    desc: `Madico’s solar control window films block **up to 86% of solar heat** and **99% of UV rays**, keeping your home or business cooler and reducing strain on your AC system. These films cut glare on screens and surfaces, help prevent fading on furniture, and lower your energy bills—especially in Arizona's brutal summer months. Choose from a range of tint shades to match your style and comfort level.`,
    img: 'photo/film-tab-section-3.jpg'
  }
};


tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const type = tab.getAttribute('data-type');

    title.textContent = filmContent[type].title;
    description.textContent = filmContent[type].desc;

    // Smooth image transition
    image.style.opacity = 0;

    const newImage = new Image();
    newImage.src = filmContent[type].img;
    newImage.onload = () => {
      image.src = newImage.src;
      image.style.opacity = 1;
    };
  });
});














/*testinmonials auto scroll*/
const track = document.getElementById("carousel-track");
const carousel = document.getElementById("carousel");
let index = 0;
let isPaused = false;

const visibleCount = 3;
const testimonials = Array.from(track.children);

// Clone the first few to loop
for (let i = 0; i < visibleCount; i++) {
  const clone = testimonials[i].cloneNode(true);
  track.appendChild(clone);
}

function slideNext() {
  if (isPaused) return;

  const testimonialCard = track.querySelector(".testimonial");
  const cardWidth = testimonialCard.offsetWidth;
  const gap = parseFloat(getComputedStyle(track).gap) || 0;

  const slideAmount = cardWidth + gap;

  index++;
  track.style.transform = `translateX(-${index * slideAmount}px)`;

  if (index >= testimonials.length) {
    setTimeout(() => {
      track.style.transition = "none";
      index = 0;
      track.style.transform = "translateX(0)";
      void track.offsetWidth;
      track.style.transition = "transform 0.5s ease-in-out";
    }, 500);
  }
}

let interval = setInterval(slideNext, 3000);

carousel.addEventListener("mouseenter", () => (isPaused = true));
carousel.addEventListener("mouseleave", () => (isPaused = false));















//java for the Architectural Legacy
const regionWrapper = document.querySelector(".region-wrapper");
const regionSidebar = document.querySelector(".region-sidebar");
const navItems = document.querySelectorAll(".region-sidebar li");
const sections = document.querySelectorAll(".region-content-block");

function handleScroll() {
  const scrollY = window.scrollY;
  const regionTop = regionWrapper.offsetTop;
  const regionHeight = regionWrapper.offsetHeight;
  const regionBottom = regionTop + regionHeight;

  // Show/hide sidebar when inside/outside region
  if (scrollY + window.innerHeight / 2 >= regionTop && scrollY <= regionBottom - window.innerHeight / 2) {
    regionSidebar.classList.add("visible");
  } else {
    regionSidebar.classList.remove("visible");
    navItems.forEach(li => li.classList.remove("active")); // clear highlight
    return;
  }

  // Highlight the correct nav item
  let currentId = "";
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const middleY = rect.top + rect.height / 2;
    if (middleY >= 0 && middleY <= window.innerHeight) {
      currentId = section.id;
    }
  });

  navItems.forEach(li => {
    li.classList.remove("active");
    if (li.dataset.target === currentId) {
      li.classList.add("active");
    }
  });
}

// Smooth scroll on click
navItems.forEach(li => {
  li.addEventListener("click", () => {
    const id = li.dataset.target;
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

window.addEventListener("scroll", handleScroll);
window.addEventListener("load", handleScroll);  








document.querySelector('form').addEventListener('submit', function (e) {
  const phone = document.querySelector('input[name="phone"]').value;
  if (!/^[\d\s()+-]+$/.test(phone)) {
    alert('Please enter a valid phone number.');
    e.preventDefault();
  }
});