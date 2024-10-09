// document.addEventListener("DOMContentLoaded", () => {
//   const cursor = document.querySelector(".cursor");

//   // Set initial cursor position off-screen (adjust as needed)
//   cursor.style.top = "0px";
//   cursor.style.left = "0px";

//   document.addEventListener("mousemove", (event) => {
//     const mx = event.clientX - 25;
//     const my = event.clientY - 25;

//     cursor.style.transform = `translate(${mx}px, ${my}px)`;
//     cursor.style.transform += `rotate3d(${mx * -0.1}deg, ${
//       my * -0.3
//     }deg, 0, 12deg)`;
//     cursor.style.backgroundColor = "#fff";
//     cursor.style.borderColor = "#fff";
//     cursor.style.mixBlendMode = "difference";
//     cursor.style.transition =
//       "transform .3s ease, background .3s ease, border-color .3s ease";
//   });
// });
document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".cursor");

  // Variables to store current and target mouse positions
  let mouseX = 0,
    mouseY = 0;
  let cursorX = 0,
    cursorY = 0;

  // Track mouse movement
  document.addEventListener("mousemove", (e) => {
    const { pageX: x, pageY: y } = e; // Use pageX and pageY to account for scrolling
    mouseX = x - 0; // Offset to position the custom cursor above the original pointer
    mouseY = y - 0;
  });

  // Function to smoothly update the cursor position
  function updateCursor() {
    // Lerp (linear interpolation) for smooth movement
    cursorX += (mouseX - cursorX) * 0.3; // Adjust the value (0.1) for faster/slower smoothing
    cursorY += (mouseY - cursorY) * 0.3;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    requestAnimationFrame(updateCursor); // Continuously update cursor position
  }

  // Start the cursor update loop
  requestAnimationFrame(updateCursor);

  // List of tags we want to make interactive
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

  // Cache interactive elements for hover effect
  const interactiveElements = [];
  interactiveTags.forEach((tag) => {
    interactiveElements.push(...document.querySelectorAll(tag));
  });

  // Add hover effects to all specified tags
  interactiveElements.forEach((element) => {
    element.addEventListener("mouseover", () => {
      cursor.classList.add("cursor-hover");
    });

    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("cursor-hover");
    });
  });
});

