document.addEventListener('DOMContentLoaded', function() {
    // Check if the device is mobile
    const isMobile = window.innerWidth < 768;
    
    // Initialize the appropriate visualization based on device type
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        if (isMobile) {
            // Initialize particles.js for mobile
            initParticlesJS();
        } else {
            console.log("Desktop device detected, creating neural network");
            const heroBackground = document.querySelector('.hero-section');
            
            if (!heroBackground) {
                console.error("Hero background element not found!");
                return;
            }
            
            const canvas = document.createElement('canvas');
            canvas.id = 'neural-network';
            canvas.style.position = 'relative';  // Position it absolutely
            canvas.style.top = '0';              // At the top
            canvas.style.left = '0';             // At the left
            canvas.style.width = '100%';         // Full width
            canvas.style.height = '100%';        // Full height
            canvas.style.zIndex = '1';           // Keep it behind content
            heroBackground.style.position = 'relative';  // Make sure parent has relative positioning
            
            heroBackground.appendChild(canvas);
            console.log("Canvas created:", canvas);
            
            // Delay initialization slightly to ensure DOM is ready
            setTimeout(() => {
                initNeuralNetwork();
            }, 100);


            // console.log("Desktop device detected, creating neural network");
            // const canvas = document.createElement('canvas');
            // canvas.id = 'neural-network';
            // heroBackground.appendChild(canvas);
            // console.log("Canvas created:", canvas);
            // initNeuralNetwork();            
        }
    }
    
    // Typing effect and other initializations
    initTypingEffect();
    initMobileNav();
    initSmoothScroll();
    setupProjectFiltering();
    // setupFormValidation();
    setupScrollAnimations();
    setupStickyHeader();
    addDynamicStyles();
    
    // Set footer year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const wasDesktop = !isMobile;
        const nowMobile = window.innerWidth < 768;
        
        // If device type changed, reload the page to switch visualizations
        if (wasDesktop && nowMobile) {
            location.reload();
        } else if (!wasDesktop && !nowMobile) {
            location.reload();
        }
    });

    // toggle to switch education & experience
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const sections = document.querySelectorAll('.section-content');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the target section id
            const targetId = this.getAttribute('data-target');
            
            // Hide all sections
            sections.forEach(section => section.classList.remove('active'));
            
            // Show the target section
            document.getElementById(targetId).classList.add('active');
        });
    });




    // project carousel & fumctionality for next & prev button
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Project carousel
    const carouselArrows = document.querySelectorAll('.carousel-arrow');
    const mobileIndicators = document.querySelectorAll('.mobile-carousel-indicators .indicator');
    const desktopIndicators = document.querySelectorAll('.desktop-carousel-indicators .indicator');
    const totalGroups = 3; // Total number of project groups (9 projects / 3 per page)
    let currentGroup = 0;
    
    // Initialize carousel
    updateCarousel();
    
    // Filter functionality
    // filterButtons.forEach(button => {
    //     button.addEventListener('click', function() {
    //         // Remove active class from all buttons
    //         filterButtons.forEach(btn => btn.classList.remove('active'));
            
    //         // Add active class to clicked button
    //         this.classList.add('active');
            
    //         // Reset to first group when changing filters
    //         currentGroup = 0;
            
    //         // Update indicators
    //         updateAllIndicators();
            
    //         // Get filter value
    //         const filterValue = this.getAttribute('data-filter');
            
    //         // Filter projects
    //         filterProjects(filterValue);
    //     });
    // });
    
    // Carousel arrows functionality
    carouselArrows.forEach(arrow => {
        arrow.addEventListener('click', function() {
            if (this.classList.contains('prev-arrow')) {
                currentGroup = (currentGroup - 1 + totalGroups) % totalGroups;
            } else {
                currentGroup = (currentGroup + 1) % totalGroups;
            }
            
            updateCarousel();
        });
    });
    
    // Indicator functionality - bind events for both mobile and desktop indicators
    mobileIndicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            currentGroup = parseInt(this.getAttribute('data-index'));
            updateCarousel();
        });
    });
    
    desktopIndicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            currentGroup = parseInt(this.getAttribute('data-index'));
            updateCarousel();
        });
    });
    
    // Update carousel based on current group
    function updateCarousel() {
        // Get active filter
        // const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        
        // Filter projects
        // filterProjects(activeFilter);
        
        // Instead, just show the current group of projects
        showCurrentGroup();
    
        // Update indicators
        updateAllIndicators();
    }
    

    // Show only the current group of projects
    function showCurrentGroup() {
        // Hide all projects first
        projectCards.forEach(card => card.classList.add('hidden'));
        
        // Show only projects in the current group
        projectCards.forEach((card, index) => {
            const cardGroup = Math.floor(index / 3);
            if (cardGroup === currentGroup) {
                card.classList.remove('hidden');
            }
        });
    }

    // Filter projects based on category and current group
    // function filterProjects(filterValue) {
    //     // Hide all projects
    //     projectCards.forEach(card => card.classList.add('hidden'));
        
    //     // Show projects for current group and filter
    //     projectCards.forEach((card, index) => {
    //         const cardGroup = Math.floor(index / 3);
            
    //         if (cardGroup === currentGroup) {
    //             if (filterValue === 'all') {
    //                 card.classList.remove('hidden');
    //             } else {
    //                 const cardCategories = card.getAttribute('data-category').split(' ');
    //                 if (cardCategories.includes(filterValue)) {
    //                     card.classList.remove('hidden');
    //                 }
    //             }
    //         }
    //     });
    // }
    
    // Update all indicators (both mobile and desktop)
    function updateAllIndicators() {
        // Update mobile indicators
        mobileIndicators.forEach((indicator, index) => {
            if (index === currentGroup) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        
        // Update desktop indicators
        desktopIndicators.forEach((indicator, index) => {
            if (index === currentGroup) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

});

// Initialize the typing effect
function initTypingEffect() {
    const words = [
        "Artificial Intelligence",
        "Machine Learning",
        "Deep Learning",
        "Generative AI",
        "Natural Language Processing",
        "Computer Vision"
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100; // Speed of typing
    const deleteSpeed = 50;  // Speed of deleting
    const pauseTime = 1000;  // Time before deleting
    
    function typeEffect() {
        const typingText = document.getElementById("typing-text");
        if (!typingText) return;
    
        if (!isDeleting && charIndex < words[wordIndex].length) {
            typingText.innerHTML = words[wordIndex].substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeEffect, typingSpeed);
        } 
        else if (isDeleting && charIndex > 0) {
            typingText.innerHTML = words[wordIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeEffect, deleteSpeed);
        } 
        else {
            isDeleting = !isDeleting;
            if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, pauseTime);
        }
    }
    
    // Start typing effect
    typeEffect();
}

// Initialize particles.js (for mobile)
function initParticlesJS() {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 35,
                "density": {
                    "enable": true,
                    "value_area": 400
                }
            },
            "color": {
                "value": "#ffffff"  /* Default color for nodes */
            },
            "shape": {
                "type": "circle"
            },
            "opacity": {
                "value": 0.7,
                "random": false
            },
            "size": {
                "value": 3,
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.6,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "out_mode": "out"
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 180,
                    "line_linked": {
                        "opacity": 1,
                        "color": "#e9b321" /* Nodes turn orange when cursor is near */
                    }
                },
                "bubble": {
                    "distance": 200,
                    "size": 10,
                    "duration": 2
                },
                "repulse": {
                    "distance": 150,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });
}

