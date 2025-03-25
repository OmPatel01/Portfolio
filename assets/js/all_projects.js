document.addEventListener('DOMContentLoaded', function() {
    // Get all project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    // Pagination setup
    const itemsPerPage = 6; // Adjust as needed
    let currentPage = 1;
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    // Project data storage for navigation between project details
    let projectsData = [];
    
    // Filter state
    let activeFilters = {
        tool: '',
        technique: '',
        industry: ''
    };
    
    // Filter elements
    const filterDropdowns = document.querySelectorAll('.filter-options select');
    const clearFiltersButton = document.querySelector('.clear-filters');
    
    // Debug element to show active filters
    const createFilterDisplay = () => {
        const existingDisplay = document.querySelector('.active-filters-display');
        if (existingDisplay) {
            existingDisplay.remove();
        }
        
        // const displayDiv = document.createElement('div');
        // displayDiv.className = 'active-filters-display';
        // displayDiv.style.margin = '20px 0';
        // displayDiv.style.padding = '10px 15px';
        // displayDiv.style.backgroundColor = '#f0f5ff';
        // displayDiv.style.borderRadius = '5px';
        
        // let filterText = '<strong>Active Filters:</strong> ';
        const activeFilterValues = [];
        
        if (activeFilters.tool) activeFilterValues.push(`Tool: ${activeFilters.tool}`);
        if (activeFilters.technique) activeFilterValues.push(`Technique: ${activeFilters.technique}`);
        if (activeFilters.industry) activeFilterValues.push(`Industry: ${activeFilters.industry}`);
        
        // filterText += activeFilterValues.length ? activeFilterValues.join(', ') : 'None';
        // displayDiv.innerHTML = filterText;
        
        const filterContainer = document.querySelector('.filter-container');
        filterContainer.parentNode.insertBefore(displayDiv, filterContainer.nextSibling);
    };
    
    // Initialize the page
    function init() {
        // Extract projects data from DOM
        projectCards.forEach((card, index) => {
            const projectId = index + 1; // Generate numeric ID
            card.setAttribute('data-id', projectId);
            
            // Store project data for later use
            projectsData.push({
                id: projectId,
                title: card.querySelector('.project-title').textContent,
                tools: card.getAttribute('data-tools'),
                techniques: card.getAttribute('data-techniques'),
                industry: card.getAttribute('data-industry')
            });
            
            // Update detail page links to include ID
            const detailLinks = card.querySelectorAll('a[href*="#"]');
            detailLinks.forEach(link => {
                if (link.classList.contains('view-project') || link.classList.contains('btn-outline')) {
                    link.href = `#project-${projectId}`;
                }
            });
        });
        
        // Save projects data to localStorage for access from detail page
        localStorage.setItem('projectsData', JSON.stringify(projectsData));
        
        // Setup filtering
        setupFilters();
        
        // Initialize pagination
        setupPagination(projectCards.length);
        showPage(1);
        
        // Initialize filter display
        createFilterDisplay();
    }
    
    // Set up filtering functionality
    function setupFilters() {
        // Update active filters when dropdowns change
        filterDropdowns.forEach(dropdown => {
            dropdown.addEventListener('change', function() {
                const filterType = this.name; // 'tool', 'technique', or 'industry'
                const filterValue = this.value;

                // Update this specific filter type
                activeFilters[filterType] = filterValue;
                
                // Apply the updated filters
                applyFilters();
                
                // Update filter display
                createFilterDisplay();
                
                // Reset pagination to first page after filtering
                setupPagination(document.querySelectorAll('.project-card:not(.filtered-out)').length);
                showPage(1);
            });
        });

        // Clear all filters button
        if (clearFiltersButton) {
            clearFiltersButton.addEventListener('click', function() {
                // Reset all dropdowns to default
                filterDropdowns.forEach(dropdown => {
                    dropdown.selectedIndex = 0;
                });

                // Reset active filters
                activeFilters = {
                    tool: '',
                    technique: '',
                    industry: ''
                };

                // Show all projects
                projectCards.forEach(card => {
                    card.classList.remove('filtered-out');
                });
                
                // Remove any "no projects" message
                const existingMessage = document.querySelector('.no-projects-message');
                if (existingMessage) {
                    existingMessage.remove();
                }
                
                // Update filter display
                createFilterDisplay();
                
                // Reset pagination
                setupPagination(projectCards.length);
                showPage(1);
            });
        }
    }
    
    // Apply filters
    function applyFilters() {
        console.log("Applying filters:", activeFilters);
        
        projectCards.forEach(card => {
            // Get card data attributes (convert to lowercase for case-insensitive comparison)
            const cardTools = card.dataset.tools ? card.dataset.tools.toLowerCase().split(',').map(item => item.trim()) : [];
            const cardTechniques = card.dataset.techniques ? card.dataset.techniques.toLowerCase().split(',').map(item => item.trim()) : [];
            const cardIndustry = card.dataset.industry ? card.dataset.industry.toLowerCase().split(',').map(item => item.trim()) : [];

            // Check if card matches all active filters
            let shouldShow = true;

            // Check tool filter
            if (activeFilters.tool && !cardTools.includes(activeFilters.tool.toLowerCase())) {
                shouldShow = false;
            }

            // Check technique filter
            if (shouldShow && activeFilters.technique && !cardTechniques.includes(activeFilters.technique.toLowerCase())) {
                shouldShow = false;
            }

            // Check industry filter
            if (shouldShow && activeFilters.industry && !cardIndustry.includes(activeFilters.industry.toLowerCase())) {
                shouldShow = false;
            }

            // Show or hide card based on filter results
            if (shouldShow) {
                card.classList.remove('filtered-out');
                console.log("Showing card:", card.querySelector('.project-title').textContent);
            } else {
                card.classList.add('filtered-out');
                console.log("Hiding card:", card.querySelector('.project-title').textContent);
            }
        });

        // Count visible projects
        const visibleProjects = document.querySelectorAll('.project-card:not(.filtered-out)');
        console.log("Visible projects:", visibleProjects.length);
        
        // Check if no projects are visible and add a message if needed
        const existingMessage = document.querySelector('.no-projects-message');
        
        if (visibleProjects.length === 0 && !existingMessage) {
            const noProjectsMessage = document.createElement('div');
            noProjectsMessage.className = 'no-projects-message';
            noProjectsMessage.textContent = 'No projects match the selected filters.';
            noProjectsMessage.style.textAlign = 'center';
            noProjectsMessage.style.padding = '2rem';
            noProjectsMessage.style.gridColumn = '1 / -1';
            
            document.querySelector('.projects-grid').appendChild(noProjectsMessage);
        } else if (visibleProjects.length > 0 && existingMessage) {
            existingMessage.remove();
        }
    }
    
    // Set up pagination based on number of visible items
    function setupPagination(visibleItemsCount) {
        const pageCount = Math.ceil(visibleItemsCount / itemsPerPage);
        
        // Show/hide pagination buttons based on page count
        if (paginationButtons) {
            paginationButtons.forEach((btn, index) => {
                if (!btn.classList.contains('next')) {
                    if (index < pageCount) {
                        btn.style.display = 'flex';
                    } else {
                        btn.style.display = 'none';
                    }
                }
            });
        }
    }
    
    // Show projects for the current page
    function showPage(pageNum) {
        currentPage = pageNum;
        
        const visibleProjects = Array.from(projectCards).filter(
            card => !card.classList.contains('filtered-out')
        );
        
        const startIndex = (pageNum - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        
        visibleProjects.forEach((project, index) => {
            if (index >= startIndex && index < endIndex) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
        
        // Update active state on pagination buttons
        if (paginationButtons) {
            paginationButtons.forEach(btn => {
                if (!btn.classList.contains('next')) {
                    btn.classList.toggle('active', parseInt(btn.textContent) === pageNum);
                }
            });
        }
    }
    
    // Event listeners for pagination
    if (paginationButtons) {
        paginationButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (this.classList.contains('next')) {
                    const maxPage = Math.ceil(document.querySelectorAll('.project-card:not(.filtered-out)').length / itemsPerPage);
                    if (currentPage < maxPage) {
                        showPage(currentPage + 1);
                    }
                } else {
                    showPage(parseInt(this.textContent));
                }
            });
        });
    }
    
    // Initialize the page
    init();
});