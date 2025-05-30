// script.js
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const loader = document.querySelector('.loader');
    const customCursor = document.querySelector('.custom-cursor');
    const header = document.querySelector('header');
    const projectModal = document.getElementById('projectModal');
    const closeModalButton = projectModal ? projectModal.querySelector('.close-button') : null;

    // First make sure all content is visible before animations
    gsap.set("p, .hero-subtitle, .hero-tagline", {
        opacity: 1,
        visibility: 'visible'
    });

    // --- Loading Screen ---
    window.addEventListener('load', () => {
        if (loader) {
            gsap.to(loader, {
                opacity: 0,
                visibility: 'hidden',
                duration: 0.5,
                delay: 0.5,
                onComplete: () => {
                    if (loader) loader.style.display = 'none';
                    initAnimations();
                    initInteractiveElements();
                }
            });
        } else {
            initAnimations();
            initInteractiveElements();
        }
    });

    // --- Custom Cursor ---
    if (customCursor && window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('mousemove', e => {
            gsap.to(customCursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            });
        });
        
        document.querySelectorAll('a, button, .project-card, .skill-star, .close-button, .theme-toggle-button').forEach(el => {
            el.addEventListener('mouseenter', () => customCursor.classList.add('hovered'));
            el.addEventListener('mouseleave', () => customCursor.classList.remove('hovered'));
        });
    } else if (customCursor) {
        customCursor.style.display = 'none';
    }

    // --- Header Scroll Effect ---
    if(header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Dummy Project Data
    const projectsData = {
        project1: {
            title: "Eclat Dime - Enchanted Restaurant",
            image: "eclat dime.png",
            description: "Eclat Dine is a sleek, high-end restaurant website crafted with HTML5, CSS3, and vanilla JavaScript for a seamless user experience. The site features a responsive design, smooth animations, and an elegant UI to reflect luxury dining. Key functionalities include an interactive menu, table reservation system, and dynamic content loading—all powered by pure JavaScript without external frameworks.",
            tags: ["HTML5", "CSS3", "JavaScript","GSAP", "Responsive Design"],
            liveLink: "https://mohammedtharick25.github.io/Eclat-Dime-Restaurant/"
        },
        project2: {
            title: "Solo Levelling System",
            image: "system interface.png",
            description: "solo levelling system is a dynamic, interactive website inspired by the popularity of the solo leveling webtoon. Built with HTML5, CSS3, and JavaScript, it features a responsive design that adapts to various devices. The site includes a visually stunning hero section with smooth animations powered by GSAP, an interactive character selection system, and detailed information about the solo leveling universe.",
            tags: ["HTML5", "CSS3", "JavaScript","React", "Responsive Design","Node.js"],
            liveLink: "https://mohammedtharick25.github.io/solo-levelling-system/" // Replace with actual link if available
        },
        project3: {
            title: "Mystic Motors - Transportation Service",
            image: "mystic motors.png",
            description: "Mystic Motors is a transportation service website designed to provide users with a seamless booking experience. Built using HTML5, CSS3, and JavaScript, the site features a responsive design that adapts to various devices. The homepage showcases a stunning hero section with smooth animations powered by GSAP, along with an interactive booking form and service details.",
            tags: ["HTML5", "CSS3", "JavaScript","GSAP", "Responsive Design"],
            liveLink: "https://mohammedtharick25.github.io/Mystic-Motors/"
        }
    };

    function initAnimations() {
        // --- Hero Section Animations ---
        gsap.from(".hero-title span", { 
            duration: 0.8, 
            opacity: 0, 
            y: 80, 
            stagger: 0.05, 
            ease: "back.out(1.7)", 
            delay: 0.2 
        });
        
        gsap.from(".hero-subtitle", { 
            duration: 0.8, 
            opacity: 0, 
            y: 30, 
            ease: "power2.out", 
            delay: 0.7 
        });
        
        gsap.from(".hero-tagline", { 
            duration: 0.8, 
            opacity: 0, 
            y: 30, 
            ease: "power2.out", 
            delay: 0.9 
        });
        
        gsap.from(".hero-section .cta-button", { 
            duration: 0.8, 
            opacity: 0, 
            scale: 0.8, 
            ease: "elastic.out(1, 0.75)", 
            delay: 1.2 
        });

        // --- ScrollTrigger Animations for other sections ---
        gsap.utils.toArray('section:not(#hero)').forEach((section) => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                    end: "bottom center",
                    toggleActions: "play none none none",
                    markers: false // Set to true for debugging ScrollTrigger
                }
            });

            const sectionTitle = section.querySelector('h2');
            if (sectionTitle) {
                tl.from(sectionTitle, { 
                    opacity: 0, 
                    y: 30, 
                    duration: 0.6, 
                    ease: "power2.out"
                }, 0);
            }

            if (section.id === 'about') {
                const aboutImage = section.querySelector('.about-image img');
                const aboutParagraphs = section.querySelectorAll('.about-text p');

                if (aboutImage) {
                    tl.from(aboutImage, { 
                        opacity: 0, 
                        x: -80, 
                        duration: 0.8, 
                        ease: "power3.out" 
                    }, 0.2);
                }
                if (aboutParagraphs.length > 0) {
                    tl.from(aboutParagraphs, { 
                        opacity: 0, 
                        x: 80, 
                        duration: 0.8, 
                        stagger: 0.15, 
                        ease: "power3.out",
                        onComplete: function() {
                            gsap.set(aboutParagraphs, { clearProps: "opacity,x" });
                        }
                    }, 0.3);
                }
            }
            
            if (section.id === 'projects') {
                const projectCards = section.querySelectorAll('.project-card');
                if (projectCards.length > 0) {
                    tl.from(projectCards, { 
                        opacity: 0, 
                        y: 60, 
                        duration: 0.6, 
                        stagger: 0.1, 
                        ease: "power3.out" 
                    }, 0.2);
                }
            }
            
            if (section.id === 'skills') {
                const stars = section.querySelectorAll('.skill-star');
                
                if (stars.length > 0) {
                    // Ensure stars are visible before animation if previously hidden
                    gsap.set(stars, { opacity: 1, scale: 1 });
                    
                    tl.from(stars, {
                        opacity: 0,
                        scale: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "back.out(1.7)",
                        onComplete: function() {
                            gsap.set(stars, { clearProps: "opacity,scale" });
                            // Draw connections after stars animate in
                            const connections = [
                                { from: 'html', to: 'css' },
                                { from: 'css', to: 'js' },
                                { from: 'js', to: 'react' },
                                { from: 'js', to: 'node' },
                                { from: 'js', to: 'gsap' },
                                { from: 'react', to: 'node' },
                                { from: 'python', to: 'node' }
                            ];
                            const skillsConstellationEl = document.getElementById('skillsConstellation');
                            if(skillsConstellationEl) { // Check if element exists
                                drawSkillConnections(connections, skillsConstellationEl);
                                
                                // Animate in the connection lines
                                const lines = skillsConstellationEl.querySelectorAll('.skill-connection-line');
                                if (lines.length > 0) {
                                    gsap.from(lines, {
                                        opacity: 0,
                                        duration: 0.6,
                                        stagger: 0.05,
                                        ease: "power2.out"
                                    });
                                }
                            }
                        }
                    }, 0.2);
                }
            }
            
            if (section.id === 'contact') {
                const formElements = section.querySelectorAll('.form-group, .submit-rune');
                if (formElements.length > 0) {
                    tl.from(formElements, { 
                        opacity: 0, 
                        y: 50, 
                        duration: 0.5, 
                        stagger: 0.1, 
                        ease: "power2.out" 
                    }, 0.2);
                }
            }
        });
    }

    function drawSkillConnections(connections, container) {
        if (!container) return; // Guard clause
        // Clear any existing lines first
        container.querySelectorAll('.skill-connection-line').forEach(el => el.remove());
        
        connections.forEach(conn => {
            const starA = container.querySelector(`.skill-star[data-id='${conn.from}']`);
            const starB = container.querySelector(`.skill-star[data-id='${conn.to}']`);

            if (starA && starB) {
                const line = document.createElement('div');
                line.classList.add('skill-connection-line');

                const rectA = starA.getBoundingClientRect();
                const rectB = starB.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();

                const x1 = rectA.left - containerRect.left + rectA.width / 2;
                const y1 = rectA.top - containerRect.top + rectA.height / 2;
                const x2 = rectB.left - containerRect.left + rectB.width / 2;
                const y2 = rectB.top - containerRect.top + rectB.height / 2;

                const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

                line.style.width = `${length}px`;
                line.style.left = `${x1}px`;
                line.style.top = `${y1}px`;
                line.style.transform = `rotate(${angle}deg)`;
                line.style.opacity = 0; // Start with opacity 0 for GSAP animation

                container.appendChild(line);
            }
        });
    }

    function initInteractiveElements() {
        // --- Project Modal Logic ---
        if (projectModal) {
            const projectLinks = document.querySelectorAll('.project-link');
            projectLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const projectId = e.currentTarget.dataset.projectId;
                    const data = projectsData[projectId];
                    if (data) {
                        const modalTitle = projectModal.querySelector('#modalProjectTitle');
                        const modalImage = projectModal.querySelector('#modalProjectImage');
                        const modalDescription = projectModal.querySelector('#modalProjectDescription');
                        const techContainer = projectModal.querySelector('#modalProjectTech');
                        const modalLink = projectModal.querySelector('#modalProjectLink');

                        if (modalTitle) modalTitle.textContent = data.title;
                        if (modalImage) {
                            modalImage.src = data.image;
                            modalImage.alt = data.title;
                        }
                        if (modalDescription) modalDescription.textContent = data.description;

                        if (techContainer) {
                            techContainer.innerHTML = '';
                            data.tags.forEach(tag => {
                                const span = document.createElement('span');
                                span.textContent = tag;
                                techContainer.appendChild(span);
                            });
                        }
                        if (modalLink) modalLink.href = data.liveLink;

                        projectModal.classList.add('visible');
                        body.style.overflow = 'hidden';
                    }
                });
            });

            if (closeModalButton) {
                closeModalButton.addEventListener('click', () => {
                    projectModal.classList.remove('visible');
                    body.style.overflow = 'auto';
                });
            }
            
            projectModal.addEventListener('click', (e) => {
                if (e.target === projectModal) {
                    projectModal.classList.remove('visible');
                    body.style.overflow = 'auto';
                }
            });
            
            window.addEventListener('keydown', (e) => {
                if (e.key === "Escape" && projectModal.classList.contains('visible')) {
                    projectModal.classList.remove('visible');
                    body.style.overflow = 'auto';
                }
            });
        }

        // --- Skills Constellation Tooltip ---
        const skillsConstellationEl = document.getElementById('skillsConstellation');
        const skillTooltipEl = document.getElementById('skillTooltip');

        if (skillsConstellationEl && skillTooltipEl) {
            const skillStars = skillsConstellationEl.querySelectorAll('.skill-star');

            skillStars.forEach(star => {
                star.addEventListener('mouseenter', (e) => {
                    const skillName = star.dataset.skill;
                    skillTooltipEl.textContent = skillName;
                    
                    gsap.set(skillTooltipEl, { opacity: 1, visibility: 'visible' }); // Ensure it's truly visible for GSAP

                    const starRect = star.getBoundingClientRect();
                    const wrapperRect = skillsConstellationEl.parentElement ? skillsConstellationEl.parentElement.getBoundingClientRect() : {left: 0, top: 0};

                    let tooltipX = starRect.left - wrapperRect.left + (star.offsetWidth / 2);
                    let tooltipY = starRect.top - wrapperRect.top; // Position above star

                    gsap.to(skillTooltipEl, {
                        left: `${tooltipX}px`,
                        top: `${tooltipY}px`,
                        duration: 0.15,
                        ease: "power2.out"
                    });
                });
                
                star.addEventListener('mouseleave', () => {
                    gsap.to(skillTooltipEl, { 
                        opacity: 0, 
                        visibility: 'hidden', 
                        duration: 0.15,
                        onComplete: () => skillTooltipEl.classList.remove('visible') // Also remove class if needed by other logic
                    });
                });
            });
        }
    }

    // --- Footer Year ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Contact Form Submission ---
    const contactForm = document.querySelector('.contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Form submission is for demo purposes. You need to set up a backend endpoint for this to work.');
            this.reset(); 
        });
    }

    // --- Theme Toggle ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const sunIcon = themeToggleButton ? themeToggleButton.querySelector('.icon-sun') : null;
    const moonIcon = themeToggleButton ? themeToggleButton.querySelector('.icon-moon') : null;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'inline';
        } else {
            document.body.classList.remove('dark-mode');
            if (sunIcon) sunIcon.style.display = 'inline';
            if (moonIcon) moonIcon.style.display = 'none';
        }
    };

    if (themeToggleButton && sunIcon && moonIcon) { // Ensure all elements exist
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            applyTheme(savedTheme);
        } else {
            // Default to light theme, or check system preference
            // const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            // applyTheme(prefersDark ? 'dark' : 'light');
             applyTheme('light'); // Defaulting to light
        }

        themeToggleButton.addEventListener('click', () => {
            const isDarkMode = document.body.classList.contains('dark-mode');
            if (isDarkMode) {
                applyTheme('light');
                localStorage.setItem('theme', 'light');
            } else {
                applyTheme('dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
});