// Additional functions (placeholders - implement as needed)
// function initMobileNav() {
//     const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
//     const mainNav = document.querySelector('.main-nav');
    
//     if (mobileNavToggle && mainNav) {
//         mobileNavToggle.addEventListener('click', function() {
//             this.classList.toggle('active');
//             mainNav.classList.toggle('active');
//         });
        
//         // Close mobile menu when clicking on a nav link
//         const navLinks = document.querySelectorAll('.main-nav a');
//         navLinks.forEach(link => {
//             link.addEventListener('click', function() {
//                 mainNav.classList.remove('active');
//                 mobileNavToggle.classList.remove('active');
//             });
//         });

//         navLinks.forEach(link => {
//             link.addEventListener('click', function(event) {

//                 const targetToggle = this.getAttribute('data-toggle'); // Check if navbar link has toggle action
//                 if (targetToggle) {
//                     event.preventDefault(); // Prevent default scrolling behavior

//                     // Scroll to Education section smoothly
//                     document.getElementById('education').scrollIntoView({ behavior: "smooth" });

//                     // Switch to Experience tab
//                     document.querySelectorAll('.toggle-btn').forEach(btn => {
//                         btn.classList.remove('active'); // Remove active from both buttons
//                         if (btn.getAttribute('data-target') === targetToggle) {
//                             btn.classList.add('active'); // Activate Experience button
//                         }
//                     });