// banner animation
document.addEventListener("DOMContentLoaded", (event) => {
  const headings = document.querySelectorAll(".banner-section h1");

  headings.forEach((heading) => {
    // Split the title text into letters and wrap each in a span
    const letters = heading.textContent.split("");
    heading.innerHTML = letters
      .map((letter) => `<span>${letter}</span>`)
      .join("");

    // Function to trigger animation for this title
    const animateTitle = () => {
      const titleLetters = heading.querySelectorAll("span");
      titleLetters.forEach((letter, index) => {
        anime({
          targets: letter,
          translateY: [100, 0], // Move from below to original position
          opacity: [0, 0.7], // Fade in from invisible to slightly transparent
          scale: [0.5, 1], // Scale up from smaller size
          duration: 600, // Animation duration
          delay: index * 100, // Stagger animation based on index
          easing: "easeOutExpo", // Smooth ease-out effect
          begin: function (anim) {
            // Set transform origin
            letter.style.transformOrigin = "50% 50%"; // Center the transformation
          },
        });
      });
    };

    // Set up Intersection Observer for triggering animation on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateTitle(); // Trigger animation
          observer.unobserve(entry.target); // Stop observing after animation
        }
      });
    });

    observer.observe(heading); // Start observing each title
  });
  // title animation
  const titles = document.querySelectorAll(".title-container h1");

  titles.forEach((galleryTitle) => {
    // Animate each letter within the title
    const letters = galleryTitle.textContent.split("");
    galleryTitle.innerHTML = letters
      .map((letter) => `<span>${letter}</span>`)
      .join("");

    // Function to trigger animation for this title
    const animateTitle = () => {
      const titleLetters = galleryTitle.querySelectorAll("span");
      titleLetters.forEach((letter, index) => {
        anime({
          targets: letter,
          translateY: [100, 0], // Move from below to original position
          opacity: [0, 0.7], // Fade in from invisible to slightly transparent
          scale: [0.5, 1], // Scale up from smaller size
          duration: 600, // Animation duration
          delay: index * 100, // Stagger animation based on index
          easing: "easeOutExpo", // Smooth ease-out effect
          begin: function (anim) {
            // Set transform origin
            letter.style.transformOrigin = "50% 50%"; // Center the transformation
          },
        });
      });
    };

    // Set up Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateTitle(); // Trigger animation
          observer.unobserve(entry.target); // Stop observing after animation
        }
      });
    });

    observer.observe(galleryTitle); // Start observing each title
  });
  // animation for section title
  const navHeading = document.querySelector(".nav-contents h2");

  // Wrap each letter in a span
  const navLetters = navHeading.textContent.split("");
  navHeading.innerHTML = navLetters
    .map((letter) => `<span>${letter}</span>`)
    .join("");

  // Set up the animation for the text
  const animateNavText = () => {
    const titleLetters = navHeading.querySelectorAll("span");
    const totalLetters = titleLetters.length;
    const centerIndex = Math.floor(totalLetters / 2); // Center index

    titleLetters.forEach((letter, index) => {
      // Calculate the delay to create the center-out effect
      // Adjusting to start from the center between the letters
      const offset = totalLetters % 2 === 0 ? 0.5 : 0; // Half letter offset for even length
      const delay =
        Math.abs(centerIndex - index - offset) * 100 +
        (index >= centerIndex ? 0 : 0);

      anime({
        targets: letter,
        translateY: [100, 0], // Move from below to original position
        opacity: [0, 0.7], // Fade in from invisible to slightly transparent
        scale: [0.5, 1], // Scale up from smaller size
        duration: 1000, // Animation duration
        delay: delay, // Stagger animation based on index for center-out effect
        easing: "easeOutExpo", // Smooth ease-out effect
        begin: function (anim) {
          // Set transform origin
          letter.style.transformOrigin = "50% 50%"; // Center the transformation
        },
      });
    });
  };

  // Animation for borders
  const animateNavBorders = () => {
    anime({
      targets: navHeading,
      borderTopWidth: [0, "0.5px"], // Animate top border
      borderBottomWidth: [0, "0.5px"], // Animate bottom border
      duration: 600,
      easing: "easeOutExpo",
    });
  };

  // Trigger both animations
  animateNavText();
  animateNavBorders();
});

// project counter aniamtion
document.addEventListener("DOMContentLoaded", () => {
  const duration = 1500; // Duration for the animation

  // Function to format numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Function to animate the count
  const animateCount = (element, finalCount) => {
    let start = null;

    // Easing function with adjusted slowdown near the end
    const easeOutExpo = (x) => {
      const slowdownFactor = 2; // Adjust this value to control slowdown (higher = slower)
      const threshold = 0.4; // Adjust this value to control slowdown start point (0-1)
      return (
        1 -
        Math.pow(
          2.2,
          -14 * x * (1 - threshold + threshold * Math.pow(x, slowdownFactor))
        )
      );
    };

    const updateCount = (timestamp) => {
      if (!start) start = timestamp; // Initialize start time
      const progress = Math.min((timestamp - start) / duration, 1); // Calculate progress

      const currentCount = Math.min(
        Math.floor(easeOutExpo(progress) * finalCount),
        finalCount
      );

      element.textContent = formatNumber(currentCount) + "+"; // Format count with commas

      // Continue the animation if not finished
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = formatNumber(finalCount) + "+"; // Ensure final count is displayed with formatting
      }
    };

    requestAnimationFrame(updateCount); // Start the animation loop
  };

  // IntersectionObserver setup
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const finalCount = parseInt(entry.target.dataset.count); // Get final count from data attribute
          if (!isNaN(finalCount) && finalCount >= 0) {
            // Check if finalCount is a valid non-negative number
            animateCount(entry.target, finalCount); // Start animation
            observer.unobserve(entry.target); // Stop observing after animation starts
          }
        }
      });
    },
    { threshold: 0.1 } // Trigger when 10% of the element is visible
  );

  // Observe all count elements with class 'count-up'
  document.querySelectorAll(".count-up").forEach((el) => {
    observer.observe(el);
  });
});

