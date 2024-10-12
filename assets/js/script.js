//* mouse cursor animation

document.addEventListener("DOMContentLoaded", () => {
  // Mouse Cursor Animation
  const cursor = document.querySelector(".cursor");
  let mouseX = 0,
    mouseY = 0,
    cursorX = 0,
    cursorY = 0;

  document.addEventListener("mousemove", (e) => {
    const { pageX: x, pageY: y } = e;
    mouseX = x;
    mouseY = y;
  });

  function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    requestAnimationFrame(updateCursor);
  }
  requestAnimationFrame(updateCursor);

  const interactiveTags = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "ol",
    "input",
    ".interactive",
    ".carousel-counter",
    "svg",
  ];
  const interactiveElements = [];
  interactiveTags.forEach((tag) =>
    interactiveElements.push(...document.querySelectorAll(tag))
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseover", () =>
      cursor.classList.add("cursor-hover")
    );
    element.addEventListener("mouseleave", () =>
      cursor.classList.remove("cursor-hover")
    );
  });

  // Animate Headings in Banner Section
  const headings = document.querySelectorAll(".banner-section h1");
  headings.forEach((heading) => {
    const letters = heading.textContent.split("");
    heading.innerHTML = letters
      .map((letter) => `<span>${letter}</span>`)
      .join("");
    const animateTitle = () => {
      heading.querySelectorAll("span").forEach((letter, index) => {
        anime({
          targets: letter,
          translateY: [100, 0],
          opacity: [0, 1],
          scale: [0.5, 1],
          duration: 600,
          delay: index * 100,
          easing: "easeOutExpo",
        });
      });
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateTitle();
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(heading);
  });

  // Animate Gallery Titles
  const titles = document.querySelectorAll(".title-container h1");
  titles.forEach((galleryTitle) => {
    const letters = galleryTitle.textContent.split("");
    galleryTitle.innerHTML = letters
      .map((letter) => `<span>${letter}</span>`)
      .join("");
    const animateTitle = () => {
      galleryTitle.querySelectorAll("span").forEach((letter, index) => {
        anime({
          targets: letter,
          translateY: [100, 0],
          opacity: [0, 1],
          scale: [0.5, 1],
          duration: 600,
          delay: index * 100,
          easing: "easeOutExpo",
        });
      });
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateTitle();
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(galleryTitle);
  });

  // Animate Navigation Heading
  const navHeading = document.querySelector(".nav-contents h2");
  const navLetters = navHeading.textContent.split("");
  navHeading.innerHTML = navLetters
    .map((letter) => `<span>${letter}</span>`)
    .join("");

  const animateNavText = () => {
    const titleLetters = navHeading.querySelectorAll("span");
    const centerIndex = Math.floor(titleLetters.length / 2);
    titleLetters.forEach((letter, index) => {
      const delay = Math.abs(centerIndex - index) * 100;
      anime({
        targets: letter,
        translateY: [100, 0],
        opacity: [0, 1],
        scale: [0.5, 1],
        duration: 1000,
        delay,
        easing: "easeOutExpo",
      });
    });
  };

  const animateNavBorders = () => {
    anime({
      targets: navHeading,
      borderTopWidth: [0, "0.5px"],
      borderBottomWidth: [0, "0.5px"],
      duration: 600,
      easing: "easeOutExpo",
    });
  };
  animateNavText();
  animateNavBorders();
});