//                     // Hide all sections and show Experience
//                     document.querySelectorAll('.section-content').forEach(section => {
//                         section.classList.remove('active');
//                     });
//                     document.getElementById(targetToggle).classList.add('active'); // Show Experience
//                 }

//                 event.preventDefault();
//                 const targetId = this.getAttribute('href').substring(1);
//                 console.log("Navigating to:", targetId);
//                 const targetSection = document.getElementById(targetId);
                
//                 if (targetSection) {
//                     targetSection.scrollIntoView({ behavior: "smooth" });
//                 } else {
//                     console.error("Section not found:", targetId);
//                 }

//             });

//         });

//     }
// }

function initMobileNav() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                mobileNavToggle.classList.remove('active');
                
                // Get the target section ID from the href attribute
                const targetId = this.getAttribute('href').substring(1);
                console.log("Navigating to:", targetId);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Prevent default behavior to handle navigation manually
                    event.preventDefault();
                    
                    // Check if this is a special toggle section
                    const targetToggle = this.getAttribute('data-toggle');
                    
                    // Handle toggle if necessary
                    if (targetToggle) {
                        // Switch to specific tab
                        document.querySelectorAll('.toggle-btn').forEach(btn => {
                            btn.classList.remove('active'); // Remove active from all buttons
                            if (btn.getAttribute('data-target') === targetToggle) {
                                btn.classList.add('active'); // Activate correct button
                            }
                        });

                        // Hide all sections and show the target
                        document.querySelectorAll('.section-content').forEach(section => {
                            section.classList.remove('active');
                        });
                        document.getElementById(targetToggle).classList.add('active');
                    }
                    
                    // Scroll to the target section smoothly
                    setTimeout(() => {
                        targetSection.scrollIntoView({ behavior: "smooth" });
                    }, 10);
                } else {
                    console.error("Section not found:", targetId);
                }
            });
        });
    }
}

// Unified function for navigating and toggling sections
function navigateAndToggle(event, sectionId, toggleTarget) {
    event.preventDefault(); // Stop default jump behavior

    // Handle toggle if specified
    if (toggleTarget) {
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-target') === toggleTarget) {
                btn.classList.add('active');
            }
        });

        // Hide all sections first, then show the selected one
        document.querySelectorAll('.section-content').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(toggleTarget).classList.add('active');
    }
    
    // Scroll to the section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        // Small delay to ensure toggle effects complete first
        setTimeout(() => {
            targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 10);
    } else {
        console.error("Section not found:", sectionId);
    }
}


