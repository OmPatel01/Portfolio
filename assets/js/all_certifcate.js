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