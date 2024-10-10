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
    { threshold: 0.2 }
  );
  sectionObserver.observe(targetSection);
});
// Count-Up Animation
document.addEventListener("DOMContentLoaded", () => {
  console.log("Script is running after DOM is loaded");

  // Log the count-up elements to check if they are being selected correctly
  const countUpElements = document.querySelectorAll(".count-up");
  console.log("Count-up elements:", countUpElements); // Log the selected elements

  const formatNumber = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const animateCount = (element, finalCount) => {
    let start = null;
    const duration = 1500;
    const easeOutExpo = (x) => 1 - Math.pow(2, -10 * x);

    const updateCount = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const currentCount = Math.floor(easeOutExpo(progress) * finalCount);
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
