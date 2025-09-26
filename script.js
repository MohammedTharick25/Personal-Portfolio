// script.js
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const loader = document.querySelector(".loader");
  const customCursor = document.querySelector(".custom-cursor");
  const header = document.querySelector("header");
  const projectModal = document.getElementById("projectModal");
  const closeModalButton = projectModal?.querySelector(".close-button");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");
  const closeMobileMenuButton = document.querySelector(".close-mobile-menu"); // New close button

  // Function to close the mobile menu
  const closeMobileMenu = () => {
    if (navLinks.classList.contains("mobile-active")) {
      navLinks.classList.remove("mobile-active");
      hamburger.classList.remove("active");
      body.style.overflow = "auto"; // Re-enable scrolling
    }
  };

  // --- Mobile Navigation Toggle ---
  // Close mobile nav when a link is clicked
  document.querySelectorAll(".nav-links li a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Handle clicking the dedicated close button
  closeMobileMenuButton?.addEventListener("click", closeMobileMenu);

  // Toggle mobile navigation on hamburger click
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-active");
    hamburger.classList.toggle("active");
    // Prevent body scrolling when mobile menu is open
    body.style.overflow = navLinks.classList.contains("mobile-active")
      ? "hidden"
      : "auto";
  });

  // --- GSAP Setup (Ensure content is visible before animations) ---
  if (window.gsap) {
    gsap.set("p, .hero-subtitle, .hero-tagline", {
      opacity: 1,
      visibility: "visible",
    });
  }

  // --- Loading Screen ---
  window.addEventListener("load", () => {
    if (loader) {
      if (window.gsap) {
        gsap.to(loader, {
          opacity: 0,
          visibility: "hidden",
          duration: 0.5,
          delay: 0.5,
          onComplete: () => {
            loader.style.display = "none";
            initAnimations();
            initInteractiveElements();
          },
        });
      } else {
        loader.style.opacity = 0;
        setTimeout(() => {
          loader.style.display = "none";
          initAnimations();
          initInteractiveElements();
        }, 600);
      }
    } else {
      // If no loader, initialize directly
      initAnimations();
      initInteractiveElements();
    }
  });

  // --- Custom Cursor ---
  // Only enable if customCursor element exists and pointer is fine (desktop)
  if (customCursor && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", (e) => {
      if (window.gsap) {
        gsap.to(customCursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out",
        });
      } else {
        customCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    });

    document
      .querySelectorAll(
        "a, button, .project-card, .skill-star, .close-button, .theme-toggle-button, .social-link, .cta-button, .download-cv-button, .close-mobile-menu" // Added new interactive elements
      )
      .forEach((el) => {
        el.addEventListener("mouseenter", () =>
          customCursor.classList.add("hovered")
        );
        el.addEventListener("mouseleave", () =>
          customCursor.classList.remove("hovered")
        );
      });
  } else if (customCursor) {
    // If not desktop or customCursor not present, hide it
    customCursor.style.display = "none";
  }

  // --- Header Scroll Effect ---
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  // --- Dummy Project Data ---
  const projectsData = {
    project1: {
      title: "Eclat Dine - Enchanted Restaurant",
      image: "eclat-dine.png",
      description:
        "Eclat Dine is a sleek, high-end restaurant website crafted with HTML5, CSS3, and vanilla JavaScript for a seamless user experience. The site features a responsive design, smooth animations, and an elegant UI to reflect luxury dining. Key functionalities include an interactive menu, table reservation system, and dynamic content loading—all powered by pure JavaScript without external frameworks.",
      tags: ["HTML5", "CSS3", "JavaScript", "GSAP", "Responsive Design"],
      liveLink: "https://eclat-dine.netlify.app/",
    },
    project2: {
      title: "Solo Levelling System",
      image: "system-interface.png",
      description:
        "Solo Leveling System is a dynamic, interactive website inspired by the popularity of the solo leveling webtoon. Built with HTML5, CSS3, and JavaScript, it features a responsive design that adapts to various devices. The site includes a visually stunning hero section with smooth animations powered by GSAP, an interactive character selection system, and detailed information about the solo leveling universe.",
      tags: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "React",
        "Responsive Design",
        "Node.js",
      ],
      liveLink: "https://solo-leveling-system.netlify.app/",
    },
    project3: {
      title: "Etch-A-Sketch Game",
      image: "etch-a-sketch.png",
      description:
        "A browser-based drawing app inspired by the classic Etch-a-Sketch toy. Users can draw by hovering over a customizable grid and switch between different modes including solid color, grayscale shading, and rainbow mode. The app also includes controls for resizing the grid and resetting the board.",
      tags: ["HTML5", "CSS3", "JavaScript", "GSAP", "Responsive Design"],
      liveLink: "https://odin-etch-a-sketch.netlify.app/",
    },
    project4: {
      title: "Mystic Motors - Transportation Service",
      image: "mystic-motors.png",
      description:
        "Mystic Motors is a transportation service website designed to provide users with a seamless booking experience. Built using HTML5, CSS3, and JavaScript, the site features a responsive design that adapts to various devices. The homepage showcases a stunning hero section with smooth animations powered by GSAP, along with an interactive booking form and service details.",
      tags: ["HTML5", "CSS3", "JavaScript", "GSAP", "Responsive Design"],
      liveLink: "https://mohammedtharick25.github.io/Mystic-Motors/",
    },
    project5: {
      title: "Readify - Online Book Store",
      image: "readify.png",
      description:
        "A sleek and modern online book store platform designed for book lovers. Built using HTML5, CSS3, and JavaScript, this responsive website allows users to browse, search, and explore a curated collection of books across various genres. Featuring a visually appealing UI, animated transitions, and a clean layout, the platform delivers a smooth and engaging user experience. Ideal for showcasing popular titles, author highlights, and reader reviews, the site is optimized for both desktop and mobile devices.",
      tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      liveLink: "https://readify-book-website.netlify.app/",
    },
  };

  // --- Animations with GSAP ---
  function initAnimations() {
    if (!window.gsap) {
      console.warn("GSAP not loaded. Skipping animations.");
      return;
    }

    // Register ScrollTrigger if available
    if (gsap.registerPlugin) {
      try {
        gsap.registerPlugin(ScrollTrigger);
      } catch (e) {
        console.warn("GSAP ScrollTrigger plugin not registered:", e);
      }
    }

    // Hero Section Animations
    gsap.from(".hero-title span", {
      duration: 0.8,
      opacity: 0,
      y: 80,
      stagger: 0.05,
      ease: "back.out(1.7)",
      delay: 0.2,
    });
    gsap.from(".hero-subtitle", {
      duration: 0.8,
      opacity: 0,
      y: 30,
      ease: "power2.out",
      delay: 0.7,
    });
    gsap.from(".hero-tagline", {
      duration: 0.8,
      opacity: 0,
      y: 30,
      ease: "power2.out",
      delay: 0.9,
    });
    gsap.from(".hero-section .cta-button", {
      duration: 0.8,
      opacity: 0,
      scale: 0.8,
      ease: "elastic.out(1, 0.75)",
      delay: 1.2,
    });

    // Animate sections on scroll
    gsap.utils.toArray("section:not(#hero)").forEach((section) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom center",
          toggleActions: "play none none none", // Play animation once when entering viewport
        },
      });

      const sectionTitle = section.querySelector("h2");
      if (sectionTitle)
        tl.from(
          sectionTitle,
          { opacity: 0, y: 30, duration: 0.6, ease: "power2.out" },
          0
        );

      // Section-specific animations
      if (section.id === "about") {
        const aboutImage = section.querySelector(".about-image img");
        const aboutParagraphs = section.querySelectorAll(".about-text p");
        if (aboutImage)
          tl.from(
            aboutImage,
            { opacity: 0, y: -50, duration: 0.8, ease: "power3.out" }, // Animate Y position for top-down
            0.2
          );
        if (aboutParagraphs.length)
          tl.from(
            aboutParagraphs,
            {
              opacity: 0,
              y: 50, // Animate Y position for top-down
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
            },
            0.3
          );
      }

      if (section.id === "projects") {
        const projectCards = section.querySelectorAll(".project-card");
        if (projectCards.length)
          tl.from(
            projectCards,
            {
              opacity: 0,
              y: 60,
              duration: 0.6,
              stagger: 0.1,
              ease: "power3.out",
            },
            0.2
          );
      }

      if (section.id === "skills") {
        const stars = section.querySelectorAll(".skill-star");
        if (stars.length) {
          gsap.set(stars, { opacity: 1, scale: 1 }); // Ensure stars are visible before animating
          tl.from(
            stars,
            {
              opacity: 0,
              scale: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "back.out(1.7)",
              onComplete: () =>
                drawSkillConnections(
                  [
                    { from: "html", to: "css" },
                    { from: "css", to: "js" },
                    { from: "js", to: "react" },
                    { from: "js", to: "node" },
                    { from: "js", to: "gsap" },
                    { from: "react", to: "node" },
                    { from: "python", to: "node" },
                  ],
                  document.getElementById("skillsConstellation")
                ),
            },
            0.2
          );
        }
      }

      if (section.id === "contact") {
        const formElements = section.querySelectorAll(
          ".form-group, .submit-rune"
        );
        if (formElements.length)
          tl.from(
            formElements,
            {
              opacity: 0,
              y: 50,
              duration: 0.5,
              stagger: 0.1,
              ease: "power2.out",
            },
            0.2
          );
      }
    });
  }

  // --- Skill Connections Drawing ---
  function drawSkillConnections(connections, container) {
    if (!container) return;
    // Remove existing lines before drawing new ones
    container
      .querySelectorAll(".skill-connection-line")
      .forEach((el) => el.remove());

    connections.forEach(({ from, to }) => {
      const starA = container.querySelector(`.skill-star[data-id='${from}']`);
      const starB = container.querySelector(`.skill-star[data-id='${to}']`);
      if (!starA || !starB) {
        console.warn(
          `Could not find skill stars for connection: ${from} to ${to}`
        );
        return;
      }

      const line = document.createElement("div");
      line.classList.add("skill-connection-line");

      // Calculate positions relative to the container
      const containerRect = container.getBoundingClientRect();
      const rectA = starA.getBoundingClientRect();
      const rectB = starB.getBoundingClientRect();

      const x1 = rectA.left - containerRect.left + rectA.width / 2;
      const y1 = rectA.top - containerRect.top + rectA.height / 2;
      const x2 = rectB.left - containerRect.left + rectB.width / 2;
      const y2 = rectB.top - containerRect.top + rectB.height / 2;

      const length = Math.hypot(x2 - x1, y2 - y1);
      const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

      Object.assign(line.style, {
        width: `${length}px`,
        left: `${x1}px`,
        top: `${y1}px`,
        transform: `rotate(${angle}deg)`,
        opacity: 0, // Start invisible for animation
      });

      container.appendChild(line);
      if (window.gsap) gsap.to(line, { opacity: 1, duration: 0.6 });
    });
  }

  // --- Initialize Interactive Elements (Modals, Tooltips, Theme) ---
  function initInteractiveElements() {
    // --- Project Modal ---
    if (projectModal) {
      document.querySelectorAll(".project-link").forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const projectId = e.currentTarget.dataset.projectId;
          const data = projectsData[projectId];
          if (!data) {
            console.error(`Project data not found for ID: ${projectId}`);
            return;
          }

          projectModal.querySelector("#modalProjectTitle").textContent =
            data.title;
          const modalImage = projectModal.querySelector("#modalProjectImage");
          modalImage.src = data.image;
          modalImage.alt = `Screenshot of ${data.title}`;
          projectModal.querySelector("#modalProjectDescription").textContent =
            data.description;

          const techContainer = projectModal.querySelector("#modalProjectTech");
          techContainer.innerHTML = ""; // Clear previous tags
          data.tags.forEach((tag) => {
            const span = document.createElement("span");
            span.textContent = tag;
            techContainer.appendChild(span);
          });

          const modalLink = projectModal.querySelector("#modalProjectLink");
          modalLink.href = data.liveLink;

          projectModal.classList.add("visible");
          body.style.overflow = "hidden"; // Prevent scrolling when modal is open
          projectModal.setAttribute("aria-hidden", "false");
          closeModalButton?.focus(); // Focus close button for accessibility
        });
      });

      const closeModal = () => {
        projectModal.classList.remove("visible");
        body.style.overflow = "auto"; // Re-enable scrolling
        projectModal.setAttribute("aria-hidden", "true");
      };

      closeModalButton?.addEventListener("click", closeModal);
      projectModal.addEventListener("click", (e) => {
        if (e.target === projectModal) closeModal(); // Close if clicking outside modal content
      });
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && projectModal.classList.contains("visible"))
          closeModal();
      });
    }

    // --- Skills Tooltip ---
    const skillsConstellationEl = document.getElementById(
      "skillsConstellation"
    );
    const skillTooltipEl = document.getElementById("skillTooltip");
    if (skillsConstellationEl && skillTooltipEl) {
      skillsConstellationEl.querySelectorAll(".skill-star").forEach((star) => {
        star.addEventListener("mouseenter", () => {
          skillTooltipEl.textContent = star.dataset.skill;
          gsap.set(skillTooltipEl, { opacity: 1, visibility: "visible" });

          const starRect = star.getBoundingClientRect();
          const wrapperRect =
            skillsConstellationEl.parentElement.getBoundingClientRect();
          const tooltipX =
            starRect.left - wrapperRect.left + star.offsetWidth / 2;
          const tooltipY = starRect.top - wrapperRect.top;
          gsap.to(skillTooltipEl, {
            left: `${tooltipX}px`,
            top: `${tooltipY}px`,
            duration: 0.15,
            ease: "power2.out",
          });
        });

        star.addEventListener("mouseleave", () => {
          gsap.to(skillTooltipEl, {
            opacity: 0,
            visibility: "hidden",
            duration: 0.15,
          });
        });
      });
    }

    // --- Footer Year ---
    const yearSpan = document.getElementById("year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // --- Theme Toggle ---
    const themeToggleButton = document.getElementById("theme-toggle");
    const sunIcon = themeToggleButton?.querySelector(".icon-sun");
    const moonIcon = themeToggleButton?.querySelector(".icon-moon");

    const applyTheme = (theme) => {
      document.body.classList.toggle("dark-mode", theme === "dark");
      if (sunIcon && moonIcon) {
        sunIcon.style.display = theme === "dark" ? "none" : "inline";
        moonIcon.style.display = theme === "dark" ? "inline" : "none";
      }
      localStorage.setItem("theme", theme);
    };

    if (themeToggleButton && sunIcon && moonIcon) {
      const savedTheme = localStorage.getItem("theme");
      // Apply saved theme or system preference
      if (savedTheme) applyTheme(savedTheme);
      else
        applyTheme(
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
        );

      themeToggleButton.addEventListener("click", () => {
        applyTheme(
          document.body.classList.contains("dark-mode") ? "light" : "dark"
        );
      });
    }

    // --- Form Floating Labels (handles autofill and pre-filled inputs) ---
    document
      .querySelectorAll(".form-group input, .form-group textarea")
      .forEach((input) => {
        // Check on load
        if (input.value) {
          input.closest(".form-group").classList.add("filled");
        }
        // Check on change
        input.addEventListener("input", () => {
          if (input.value) {
            input.closest(".form-group").classList.add("filled");
          } else {
            input.closest(".form-group").classList.remove("filled");
          }
        });
        // Handle browser autofill detection with a delay
        input.addEventListener("focus", () => {
          setTimeout(() => {
            if (input.value) {
              input.closest(".form-group").classList.add("filled");
            }
          }, 100);
        });
        input.addEventListener("blur", () => {
          if (!input.value) {
            input.closest(".form-group").classList.remove("filled");
          }
        });
      });
  }
});

