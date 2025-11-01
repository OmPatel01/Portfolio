
// Global variables
let currentProjectId = null;
let projectsData = [];

// Function to get the current HTML filename
function getCurrentHtmlFilename() {
    // Extract the filename from the current URL
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1);
    return filename;
}

// Function to load project data from JSON file
async function loadProjectsData() {
    try {
        const response = await fetch('../assets/projects_info.json');
        if (!response.ok) {
            throw new Error('Failed to load projects data');
        }
        projectsData = await response.json();
        return projectsData;
    } catch (error) {
        console.error('Error loading projects data:', error);
        return [];
    }
}

// Function to find project index by HTML filename
function findProjectIndexByHtml(htmlFilename) {
    return projectsData.findIndex(project => project.html === htmlFilename);
}

// Function to find project index by ID
function findProjectIndexById(id) {
    return projectsData.findIndex(project => project.id === id);
}

// Helper function to get adjacent project index with wrap-around
function getAdjacentProjectIndex(currentIndex, direction) {
    if (direction === 'next') {
        return currentIndex < projectsData.length - 1 ? currentIndex + 1 : 0;
    } else if (direction === 'prev') {
        return currentIndex > 0 ? currentIndex - 1 : projectsData.length - 1;
    }
    return currentIndex; // Default: stay on same project
}

// Function to navigate to a specific project
function navigateToProject(projectIndex) {
    if (projectIndex >= 0 && projectIndex < projectsData.length) {
        const targetProject = projectsData[projectIndex];
        window.location.href = `${targetProject.html}`;
    } else {
        console.error('Invalid project index:', projectIndex);
    }
}

// Function to update navigation links
function updateNavigationLinks(currentIndex) {
    const prevLink = document.querySelector('.nav-link.prev-project');
    const nextLink = document.querySelector('.nav-link.next-project');
    
    // Calculate previous and next indices with wrap-around
    const prevIndex = getAdjacentProjectIndex(currentIndex, 'prev');
    const nextIndex = getAdjacentProjectIndex(currentIndex, 'next');
    
    // Update navigation links
    if (prevLink) {
        prevLink.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToProject(prevIndex);
        });
        prevLink.setAttribute('aria-label', `Previous Project: ${projectsData[prevIndex].id}`);
    }
    
    if (nextLink) {
        nextLink.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToProject(nextIndex);
        });
        nextLink.setAttribute('aria-label', `Next Project: ${projectsData[nextIndex].id}`);
    }
}

// close button functionality
function setupCloseButton() {
    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            console.log("Current path:", window.location.pathname);
            console.log("Referrer:", document.referrer);

            let destination;

            if (document.referrer.includes("all_projects.html")) {
                destination = "./all_projects.html#projects";
                console.log("Will redirect to all projects");
            } else if (document.referrer) {
                destination = "../index.html#projects";
                console.log("Will redirect to index");
            } else {
                destination = "../index.html#projects";  // Fallback
                console.log("Using default redirect");
            }

            // Handle animation before redirect
            const projectDetailContainer = document.querySelector('.project-detail-container');
            if (projectDetailContainer) {
                projectDetailContainer.classList.remove('active');
                setTimeout(() => {
                    window.location.href = destination;
                }, 300);
            } else {
                window.location.href = destination;
            }
        });
    }
}

// Initialize the project detail page
function initializeProjectDetailPage() {
    // Make the project detail page active when loaded
    const projectDetailContainer = document.querySelector('.project-detail-container');
    if (projectDetailContainer) {
        projectDetailContainer.classList.add('active');
    }
    
    // Setup the close button
    setupCloseButton();
    
    // Other initialization code for the project page...
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeProjectDetailPage();
});


// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeProjectDetailPage();
});

// Initialize the page
async function initializeProjectPage() {
    // Load projects data
    await loadProjectsData();
    
    if (projectsData.length === 0) {
        console.error('No projects data available');
        return;
    }
    
    // Get current HTML filename
    const currentHtmlFilename = getCurrentHtmlFilename();
    
    // Find the current project index by HTML filename
    const currentIndex = findProjectIndexByHtml(currentHtmlFilename);
    
    if (currentIndex === -1) {
        console.warn(`Current project HTML file "${currentHtmlFilename}" not found in projects data`);
        // In this case, we might want to go to the first project or do something else
        return;
    }
    
    // Store current project ID
    currentProjectId = projectsData[currentIndex].id;
    localStorage.setItem('currentProjectId', currentProjectId);
    
    // Update navigation links
    updateNavigationLinks(currentIndex);
    
    // Setup event listeners
    // setupCloseButton();




    
    // Optional: Add keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            navigateToProject(getAdjacentProjectIndex(currentIndex, 'prev'));
        } else if (event.key === 'ArrowRight') {
            navigateToProject(getAdjacentProjectIndex(currentIndex, 'next'));
        }
    });
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeProjectPage);

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