function initSmoothScroll() {
    const navLinks = document.querySelectorAll('header a[href^="#"], .hero-actions a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}
function setupProjectFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length && projectCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else {
                        const categories = card.getAttribute('data-category').split(' ');
                        if (categories.includes(filterValue)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    // Validation patterns
    const patterns = {
        name: /^[a-zA-Z\s]{2,30}$/,                                        // Letters and spaces, 2-30 chars
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,         // Standard email format validation
        subject: /^.{5,100}$/,                                             // Any characters, 5-100 chars
        message: /^[\s\S]{10,1000}$/                                       // Any characters (incl. newlines), 10-1000 chars
    };
    
    // Error messages
    const errorMessages = {
        name: 'Please enter a valid name (2-30 characters, letters only)',
        email: 'Please enter a valid email address',
        subject: 'Subject must be between 5-100 characters',
        message: 'Message must be between 10-1000 characters'
    };
    
    if (contactForm) {
        // Update form action to use FormSpree
        contactForm.action = "https://formspree.io/f/xrbpenrq";
        contactForm.setAttribute('accept-charset', 'UTF-8');
        
        // Create error message elements
        const createErrorElement = (id) => {
            const errorSpan = document.createElement('span');
            errorSpan.className = 'error-message';
            errorSpan.id = `${id}-error`;
            errorSpan.style.color = '#ff3838';
            errorSpan.style.fontSize = '0.8rem';
            errorSpan.style.marginTop = '0.25rem';
            errorSpan.style.display = 'none';
            return errorSpan;
        };
        
        // Add error elements after each input
        document.querySelectorAll('#contact-form .form-group').forEach(group => {
            const input = group.querySelector('input, textarea');
            if (input) {
                const errorElement = createErrorElement(input.id);
                errorElement.textContent = errorMessages[input.id] || 'Invalid input';
                group.appendChild(errorElement);
            }
        });
        
        // Validate single field
        const validateField = (field) => {
            const value = field.value.trim();
            const pattern = patterns[field.id];
            const errorElement = document.getElementById(`${field.id}-error`);
            
            if (!errorElement) return true; // Skip if no error element found
            
            if (pattern && !pattern.test(value)) {
                field.style.borderColor = '#ff3838';
                errorElement.style.display = 'block';
                return false;
            } else {
                field.style.borderColor = '#4CAF50';
                errorElement.style.display = 'none';
                return true;
            }
        };
        
        // Add input event listeners to each field for real-time validation
        document.querySelectorAll('#contact-form input, #contact-form textarea').forEach(field => {
            field.addEventListener('input', function() {
                validateField(this);
            });
            
            field.addEventListener('blur', function() {
                validateField(this);
            });
        });
        
        // Form submission handler
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            
            document.querySelectorAll('#contact-form input, #contact-form textarea').forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Disable the submit button to prevent multiple submissions
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.innerHTML;
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // Get form data
                const formData = new FormData(contactForm);
                
                // Send to Formspree
                fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Network response was not ok.');
                    }
                })
                .then(data => {
                    // Success - Formspree accepted the submission
                    console.log('Success:', data);
                    
                    // Create success notification
                    const successNotification = document.createElement('div');
                    successNotification.className = 'success-notification';
                    successNotification.textContent = 'Thank you! Your message has been sent successfully.';
                    successNotification.style.backgroundColor = '#4CAF50';
                    successNotification.style.color = 'white';
                    successNotification.style.padding = '10px';
                    successNotification.style.borderRadius = '4px';
                    successNotification.style.marginTop = '20px';
                    
                    // Insert the notification after the form
                    contactForm.parentNode.insertBefore(successNotification, contactForm.nextSibling);
                    
                    // Reset the form
                    contactForm.reset();
                    document.querySelectorAll('#contact-form input, #contact-form textarea').forEach(field => {
                        field.style.borderColor = '';
                    });
                    
                    // Reset the submit button
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                    
                    // Remove the notification after 5 seconds
                    setTimeout(() => {
                        successNotification.remove();
                    }, 5000);
                })
                .catch(error => {
                    // Handle errors from Formspree
                    console.error('Error:', error);
                    
                    // Create error notification
                    const errorNotification = document.createElement('div');
                    errorNotification.className = 'error-notification';
                    errorNotification.textContent = 'Sorry, there was a problem sending your message. Please try again later.';
                    errorNotification.style.backgroundColor = '#ff3838';
                    errorNotification.style.color = 'white';
                    errorNotification.style.padding = '10px';
                    errorNotification.style.borderRadius = '4px';
                    errorNotification.style.marginTop = '20px';
                    
                    // Insert the notification after the form
                    contactForm.parentNode.insertBefore(errorNotification, contactForm.nextSibling);
                    
                    // Reset the submit button
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                    
                    // Remove the notification after 5 seconds
                    setTimeout(() => {
                        errorNotification.remove();
                    }, 5000);
                });
            }
        });
    }
});

function setupScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

function setupStickyHeader() {
    const header = document.querySelector('.site-header');
    const heroSection = document.querySelector('.hero-section');
    
    if (header && heroSection) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }
}

function addDynamicStyles() {
    // Add CSS for device-specific visualizations
    const style = document.createElement('style');
    style.textContent = `
        /* Neural network styles (desktop only) */
        @media (min-width: 768px) {
            #neural-network {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1;
            }
            
            #particles-js {
                display: none;
            }
        }
        
        /* Particles.js styles (mobile only) */
        @media (max-width: 767px) {
            #neural-network {
                display: none;
            }
            
            #particles-js {
                display: block;
            }
        }
    `;
    document.head.appendChild(style);
}

