document.addEventListener('DOMContentLoaded', function () {
    // ==============================
    // STATE
    // ==============================
    const projectCards = document.querySelectorAll('.project-card');
    const paginationButtons = document.querySelectorAll('.pagination-btn');

    const itemsPerPage = 6;
    let currentPage = 1;

    let projectsData = [];

    // ==============================
    // INIT
    // ==============================
    function init() {
        extractProjectData();
        setupPagination(projectCards.length);
        showPage(1);
        setupPaginationEvents();
    }

    // ==============================
    // DATA EXTRACTION
    // ==============================
    function extractProjectData() {
        projectCards.forEach((card, index) => {
            const projectId = index + 1;
            card.setAttribute('data-id', projectId);

            projectsData.push({
                id: projectId,
                title: card.querySelector('.project-title')?.textContent || ''
            });

            // Update detail page links
            const detailLinks = card.querySelectorAll('a[href*="#"]');
            detailLinks.forEach(link => {
                if (
                    link.classList.contains('view-project') ||
                    link.classList.contains('btn-outline')
                ) {
                    link.href = `#project-${projectId}`;
                }
            });
        });

        localStorage.setItem('projectsData', JSON.stringify(projectsData));
    }

    // ==============================
    // PAGINATION LOGIC
    // ==============================
    function setupPagination(totalItems) {
        const pageCount = Math.ceil(totalItems / itemsPerPage);

        paginationButtons.forEach((btn, index) => {
            if (!btn.classList.contains('next')) {
                btn.style.display = index < pageCount ? 'flex' : 'none';
            }
        });
    }

    function showPage(pageNum) {
        currentPage = pageNum;

        const startIndex = (pageNum - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        projectCards.forEach((project, index) => {
            project.style.display =
                index >= startIndex && index < endIndex ? 'block' : 'none';
        });

        updateActivePagination(pageNum);
    }

    function updateActivePagination(pageNum) {
        paginationButtons.forEach(btn => {
            if (!btn.classList.contains('next')) {
                btn.classList.toggle(
                    'active',
                    parseInt(btn.textContent) === pageNum
                );
            }
        });
    }

    // ==============================
    // EVENTS
    // ==============================
    function setupPaginationEvents() {
        paginationButtons.forEach(button => {
            button.addEventListener('click', function () {
                if (this.classList.contains('next')) {
                    const maxPage = Math.ceil(projectCards.length / itemsPerPage);
                    if (currentPage < maxPage) {
                        showPage(currentPage + 1);
                    }
                } else {
                    showPage(parseInt(this.textContent));
                }
            });
        });
    }

    // ==============================
    // START APP
    // ==============================
    init();
});


// ==============================
// IMAGE HANDLING (UNCHANGED)
// ==============================
function adjustImagesByClass(imageClass) {
    const images = document.getElementsByClassName(imageClass);

    if (images.length === 0) {
        console.warn(`No images with class "${imageClass}" found.`);
        return;
    }

    Array.from(images).forEach(img => {
        let wrapper = img.parentElement;

        if (!wrapper.classList.contains('image-wrapper')) {
            wrapper = document.createElement('div');
            wrapper.classList.add('image-wrapper');
            img.parentNode.insertBefore(wrapper, img);
            wrapper.appendChild(img);

            wrapper.style.overflow = 'hidden';
            wrapper.style.position = 'relative';
            wrapper.style.width = '100%';
            wrapper.style.height = '100%';
        }

        let bgImage = wrapper.querySelector('.background-blur');

        if (!bgImage) {
            bgImage = document.createElement('div');
            bgImage.classList.add('background-blur');
            wrapper.insertBefore(bgImage, img);

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

        img.style.position = 'relative';
        img.style.zIndex = '2';
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        img.style.objectFit = 'contain';

        const adjustImage = function () {
            const containerRatio = wrapper.clientWidth / wrapper.clientHeight;
            const imgRatio = img.naturalWidth / img.naturalHeight;

            if (imgRatio > containerRatio) {
                img.style.width = '100%';
                img.style.height = 'auto';
            } else {
                img.style.width = 'auto';
                img.style.height = '100%';
            }
        };

        img.onload = function () {
            adjustImage();
            bgImage.style.backgroundImage = `url(${img.src})`;
        };

        if (img.complete) {
            img.onload();
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    adjustImagesByClass('responsive-image');

    window.addEventListener('resize', function () {
        adjustImagesByClass('responsive-image');
    });
});