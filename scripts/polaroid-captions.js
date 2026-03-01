/**
 * Polaroid Photo Captions
 * Handles saving and loading of photo captions
 */

document.addEventListener('DOMContentLoaded', () => {
    const captionInputs = document.querySelectorAll('.caption-input');

    // Load saved captions from localStorage
    captionInputs.forEach((input, index) => {
        const savedCaption = localStorage.getItem(`photo-caption-${index}`);
        if (savedCaption) {
            input.value = savedCaption;
        }

        // Save caption on input
        input.addEventListener('input', (e) => {
            localStorage.setItem(`photo-caption-${index}`, e.target.value);
            console.log(`💾 Saved caption ${index + 1}: "${e.target.value}"`);
        });

        // Add animation when typing
        input.addEventListener('focus', (e) => {
            e.target.parentElement.parentElement.style.transform =
                e.target.parentElement.parentElement.style.transform.replace('rotate', 'rotate(0deg) scale(1.05) ');
        });

        input.addEventListener('blur', (e) => {
            const frame = e.target.parentElement.parentElement;
            // Restore original rotation
            setTimeout(() => {
                frame.style.transform = '';
            }, 300);
        });
    });

    console.log('📸 Polaroid gallery initialized with', captionInputs.length, 'photos');
});

// Export function to clear all captions
window.clearAllCaptions = function() {
    const captionInputs = document.querySelectorAll('.caption-input');
    captionInputs.forEach((input, index) => {
        input.value = '';
        localStorage.removeItem(`photo-caption-${index}`);
    });
    console.log('🗑️ All captions cleared');
};