document.addEventListener("DOMContentLoaded", () => {
  // Smooth Staggered Animations for Grid Containers
  const initSmoothStaggeredAnimations = () => {
    const animationSettings = {
      opacity: [0, 1],
      easing: "easeInOutSine",
      duration: 1500,
    };
    document
      .querySelectorAll(
        ".grid-container .child-container:first-child .img-container"
      )
      .forEach((container, index) => {
        anime({
          targets: container,
          translateX: [-30, 0],
          ...animationSettings,
          delay: anime.stagger(2000, { start: index * 700 }),
        });
      });
    anime({
      targets: ".grid-container .child-container:last-child",
      translateX: [30, 0],
      ...animationSettings,
    });
  };

  const targetSection = document.querySelector(".most-visited-section");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          initSmoothStaggeredAnimations();
          sectionObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35 }
  );
  sectionObserver.observe(targetSection);
});
// Count-Up Animation
document.addEventListener("DOMContentLoaded", () => {
  console.log("Script is running after DOM is loaded");

  const countUpElements = document.querySelectorAll(".count-up");
  console.log("Count-up elements:", countUpElements); // Log the selected elements

  const formatNumber = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const animateCount = (element, finalCount) => {
    let start = null;
    const duration = 3000; // Increase duration for a slower transition
    const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3); // Smooth easing function

    const updateCount = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const currentCount = Math.floor(easeOutCubic(progress) * finalCount);
      element.textContent = formatNumber(currentCount) + "+";

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = formatNumber(finalCount) + "+";
      }
    };

    requestAnimationFrame(updateCount);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const finalCount = parseInt(entry.target.dataset.count);
          console.log("Element is visible:", entry.target);

          if (!isNaN(finalCount)) {
            animateCount(entry.target, finalCount);
            observer.unobserve(entry.target); // Stop observing after animation triggers
          }
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe each count-up element
  countUpElements.forEach((el) => {
    observer.observe(el);
  });
});

///

document.addEventListener("DOMContentLoaded", function () {
  // First animation logic
  const cards = document.querySelectorAll(".card-container .card-child");
  const observerOptions = { root: null, rootMargin: "0px", threshold: 0.25 };

  const cardAnimations = (target, translateX, translateY = 0, delay = 0) => {
    anime({
      targets: target,
      opacity: [0, 1],
      scale: [0.9, 1],
      translateX: [translateX, 0],
      translateY: [translateY, 0],
      duration: 2500,
      easing: "easeOutCirc",
      delay: delay,
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target === cards[1]) {
          cardAnimations(entry.target, 100);
        } else if (entry.target === cards[0]) {
          cardAnimations(entry.target, 200, 10, 500);
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  cards.forEach((card) => observer.observe(card));

  // Project page image stack animation
  const childContainers = document.querySelectorAll(
    ".project-stack-section .child-container img"
  );
  const observerOptionsForChild = { threshold: 0.5 };

  const rotateYAnimation = (target) => {
    anime({
      targets: target,
      rotateY: [-90, 0],
      duration: 1500,
      easing: "easeInOutCubic",
      opacity: [0, 1],
      delay: 100,
    });
  };

  const observerChild = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        rotateYAnimation(entry.target);
        observerChild.unobserve(entry.target);
      }
    });
  }, observerOptionsForChild);

  childContainers.forEach((img) => observerChild.observe(img));

  // project page vertical year animation
  const yearContainer = document.querySelector(".vertical-year span");
  const observerOptionsForYear = { threshold: 0.1 };

  const animateYear = (target) => {
    anime({
      targets: target,
      translateY: [35, 0],
      duration: 3000,
      easing: "easeInOutCubic",
      opacity: [0, 1],
      delay: 700,
    });
  };

  const observerYear = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateYear(entry.target);
        observerYear.unobserve(entry.target);
      }
    });
  }, observerOptionsForYear);

  observerYear.observe(yearContainer);

  // Fourth animation logic
  const childContainersAppolo = [
    document.querySelector(
      ".project-appolo-section .child-container:nth-of-type(3) img"
    ),
    document.querySelector(
      ".project-appolo-section .child-container:nth-of-type(1) img"
    ),
    document.querySelector(
      ".project-appolo-section .child-container:nth-of-type(8) img"
    ),
  ];

  const observerOptionsAppolo = { threshold: 0.5 };
  const observerOptionsForChild8 = { threshold: 0.1 };

  const rotateYAnimationAppolo = (target, rotateStart, delay = 0) => {
    anime({
      targets: target,
      rotateY: [rotateStart, 0],
      duration: 1500,
      easing: "easeInOutCubic",
      opacity: [0, 1],
      delay: delay,
    });
  };

  const observerAppolo = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        rotateYAnimationAppolo(
          entry.target,
          entry.target === childContainersAppolo[1] ? -90 : 90,
          entry.target === childContainersAppolo[0] ? 0 : 500
        );
        observerAppolo.unobserve(entry.target);
      }
    });
  }, observerOptionsAppolo);

  const observerForChild8Appolo = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        anime({
          targets: entry.target,
          translateY: [-200, 0],
          duration: 1500,
          easing: "easeInOutCubic",
          opacity: [0, 1],
          delay: 500,
        });
        observerForChild8Appolo.unobserve(entry.target);
      }
    });
  }, observerOptionsForChild8);

  observerAppolo.observe(childContainersAppolo[0]);
  observerAppolo.observe(childContainersAppolo[1]);
  observerForChild8Appolo.observe(childContainersAppolo[2]);
});
//product page top section animation only
document.addEventListener("DOMContentLoaded", function () {
  const secondChild = document.querySelector(
    ".product-top-section .grid-container .child-container:nth-of-type(2)"
  );
  const h1Elements = document.querySelectorAll(
    ".product-top-section .grid-container .child-container:last-child h1:nth-child(n+2)"
  );
  const firstChild = document.querySelector(
    ".product-top-section .grid-container .child-container:first-child"
  );

  // Ensure the first child starts with opacity 0
  if (firstChild) {
    firstChild.style.opacity = 0;
  }

  // Check if the secondChild exists before setting up the observer
  if (secondChild) {
    const observerProduct = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate the second child
            anime({
              targets: secondChild,
              opacity: [0, 1],
              scale: [0.5, 1],
              duration: 3000,
              easing: "easeOutExpo",
              begin: () => {
                // Animate the first child after secondChild starts animating
                if (firstChild) {
                  anime({
                    targets: firstChild,
                    opacity: [0, 1],
                    translateX: [100, 0],
                    duration: 2000,
                    easing: "easeOutExpo",
                    delay: 800,
                  });
                }

                // Animate each h1 element with delay
                if (h1Elements.length > 0) {
                  h1Elements.forEach((h1, index) => {
                    anime({
                      targets: h1,
                      rotateX: [-90, 0],
                      duration: 2000,
                      opacity: [0, 1],
                      easing: "easeOutCubic",
                      delay: 700 + index * 700,
                      perspective: 1000,
                    });
                  });
                }
              },
            });

            // Unobserve the secondChild once the animation starts
            observerProduct.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 } // Adjust the threshold as needed
    );

    // Observe the second child for intersection changes
    observerProduct.observe(secondChild);
  } else {
    console.error("secondChild not found");
  }
});