// mostvisited section amimation
document.addEventListener("DOMContentLoaded", () => {
  function initSmoothStaggeredAnimations() {
    const animationSettings = {
      opacity: [0, 1], // Fade in
      easing: "easeInOutSine", // Use 'easeInOutSine' for smoother transitions
      duration: 1500, // Longer duration for a more gradual effect
    };

    // Staggered animation for the first child container (left side) images
    const leftContainers = document.querySelectorAll(
      ".grid-container .child-container:first-child .img-container"
    );

    leftContainers.forEach((container, index) => {
      anime({
        targets: container,
        translateX: [-30, 0], // Slide in from left based on index (staggered)
        ...animationSettings, // Apply opacity, easing, and duration
        delay: anime.stagger(2000, { start: index * 700 }), // Stagger based on index
      });
    });

    // Animation for the second child container (right side)
    anime({
      targets: ".grid-container .child-container:last-child",
      translateX: [30, 0], // Slide in from right to left
      ...animationSettings, // Apply opacity, easing, and duration
    });
  }

  // Intersection Observer to trigger animation when section comes into view
  let observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Element is in view, trigger animations
          initSmoothStaggeredAnimations();
          // Unobserve once animation is triggered
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  ); // Trigger when 20% of the section is visible

  // Target the section you want to observe
  let targetSection = document.querySelector(".most-visited-section");
  observer.observe(targetSection);
});

// newwwwww
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card-container .card-child");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.25,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        anime({
          targets: entry.target,
          opacity: [0, 1],
          scale: [0.9, 1],
          translateX: [100, 0],
          duration: 2500,
          easing: "easeOutCirc",
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  cards.forEach((card) => {
    observer.observe(card);
  });
});

// projects vertical line animation

