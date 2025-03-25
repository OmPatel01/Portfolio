
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