//

document.addEventListener("DOMContentLoaded", () => {
  // Section 1: Product Image Animation
  const firstChild = document.querySelector(
    ".product-image-container .grid-container .child-container:first-child"
  );
  const secondChild = document.querySelectorAll(
    ".product-image-container .grid-container .child-container:last-child h1:nth-of-type(n+2)"
  );
  const description = document.querySelectorAll(
    ".product-image-container .grid-container .child-container:last-child p"
  );
  const lastChildContainer = document.querySelector(
    ".product-image-container .grid-container .child-container:last-child"
  );

  if (firstChild && lastChildContainer) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // First child animation
            anime({
              targets: firstChild,
              opacity: [0, 1],
              scale: [0.4, 1],
              duration: 3500,
              easing: "easeOutExpo",
              begin: () => {
                // Second child animations
                secondChild.forEach((h1, index) => {
                  anime({
                    targets: h1,
                    rotateX: [-90, 0],
                    duration: 2000,
                    opacity: [0, 1],
                    easing: "easeOutCubic",
                    delay: 700 + index * 700,
                  });
                });
                // Description animations
                anime({
                  targets: description,
                  translateX: [-120, 0],
                  opacity: [0, 1],
                  duration: 2500,
                  easing: "easeOutCubic",
                  delay: secondChild.length * 700 + 700,
                });
              },
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(lastChildContainer);
  }

  // Section 2: News Section Animation
  const targetElementNews = document.querySelector(".news-top-section");

  if (targetElementNews) {
    const observerNews = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // News image animation
            anime({
              targets: ".news-top-section img",
              translateX: [-100, 0],
              opacity: [0, 1],
              duration: 2000,
              easing: "easeOutCubic",
            });

            // News h2 animation
            anime({
              targets: ".news-top-section .text-container h2",
              translateX: [100, 0],
              opacity: [0, 1],
              duration: 1500,
              easing: "easeOutCubic",
              delay: 700,
              begin: () => {
                // News paragraph animation
                anime({
                  targets: ".news-top-section .text-container p",
                  translateY: [-90, 0],
                  opacity: [0, 1],
                  duration: 1500,
                  easing: "easeOutCubic",
                  delay: 1700,
                });
              },
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    observerNews.observe(targetElementNews);
  }

  // Section 3: Brand Logos Animation
  const logos = document.querySelectorAll(".brand-logos .child-container img");

  if (logos.length > 0) {
    logos.forEach((logo) => {
      logo.addEventListener("mouseenter", () => {
        anime({
          targets: logo,
          rotateY: [0, 360],
          duration: 500,
          translateY: -20,
          scale: 1.1,
          easing: "easeInOutQuad",
        });
      });

      logo.addEventListener("mouseleave", () => {
        anime({
          targets: logo,
          rotateY: [360, 0],
          duration: 500,
          translateY: 0,
          scale: 1,
          easing: "easeInOutQuad",
        });
      });
    });
  }

  // Section 4: Vertical Text Container Animation
  const targetElementVerticalText = document.querySelector(
    ".vertical-text-container"
  );

  if (targetElementVerticalText) {
    const observerVerticalText = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // H1 animation
            anime({
              targets: ".vertical-text-container h1",
              translateY: [35, 0],
              opacity: [0, 1],
              duration: 2000,
              easing: "easeOutCubic",
            });

            // Paragraph animation
            anime({
              targets: ".vertical-text-container p",
              translateY: [35, 0],
              opacity: [0, 1],
              duration: 2000,
              easing: "easeOutCubic",
              delay: 1000,
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observerVerticalText.observe(targetElementVerticalText);
  }
});
//!index page carousel

window.addEventListener("load", function () {
  var flkty = $("main-carousel").flickity({
    cellAlign: "center",
    contain: true,
    wrapAround: true,
    percentPosition: false,
    autoPlay: 5000,
    groupCells: 1,
    prevNextButtons: false,
    pageDots: true,
    selectedAttraction: 0.002,
    friction: 0.08,
  });
  setTimeout(function () {
    flkty.flickity("resize");
  }, 100);

  // Event handler for dragEnd
  flkty.on("dragEnd", function () {
    console.log("Autoplay resumed after drag");
    flkty.player.play();
  });
});
//! products page carousel
window.addEventListener("load", function () {
  //  Initialize Flickity
  var $carousel = $(".main-carousel").flickity({
    cellAlign: "center", // Align cells to center
    contain: true, // Contain cells within the carousel
    wrapAround: true, // Loop through cells
    percentPosition: false,
    groupCells: false, // Ensure only one cell is shown at a time
    prevNextButtons: true, // Show previous/next buttons
    pageDots: false, // Hide dots
    dragThreshold: 3, // Threshold for dragging
    selectedAttraction: 0.002,
    friction: 0.08,
    autoPlay: 5000,
  });
  setTimeout(function () {
    $carousel.flickity("resize");
  }, 100);
  // Autoplay resume after dragging ends
  var flkty = $carousel.data("flickity");
  flkty.on("dragEnd", function () {
    console.log("Autoplay resumed after drag");
    flkty.player.play();
  });

  // Set total slides count
  var totalSlides = $carousel.find(".carousel-cell").length;
  $("#totalSlides").text(formatNumber(totalSlides));

  // Update the current slide count when the slide changes
  $carousel.on("select.flickity", function () {
    var currentSlide = flkty.selectedIndex + 1; // Add 1 because Flickity is 0-based
    $("#currentSlide").text(formatNumber(currentSlide));
  });

  // Format number to ensure double digits
  function formatNumber(num) {
    return num < 10 ? "0" + num : num.toString();
  }
});
//! brands page carousel
window.addEventListener("load", function () {
  // Initialize Flickity
  var $carousel = $(".main-carousel2").flickity({
    cellAlign: "left",
    wrapAround: true,
    contain: true,
    percentPosition: false,
    prevNextButtons: true,
    pageDots: false,
    selectedAttraction: 0.025,
    friction: 0.8,
    autoPlay: true,
    groupCells: true,
    adaptiveHeight: true,
  });
  setTimeout(function () {
    $carousel.flickity("resize");
  }, 100);
  var flkty = $carousel.data("flickity");
  flkty.on("dragEnd", function () {
    console.log("Autoplay resumed after drag");
    flkty.player.play();
  });

  // Set total slides count
  var totalSlides = $(".brand-top-section .carousel-cell").length;
  $("#totalSlides2").text(flickityFormatNumber(totalSlides));

  // Start slide from 2 for aesthetic purposes
  updateCurrentSlide2();

  // Update current slide on slide change
  $carousel.on("select.flickity", updateCurrentSlide2);

  function updateCurrentSlide2() {
    var flkty = $carousel.data("flickity");
    var currentSlide = flkty.selectedIndex + 2; // Start from 2 instead of 1

    // Ensure the number doesn't exceed the total slides
    if (currentSlide > totalSlides) {
      currentSlide = currentSlide - totalSlides; // Wrap around if it exceeds
    }

    $("#currentSlide2").text(flickityFormatNumber(currentSlide));
  }

  function flickityFormatNumber(num) {
    return num < 10 ? "0" + num : num;
  }
});

window.addEventListener("load", function () {
  // Initialize Flickity
  var $carousel3 = $(".collage-carousel").flickity({
    cellAlign: "left",
    wrapAround: true,
    contain: true,
    prevNextButtons: true,
    pageDots: false,
    percentPosition: false,
    selectedAttraction: 0.002,
    friction: 0.08,
    autoPlay: 5000,
    groupCells: true,
    adaptiveHeight: true,
  });
  setTimeout(function () {
    $carousel3.flickity("resize");
  }, 100);

  var flkty = $carousel3.data("flickity");
  flkty.on("dragEnd", function () {
    console.log("Autoplay resumed after drag");
    flkty.player.play();
  });
  // Set total slides count
  var totalSlides3 = $(".brand-collage-carousel .carousel-cell").length;
  $("#totalSlides3").text(flickityFormatNumber3(totalSlides3));

  // Start slide from 2 for aesthetic purposes
  updateCurrentSlide3();

  // Update current slide on slide change
  $carousel3.on("select.flickity", updateCurrentSlide3);

  function updateCurrentSlide3() {
    var flkty3 = $carousel3.data("flickity"); // Correctly use $carousel3
    var currentSlide3 = flkty3.selectedIndex + 2; // Start from 2 instead of 1

    // Ensure the number doesn't exceed the total slides
    if (currentSlide3 > totalSlides3) {
      currentSlide3 = currentSlide3 - totalSlides3; // Wrap around if it exceeds
    }

    $("#currentSlide3").text(flickityFormatNumber3(currentSlide3));
  }

  function flickityFormatNumber3(num) {
    return num < 10 ? "0" + num : num;
  }
});
window.addEventListener("load", function () {
  // Initialize Flickity
  var $carousel4 = $(".carousel-big").flickity({
    cellAlign: "left",
    wrapAround: true,
    contain: true,
    prevNextButtons: true,
    percentPosition: false,
    pageDots: false,
    selectedAttraction: 0.002,
    friction: 0.08,
    autoPlay: 5000,
    groupCells: true,
    adaptiveHeight: true,
  });
  setTimeout(function () {
    $carousel4.flickity("resize");
  }, 100);

  var flkty = $carousel4.data("flickity");
  flkty.on("dragEnd", function () {
    console.log("Autoplay resumed after drag");
    flkty.player.play();
  });
  // Set total slides count
  var totalSlides4 = $(".brand-bottom-section .carousel-cell").length;
  $("#totalSlides4").text(flickityFormatNumber4(totalSlides4));

  // Start slide from 2 for aesthetic purposes
  updateCurrentSlide4();

  // Update current slide on slide change
  $carousel4.on("select.flickity", updateCurrentSlide4);

  function updateCurrentSlide4() {
    var flkty4 = $carousel4.data("flickity"); // Correctly use $carousel3
    var currentSlide4 = flkty4.selectedIndex + 2; // Start from 2 instead of 1

    // Ensure the number doesn't exceed the total slides
    if (currentSlide4 > totalSlides4) {
      currentSlide4 = currentSlide4 - totalSlides4; // Wrap around if it exceeds
    }

    $("#currentSlide4").text(flickityFormatNumber4(currentSlide4));
  }

  function flickityFormatNumber4(num) {
    return num < 10 ? "0" + num : num;
  }
});
//! images carousel
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper-container", {
    slidesPerView: 1,
    loop: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    initialSlide: 1,
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 600,
      modifier: 0.5,
      slideShadows: false,
    },
    speed: 2000, // 2 seconds for a smooth transition
    easing: "ease-in-out", // Smooth easing effect
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const currentSlideElement = document.querySelector(".current-slide");
  const totalSlidesElement = document.querySelector(".total-slides");

  // Function to format slide numbers
  const swiperFormatNumber = (num) => (num < 10 ? `0${num}` : num.toString());

  // Function to update slide count with debounce
  const updateSlideCount = () => {
    currentSlideElement.textContent = swiperFormatNumber(swiper.realIndex + 1);

    // Calculate the actual total slides (excluding duplicated slides for looping)
    const totalSlides = swiper.slides.length - swiper.loopedSlides * 2;
    totalSlidesElement.textContent = swiperFormatNumber(totalSlides);
  };

  // Debounce utility function
  const debounce = (func, delay) => {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const debouncedUpdateSlideCount = debounce(updateSlideCount, 100); // 100ms delay

  // Initialize slide count on page load
  updateSlideCount();

  // Update slide count on slide change with debounce
  swiper.on("slideChange", debouncedUpdateSlideCount);
});

window.addEventListener("load", function () {
  // Initialize Flickity once DOM is fully rendered
  var $carousel = $(".main-carousel").flickity({
    cellAlign: "left",
    wrapAround: true,
    contain: true,
    prevNextButtons: true,
    percentPosition: false,
    pageDots: false,
    selectedAttraction: 0.002,
    friction: 0.08,
    autoPlay: 5000,
    groupCells: true,
    adaptiveHeight: true,
  });
  setTimeout(function () {
    $carousel.flickity("resize");
  }, 100);

  // Set total slides count and other functionality
  var flkty = $carousel.data("flickity");
  flkty.on("dragEnd", function () {
    console.log("Autoplay resumed after drag");
    flkty.player.play();
  });

  var totalSlides = $carousel.find(".carousel-cell").length;
  $("#totalSlides").text(flickityFormatNumber(totalSlides));
  updateCurrentSlide2();

  $carousel.on("select.flickity", updateCurrentSlide2);

  function updateCurrentSlide2() {
    var flkty2 = $carousel.data("flickity");
    var currentSlide2 = flkty2.selectedIndex + 2; // Start from 2 instead of 1

    if (currentSlide2 > totalSlides) {
      currentSlide2 = currentSlide2 - totalSlides;
    }

    $("#currentSlide").text(flickityFormatNumber(currentSlide2));
  }

  function flickityFormatNumber(num) {
    return num < 10 ? "0" + num : num;
  }
});
window.addEventListener("load", function () {
  // Initialize Flickity
  var $carousel = $(".main-carousel2").flickity({
    cellAlign: "left",
    wrapAround: true,
    contain: true,
    prevNextButtons: true,
    pageDots: false,
    percentPosition: false,
    selectedAttraction: 0.002,
    friction: 0.08,
    autoPlay: 5000,
    groupCells: true,
    adaptiveHeight: true,
  });
  var flkty = $carousel.data("flickity");
  flkty.on("dragEnd", function () {
    console.log("Autoplay resumed after drag");
    flkty.player.play();
  });
  // Set total slides count
  var totalSlides = $carousel.find(".carousel-cell").length;
  $("#totalSlides2").text(flickityFormatNumber(totalSlides));

  // Start slide from 2 for aesthetic purposes
  updateCurrentSlide2();

  // Update current slide on slide change
  $carousel.on("select.flickity", updateCurrentSlide2);

  function updateCurrentSlide2() {
    var flkty = $carousel.data("flickity");
    var currentSlide = flkty.selectedIndex + 2; // Start from 2 instead of 1

    // Ensure the number doesn't exceed the total slides
    if (currentSlide > totalSlides) {
      currentSlide = currentSlide - totalSlides; // Wrap around if it exceeds
    }

    $("#currentSlide2").text(flickityFormatNumber(currentSlide));
  }

  function flickityFormatNumber(num) {
    return num < 10 ? "0" + num : num;
  }
});