// Projects page flip animation
document.addEventListener("DOMContentLoaded", () => {
  const childContainers = document.querySelectorAll(
    ".project-stack-section .child-container img"
  );
  const observerOptions = {
    threshold: 0.5, // Image must be 50% visible before triggering the animation
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        anime({
          targets: entry.target,
          rotateY: [-90, 0], // Flip along the Y-axis (depth effect)
          duration: 1500, // Adjust duration for desired speed
          easing: "easeInOutCubic", // Consider different easing
          opacity: [0, 1], // Fade in while flipping
          delay: 100, // Optional delay for smoother start
        });
        observer.unobserve(entry.target); // Unobserve after animation is done
      }
    });
  }, observerOptions);
  childContainers.forEach((img) => {
    observer.observe(img);
  });
});
// Projects year flip animation
document.addEventListener("DOMContentLoaded", () => {
  const yearContainer = document.querySelector(".vertical-year span"); // Target the span inside .vertical-year

  const observerOptions = {
    threshold: 0.1, // Image must be 50% visible before triggering the animation
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        anime({
          targets: entry.target,
          translateY: [35, 0], // Flip along the Y-axis (depth effect)
          duration: 3000, // Adjust duration for desired speed
          easing: "easeInOutCubic", // Consider different easing
          opacity: [0, 1], // Fade in while flipping
          delay: 700, // Optional delay for smoother start
        });
        observer.unobserve(entry.target); // Unobserve after animation is done
      }
    });
  }, observerOptions);

  observer.observe(yearContainer);
});
// appolo section animation
document.addEventListener("DOMContentLoaded", () => {
  const childContainer3 = document.querySelector(
    ".project-appolo-section .child-container:nth-of-type(3) img"
  );
  const childContainer1 = document.querySelector(
    ".project-appolo-section .child-container:nth-of-type(1) img"
  );
  const childContainer8 = document.querySelector(
    ".project-appolo-section .child-container:nth-of-type(8) img"
  );

  // Observer options for childContainer1 and childContainer3
  const observerOptions = {
    threshold: 0.5, // 50% visibility threshold
  };

  // Observer for childContainer8 with a different threshold
  const observerOptionsForChild8 = {
    threshold: 0.1, // 20% visibility threshold for smoother early trigger
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const isFirstChild = entry.target === childContainer1;

        const delayValue = entry.target === childContainer3 ? 0 : 500;

        anime({
          targets: entry.target,
          rotateY: isFirstChild ? [-90, 0] : [90, 0], // Rotate for first and third
          duration: 1500,
          easing: "easeInOutCubic", // Smooth easing
          opacity: [0, 1], // Fade-in effect
          delay: delayValue, // Stagger animations
        });

        observer.unobserve(entry.target); // Stop observing after animation
      }
    });
  }, observerOptions);

  const observerForChild8 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        anime({
          targets: entry.target,
          translateY: [-200, 0], // Slide in from top for childContainer8
          duration: 1500,
          easing: "easeInOutCubic", // Smooth easing
          opacity: [0, 1], // Fade-in effect
          delay: 500, // Stagger animation for the last image
        });

        observerForChild8.unobserve(entry.target); // Stop observing after animation
      }
    });
  }, observerOptionsForChild8);

  // Observing images in the required order
  observer.observe(childContainer3);
  observer.observe(childContainer1);
  observerForChild8.observe(childContainer8); // Apply the specific observer for childContainer8
});
//products page banner animation
document.addEventListener("DOMContentLoaded", () => {
  // Select the elements for animation
  const secondChild = document.querySelector(
    ".product-top-section .grid-container .child-container:nth-of-type(2)"
  );
  const h1Elements = document.querySelectorAll(
    ".product-top-section .grid-container .child-container:last-child h1:nth-child(n+2)"
  );
  const firstChild = document.querySelector(
    ".product-top-section .grid-container .child-container:first-child"
  );

  // Set initial styles for the first child to be hidden
  firstChild.style.opacity = 0; // Ensures it's hidden before animation

  // Create an intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Start animation for the second child (fade in and zoom)
          anime({
            targets: secondChild,
            opacity: [0, 1],
            scale: [0.5, 1],
            duration: 3000,
            easing: "easeOutExpo",
            begin: () => {
              // Start the slide-in animation for the first child after the second child is visible
              anime({
                targets: firstChild,
                opacity: [0, 1],
                translateX: [100, 0], // Slide in from the left
                duration: 2000,
                easing: "easeOutExpo",
                delay: 800, // Delay to start after second child starts to fade in
              });
              h1Elements.forEach((h1, index) => {
                anime({
                  targets: h1,
                  rotateX: [-90, 0], // Normal calendar flip effect
                  duration: 2000, // Adjust the duration for smoother effect
                  opacity: [0, 1],
                  easing: "easeOutCubic", // Easing for a more natural fall effect
                  delay: 700 + index * 700, // Delay for each h1 so they flip one by one
                  perspective: 1000, // Set the perspective for the animation
                });
              });
            },
          });

          // Stop observing once the animation has started
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 } // Trigger when 10% of the second child is visible
  );

  // Observe the second child
  observer.observe(secondChild);
});
// product page sculpture animation
document.addEventListener("DOMContentLoaded", () => {
  // Select the elements for animation
  const firstChild = document.querySelector(
    ".product-image-container .grid-container .child-container:first-child"
  );

  // Select the h1 elements inside the last child container
  const secondChild = document.querySelectorAll(
    ".product-image-container .grid-container .child-container:last-child h1:nth-of-type(n+2)"
  );

  // Select the description (p) elements inside the last child container
  const description = document.querySelectorAll(
    ".product-image-container .grid-container .child-container:last-child p"
  );

  // Ensure both elements are selected correctly
  console.log(firstChild);
  console.log(secondChild);

  // Create an intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Start animation for the first child (fade in and zoom)
          anime({
            targets: firstChild,
            opacity: [0, 1],
            scale: [0.4, 1],
            duration: 3500,
            easing: "easeOutExpo",
            begin: () => {
              // Animate the h1 elements one by one with flip effect
              secondChild.forEach((h1, index) => {
                anime({
                  targets: h1,
                  rotateX: [-90, 0], // Calendar-like flip effect
                  duration: 2000, // Duration for smoother effect
                  opacity: [0, 1], // Fade in effect with flip
                  easing: "easeOutCubic", // Easing for natural fall effect
                  delay: 700 + index * 700, // Delay for each h1 so they flip one by one
                });
              });

              // After the h1 elements are done, animate the description (p) elements
              anime({
                targets: description,
                translateX: [-120, 0], // Slide in from the left
                opacity: [0, 1], // Fade in effect
                duration: 2500,
                easing: "easeOutCubic", // Smooth easing for description
                delay: secondChild.length * 700 + 700, // Ensure it happens after the h1 elements flip
              });
            },
          });

          // Stop observing once the animation has started
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 } // Trigger when 30% of the first child is visible
  );

  // Observe the container (last child) that holds the h1 elements
  const lastChildContainer = document.querySelector(
    ".product-image-container .grid-container .child-container:last-child"
  );
  observer.observe(lastChildContainer);
});
// news page animation