function initNeuralNetwork() {
    console.log("Initializing neural network with brain.js");
    const canvas = document.getElementById('neural-network');
    if (!canvas) {
        console.error("Canvas element not found");
        return;
    }
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    console.log("Canvas dimensions:", canvas.width, canvas.height);
    
    // Force dimensions if needed
    if (canvas.width <= 0 || canvas.height <= 0) {
        console.log("Canvas has invalid dimensions, forcing size");
        canvas.width = window.innerWidth;
        canvas.height = 400;
    }
    
    // Create a simple brain.js neural network
    const net = new brain.NeuralNetwork({
        hiddenLayers: [8, 8],
        learningRate: 0.3
    });
    
    // Train with some dummy data for visualization
    net.train([
        { input: [0, 0, 0, 0], output: [0, 0] },
        { input: [0, 0, 0, 1], output: [0, 1] },
        { input: [0, 0, 1, 0], output: [1, 0] },
        { input: [0, 0, 1, 1], output: [1, 1] },
        { input: [0, 1, 0, 0], output: [0, 1] },
        { input: [0, 1, 0, 1], output: [1, 0] },
        { input: [0, 1, 1, 0], output: [1, 1] },
        { input: [0, 1, 1, 1], output: [0, 0] },
        { input: [1, 0, 0, 0], output: [1, 0] },
        { input: [1, 0, 0, 1], output: [1, 1] }
    ], {
        iterations: 50,
        log: false
    });
    
    // Define network structure manually to avoid accessing brain.js internal structure
    // which may differ between versions
    const layers = [
        { size: 4 },  // Input layer size
        { size: 8 },  // First hidden layer
        { size: 8 },  // Second hidden layer
        { size: 2 }   // Output layer size
    ];
    
    console.log("Neural network structure:", layers);
    
    // Extract weights from brain.js for visualization if possible
    // If not, create random weights for visualization
    let weights = [];
    try {
        // We'll try to access the weights from brain.js if possible
        if (net.weights && Array.isArray(net.weights)) {
            for (let i = 0; i < net.weights.length; i++) {
                if (Array.isArray(net.weights[i])) {
                    weights.push(net.weights[i].map(row => 
                        Array.isArray(row) ? row.slice() : Array(layers[i].size).fill(0)
                    ));
                } else {
                    // Create random weights
                    const sourceSize = layers[i].size;
                    const targetSize = layers[i+1].size;
                    const layerWeights = Array(targetSize).fill().map(() => 
                        Array(sourceSize).fill().map(() => Math.random() * 2 - 1)
                    );
                    weights.push(layerWeights);
                }
            }
        } else {
            throw new Error("Cannot access weights property");
        }
    } catch (error) {
        console.warn("Could not access brain.js weights. Using random weights for visualization.", error);
        // Create random weights for visualization
        weights = [];
        for (let i = 0; i < layers.length - 1; i++) {
            const sourceSize = layers[i].size;
            const targetSize = layers[i+1].size;
            const layerWeights = Array(targetSize).fill().map(() => 
                Array(sourceSize).fill().map(() => Math.random() * 2 - 1)
            );
            weights.push(layerWeights);
        }
    }
    
    // Draw the network
    const ctx = canvas.getContext('2d');
    let animationPhase = 0;
    let mouse = { x: -100, y: -100 };
    let hoveredNode = null;
    
    // Track mouse position
    canvas.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        canvas.style.cursor = 'pointer';
    });
    
    canvas.addEventListener('mouseleave', function() {
        mouse.x = -100;
        mouse.y = -100;
        hoveredNode = null;
        canvas.style.cursor = 'default';
    });
    
    // Store all nodes for easy access
    const nodes = [];
    
    // Initialize node positions
    function initializeNodes() {
        nodes.length = 0;
        
        // Total width to use (percentage of canvas width)
        const totalWidth = canvas.width * 0.8;
        const startX = (canvas.width - totalWidth) / 2;
        const spacing = totalWidth / (layers.length - 1);
        
        let nodeIndex = 0;
        
        for (let l = 0; l < layers.length; l++) {
            const layerSize = layers[l].size;
            const startY = (canvas.height - (layerSize - 1) * 40) / 2;
            const x = startX + (l * spacing);
            
            for (let n = 0; n < layerSize; n++) {
                const y = startY + n * 40;
                nodes.push({
                    x: x,
                    y: y,
                    layer: l,
                    index: n,
                    nodeIndex: nodeIndex,
                    connections: []
                });
                nodeIndex++;
            }
        }
        
        // Create connections using weights
        let sourceStartIndex = 0;
        for (let l = 0; l < layers.length - 1; l++) {
            const sourceLayerSize = layers[l].size;
            const targetLayerSize = layers[l + 1].size;
            const targetStartIndex = sourceStartIndex + sourceLayerSize;
            
            // Connect each node in current layer to all nodes in next layer
            for (let s = 0; s < sourceLayerSize; s++) {
                const sourceNode = nodes[sourceStartIndex + s];
                
                for (let t = 0; t < targetLayerSize; t++) {
                    // Get weight
                    let weight = 0;
                    try {
                        weight = weights[l][t][s];
                    } catch (error) {
                        weight = Math.random() * 2 - 1; // Random weight if not available
                    }
                    
                    // Store connection with weight
                    sourceNode.connections.push({
                        target: targetStartIndex + t,
                        weight: weight
                    });
                }
            }
            
            sourceStartIndex += sourceLayerSize;
        }
    }
    
    // Find connections for a node (both incoming and outgoing)
    function findConnections(nodeIndex) {
        const result = {
            incoming: [],
            current: nodeIndex,
            outgoing: []
        };
        
        // Find incoming connections
        for (let i = 0; i < nodes.length; i++) {
            for (const conn of nodes[i].connections) {
                if (conn.target === nodeIndex) {
                    result.incoming.push({
                        source: i,
                        weight: conn.weight
                    });
                }
            }
        }
        
        // Find outgoing connections
        if (nodeIndex < nodes.length) {
            result.outgoing = nodes[nodeIndex].connections.map(conn => ({
                target: conn.target,
                weight: conn.weight
            }));
        }
        
        return result;
    }
    
    // Calculate color based on weight
    function getWeightColor(weight, highlighted, baseColor) {
        // Normalize weight to [0, 1] range from typical [-1, 1] range
        const normalizedWeight = (Math.tanh(weight) + 1) / 2;
        
        // Base colors
        const colors = {
            positive: {r: 38, g: 166, b: 154},  // teal
            negative: {r: 229, g: 57, b: 53},   // red
            neutral: {r: 158, g: 158, b: 158},  // gray
            highlight: {r: 243, g: 156, b: 18}  // orange
        };
        
        let color;
        if (highlighted) {
            color = colors.highlight;
        } else if (weight > 0.1) {
            color = colors.positive;
        } else if (weight < -0.1) {
            color = colors.negative;
        } else {
            color = colors.neutral;
        }
        
        // Calculate alpha based on weight strength and if highlighted
        const alpha = highlighted ? 0.8 : (0.2 + Math.abs(normalizedWeight) * 0.5);
        
        return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
    }
    
    function drawNetwork() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Find hovered node
        hoveredNode = null;
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            const distToMouse = Math.sqrt(Math.pow(node.x - mouse.x, 2) + Math.pow(node.y - mouse.y, 2));
            if (distToMouse < 20) {
                hoveredNode = i;
                break;
            }
        }
        
        // Get connected nodes if we're hovering over one
        let connectionInfo = null;
        if (hoveredNode !== null) {
            connectionInfo = findConnections(hoveredNode);
        }
        
        // Draw connections first (so they appear behind nodes)
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            
            // Draw connections to next layer
            for (const conn of node.connections) {
                const targetNode = nodes[conn.target];
                const weight = conn.weight;
                
                // Determine if this connection should be highlighted
                let highlighted = false;
                if (connectionInfo) {
                    if (connectionInfo.current === i) {
                        // Outgoing connection from hovered node
                        highlighted = true;
                    } else if (connectionInfo.current === conn.target) {
                        // Incoming connection to hovered node
                        highlighted = true;
                    }
                }
                
                // Calculate animation phase
                const pulse = 0.4 * Math.sin(animationPhase + i * 0.9);
                
                // Draw connection
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(targetNode.x, targetNode.y);
                
                const color = getWeightColor(weight, highlighted, pulse);
                ctx.strokeStyle = color;
                ctx.lineWidth = highlighted ? 2 : Math.max(1, Math.abs(weight) * 2);
                ctx.stroke();
                
                // Draw pulse along connection if highlighted
                if (highlighted) {
                    const pulsePosition = (animationPhase * 0.5) % 1;
                    const x = node.x + (targetNode.x - node.x) * pulsePosition;
                    const y = node.y + (targetNode.y - node.y) * pulsePosition;
                    
                    ctx.beginPath();
                    ctx.arc(x, y, 3, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                    ctx.fill();
                }
            }
        }
        
        // Draw nodes
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            
            // Determine if this node should be highlighted
            let highlighted = false;
            if (connectionInfo) {
                highlighted = (
                    connectionInfo.current === i || 
                    connectionInfo.incoming.some(conn => conn.source === i) || 
                    connectionInfo.outgoing.some(conn => conn.target === i)
                );
            }
            
            // Calculate activation
            const activation = 0.5 + 0.4 * Math.sin(animationPhase + i * 0.9);
            
            // Draw node
            ctx.beginPath();
            ctx.arc(node.x, node.y, 6 + (highlighted ? 2 : 0), 0, Math.PI * 2);
            
            let color;
            if (highlighted) {
                color = `rgba(243, 156, 18, ${0.6 + activation * 0.4})`;
            } else {
                // Color based on layer type
                if (node.layer === 0) {
                    // Input layer - blue
                    color = `rgba(3, 169, 244, ${0.3 + activation * 0.5})`;
                } else if (node.layer === layers.length - 1) {
                    // Output layer - purple
                    color = `rgba(156, 39, 176, ${0.3 + activation * 0.5})`;
                } else {
                    // Hidden layer - teal
                    color = `rgba(38, 166, 154, ${0.3 + activation * 0.5})`;
                }
            }
            
            ctx.fillStyle = color;
            ctx.fill();
            
            // Draw glow
            if (activation > 0.5 || highlighted) {
                ctx.beginPath();
                ctx.arc(node.x, node.y, 12 + (highlighted ? 5 : 0), 0, Math.PI * 2);
                
                const glowColor = highlighted ? 
                    `rgba(243, 156, 18, ${activation * 0.25})` : 
                    `rgba(38, 166, 154, ${activation * 0.15})`;
                
                ctx.fillStyle = glowColor;
                ctx.fill();
            }
        }
        
        animationPhase += 0.01;
        requestAnimationFrame(drawNetwork);
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        console.log("Canvas resized to:", canvas.width, canvas.height);
        initializeNodes(); // Recalculate node positions
    });
    
    // Add essential styles for the canvas
    const style = document.createElement('style');
    style.textContent = `
        #neural-network {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: auto;
            z-index: 1;
        }
        
        .hero-section {
            position: relative;
            overflow: hidden;
        }
        
        .hero-background {
            position: relative;
            width: 100%;
            height: 100%;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize nodes
    initializeNodes();
    
    // Start animation
    console.log("Starting neural network animation");
    drawNetwork();
    
    // Run a sample prediction to make the network "active"
    function runSamplePrediction() {
        // Create a random input
        const input = Array(4).fill().map(() => Math.round(Math.random()));
        
        // Run prediction
        const output = net.run(input);
        
        console.log("Sample prediction:", {input, output});
        
        // Simulate data flowing through the network
        setTimeout(runSamplePrediction, 3000);
    }
    
    // Start periodic predictions
    runSamplePrediction();
}

/**
 * Adjusts images to maintain proper aspect ratio within their containers
 * This function checks each project image and adjusts it based on its natural dimensions
 */
// function adjustProjectImages() {
//     // Get all project images
//     const projectImages = document.querySelectorAll('.project-image img');
    
//     projectImages.forEach(img => {
//         // Wait for the image to load to get its natural dimensions
//         img.onload = function() {
//             const container = img.parentElement;
//             const containerWidth = container.offsetWidth;
//             const containerHeight = container.offsetHeight;
//             const containerRatio = containerWidth / containerHeight;
            
//             const imgRatio = img.naturalWidth / img.naturalHeight;
            
//             // If image is wider than container (landscape vs portrait)
//             if (imgRatio > containerRatio) {
//                 img.style.width = 'auto';
//                 img.style.height = '100%';
//                 // Center horizontally
//                 const widthDiff = (img.offsetWidth - containerWidth) / 2;
//                 img.style.marginLeft = `-${widthDiff}px`;
//                 img.style.marginTop = '0';
//             } 
//             // If image is taller than container
//             else {
//                 img.style.width = '100%';
//                 img.style.height = 'auto';
//                 // Center vertically
//                 const heightDiff = (img.offsetHeight - containerHeight) / 2;
//                 img.style.marginTop = `-${heightDiff}px`;
//                 img.style.marginLeft = '0';
//             }
//         };
        
//         // Trigger onload for cached images
//         if (img.complete) {
//             img.onload();
//         }
//     });
// }

// // Run when DOM is loaded
// document.addEventListener('DOMContentLoaded', adjustProjectImages);

// // Also run when window is resized
// window.addEventListener('resize', adjustProjectImages);

/**
 * Adjusts all images with the specified class to ensure they're fully visible
 * with a blurred version of the same image as background
 * @param {string} imageClass - The class name of images to adjust
 */
function adjustImagesByClass(imageClass) {
    const images = document.getElementsByClassName(imageClass);
    
    if (images.length === 0) {
      console.warn(`No images with class "${imageClass}" found.`);
      return;
    }
    
    Array.from(images).forEach(img => {
      // Create a wrapper div if it doesn't exist
      let wrapper = img.parentElement;
      if (!wrapper.classList.contains('image-wrapper')) {
        wrapper = document.createElement('div');
        wrapper.classList.add('image-wrapper');
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);
        
        // Set wrapper styles
        wrapper.style.overflow = 'hidden';
        wrapper.style.position = 'relative';
        wrapper.style.width = '100%';
        wrapper.style.height = '100%';
      }
  
      // Create blurred background if it doesn't exist yet
      let bgImage = wrapper.querySelector('.background-blur');
      if (!bgImage) {
        bgImage = document.createElement('div');
        bgImage.classList.add('background-blur');
        wrapper.insertBefore(bgImage, img);
        
        // Set background styles
        bgImage.style.position = 'absolute';
        bgImage.style.top = '0';
        bgImage.style.left = '0';
        bgImage.style.width = '100%';
        bgImage.style.height = '100%';
        bgImage.style.backgroundImage = `url(${img.src})`;
        bgImage.style.backgroundPosition = 'center';
        bgImage.style.backgroundSize = 'cover';
        bgImage.style.filter = 'blur(10px)';
        bgImage.style.opacity = '1';
        bgImage.style.zIndex = '1';
      }
  
      // Ensure the main image is above the blurred background
      img.style.position = 'relative';
      img.style.zIndex = '2';
      
      // Reset any previously applied styles for the main image
      img.style.width = '';
      img.style.height = '';
      img.style.maxWidth = '100%';
      img.style.maxHeight = '100%';
      img.style.objectFit = 'contain';
      img.style.objectPosition = 'center';
  
      // Function to adjust image dimensions
      const adjustImage = function() {
        const containerWidth = wrapper.clientWidth;
        const containerHeight = wrapper.clientHeight;
        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;
  
        // Calculate aspect ratios
        const containerRatio = containerWidth / containerHeight;
        const imgRatio = imgWidth / imgHeight;
  
        if (imgRatio > containerRatio) {
          // Image is wider (relative to its height) than the container
          // Adjust vertically to fit the width
          img.style.width = '100%';
          img.style.height = 'auto';
        } else {
          // Image is taller (relative to its width) than the container
          // Adjust horizontally to fit the height
          img.style.width = 'auto';
          img.style.height = '100%';
        }
      };
  
      // Wait for the image to load to get accurate dimensions
      img.onload = function() {
        adjustImage();
        // Update the background image when the main image loads
        bgImage.style.backgroundImage = `url(${img.src})`;
      };
  
      // Trigger onload even if the image is already loaded
      if (img.complete) {
        img.onload();
      }
    });
  }
  
  // Apply adjustments when the DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Adjust all images with the responsive-image class
    adjustImagesByClass('responsive-image');
    
    // Adjust on window resize as well
    window.addEventListener('resize', function() {
      adjustImagesByClass('responsive-image');
    });
  });