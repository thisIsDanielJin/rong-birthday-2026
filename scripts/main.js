/**
 * Main JavaScript
 * Handles initialization and global functions
 */

// Preload images
function preloadImages() {
    const images = [
        // Add paths to your images here
        // 'assets/images/photos/photo1.jpg',
        // 'assets/images/photos/photo2.jpg',
    ];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎉 Birthday website initialized!');
    preloadImages();

    // Add performance optimization
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        console.log('Reduced motion preference detected - animations simplified');
    }

    // Prevent default scroll on landing scene
    const landingScene = document.getElementById('landing-scene');
    if (landingScene && !landingScene.classList.contains('hidden')) {
        document.body.style.overflow = 'hidden';
    }
});

// Utility: Check if element is in viewport
function isInViewport(element, threshold = 0.3) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const verticalVisible = rect.top <= windowHeight * (1 - threshold) && rect.bottom >= windowHeight * threshold;
    return verticalVisible;
}

// Utility: Add class with delay
function addClassWithDelay(element, className, delay) {
    setTimeout(() => {
        element.classList.add(className);
    }, delay);
}

// Utility: Remove class with delay
function removeClassWithDelay(element, className, delay) {
    setTimeout(() => {
        element.classList.remove(className);
    }, delay);
}

// Export utilities for other scripts
window.birthdayUtils = {
    isInViewport,
    addClassWithDelay,
    removeClassWithDelay
};