document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null, // Uses the viewport as the root
    threshold: 0.4, // Trigger when 10% of the element is visible
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Fade in image from the right
        anime({
          targets: ".news-top-section img",
          translateX: [-100, 0], // Start from 100px to the right
          opacity: [0, 1], // Fade in from 0 to 1
          duration: 2000, // Animation duration
          easing: "easeOutCubic",
        });

        // Fade in h2 from the right
        anime({
          targets: ".news-top-section .text-container h2",
          translateX: [100, 0], // Start from 100px to the right
          opacity: [0, 1], // Fade in from 0 to 1
          duration: 1500, // Animation duration
          easing: "easeOutCubic",
          delay: 700, // Delay to start after image animation
          begin: () => {
            // Slide in p tag from the top after h2 animation completes
            anime({
              targets: ".news-top-section .text-container p",
              translateY: [-90, 0], // Start from 50px above
              opacity: [0, 1], // Fade in from 0 to 1
              duration: 1500, // Animation duration
              easing: "easeOutCubic",
              delay: 1700, // Slight delay to make it sequential
            });
          },
        });

        // Stop observing the element after the animation is triggered
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  const targetElement = document.querySelector(".news-top-section");

  // Observe the target element
  if (targetElement) {
    observer.observe(targetElement);
  }
});

//brands logo rotate animations
const logos = document.querySelectorAll(".brand-logos .child-container img");

// Apply hover event to each logo
logos.forEach((logo) => {
  // On hover
  logo.addEventListener("mouseenter", () => {
    anime({
      targets: logo,
      rotateY: [0, 360], // Full 360-degree flip
      duration: 500, // Animation duration
      translateY: -20, // Translate up by 10px
      scale: 1.1,
      easing: "easeInOutQuad", // Easing for smooth effect
    });
  });

  // On mouse leave (reverse animation)
  logo.addEventListener("mouseleave", () => {
    anime({
      targets: logo,
      rotateY: [360, 0], // Rotate back to original position
      duration: 500,
      translateY: 0, // Return to original position
      scale: 1,
      easing: "easeInOutQuad",
    });
  });
});
//images vertical text animation
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null, // Uses the viewport as the root
    threshold: 0.1, // Trigger when 10% of the element is visible
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Animate the h1 element
        anime({
          targets: ".vertical-text-container h1",
          translateY: [35, 0], // Move up from 35px to 0px
          opacity: [0, 1], // Fade in from 0 to 1
          duration: 2000, // Animation duration
          easing: "easeOutCubic",
        });

        // Animate the p element after the h1 animation completes
        anime({
          targets: ".vertical-text-container p",
          translateY: [35, 0], // Move up from 35px to 0px
          opacity: [0, 1], // Fade in from 0 to 1
          duration: 2000, // Animation duration
          easing: "easeOutCubic",
          delay: 1000, // Delay the p animation to happen after h1
          begin: () => {
            // Add more sequential animations here if needed
          },
        });

        // Stop observing the element after the animation is triggered
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  const targetElement = document.querySelector(".vertical-text-container");

  // Observe the target element
  if (targetElement) {
    observer.observe(targetElement);
  }
});
// gallery page animations
//vertical year animation
