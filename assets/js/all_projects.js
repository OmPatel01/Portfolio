document.addEventListener('DOMContentLoaded', function () {

    // Show all project cards immediately — no pagination for 8 projects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.display = 'block';
    });

    // Remove any pagination container if present
    const pagination = document.querySelector('.pagination');
    if (pagination) {
        pagination.style.display = 'none';
    }

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