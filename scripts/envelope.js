/**
 * Envelope Opening Animation
 * Handles the click interaction and scene transition
 */

document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const landingScene = document.getElementById('landing-scene');
    const letterContent = document.getElementById('letter-content');
    const envelopeWrapper = document.querySelector('.envelope-wrapper');

    if (!envelope || !landingScene || !letterContent) {
        console.error('Required elements not found');
        return;
    }

    let isOpening = false;

    // Click handler for envelope
    const handleEnvelopeClick = () => {
        if (isOpening) return;
        isOpening = true;

        console.log('🎉 Opening envelope...');

        // Add opening class to trigger animation
        envelope.classList.add('opening');

        // Hide landing scene after flap opens
        setTimeout(() => {
            landingScene.classList.add('hidden');
            // Re-enable scrolling
            document.body.style.overflow = 'auto';

            // Completely remove the landing scene after transition completes
            setTimeout(() => {
                landingScene.style.display = 'none';
            }, 800); // Match the CSS transition duration
        }, 1500);

        // Show letter content after scene transition
        setTimeout(() => {
            letterContent.classList.add('active');
            // Reveal first section
            revealSection(0);
        }, 2500);
    };

    // Add click event listener
    envelopeWrapper.addEventListener('click', handleEnvelopeClick);

    // Also handle touch events for mobile
    envelopeWrapper.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleEnvelopeClick();
    });

    // Hover sound effect (optional - can add subtle audio cue)
    envelopeWrapper.addEventListener('mouseenter', () => {
        if (!isOpening) {
            console.log('✨ Hovering over envelope');
            // Could add subtle audio effect here
        }
    });
});

// Function to reveal sections sequentially
function revealSection(sectionIndex) {
    const sections = document.querySelectorAll('.letter-section');

    if (sectionIndex < sections.length) {
        const section = sections[sectionIndex];
        section.classList.add('visible');

        // Trigger any section-specific animations
        triggerSectionAnimation(section);
    }
}

// Trigger animations specific to each section type
function triggerSectionAnimation(section) {
    if (section.classList.contains('header-section')) {
        console.log('🎂 Header section revealed');
    } else if (section.classList.contains('vinyl-section')) {
        console.log('🎵 Vinyl section revealed');
    } else if (section.classList.contains('closing-section')) {
        console.log('💖 Closing section revealed');
    }
}

// Export for use by other scripts
window.revealSection = revealSection;
