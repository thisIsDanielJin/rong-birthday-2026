/**
 * Vinyl Player Interaction
 * Handles vinyl spinning and optional audio playback
 */

document.addEventListener('DOMContentLoaded', () => {
    const vinylRecord = document.getElementById('vinyl-record');
    const playButton = document.getElementById('play-button');
    const audioElement = document.getElementById('birthday-audio');

    if (!vinylRecord || !playButton) {
        console.error('Vinyl player elements not found');
        return;
    }

    let isPlaying = false;
    let audio = audioElement; // Use HTML5 audio element

    // Fallback to JavaScript Audio if HTML element not found
    if (!audio) {
        console.log('Using JavaScript Audio object as fallback');
        audio = new Audio('audio/song.mp3');
        audio.loop = true;
    }

    audio.volume = 0.7; // Set to 70% volume

    console.log('🎵 Audio ready:', audio.src || 'audio/song.mp3');

    // Toggle vinyl spinning
    const toggleVinyl = () => {
        if (isPlaying) {
            stopVinyl();
        } else {
            startVinyl();
        }
    };

    const startVinyl = () => {
        isPlaying = true;
        vinylRecord.classList.add('spinning');
        playButton.textContent = '⏸ Pause';
        playButton.style.background = 'linear-gradient(135deg, #FFB88C 0%, #FF6B9D 100%)';

        // Play audio if available
        if (audio) {
            audio.play().catch(err => {
                console.log('Audio playback failed:', err);
            });
        }

        console.log('🎵 Vinyl started spinning - Mogwaa - From Above');
    };

    const stopVinyl = () => {
        isPlaying = false;
        vinylRecord.classList.remove('spinning');
        playButton.textContent = '▶ Click to Play';
        playButton.style.background = 'linear-gradient(135deg, var(--soft-pink) 0%, var(--peach) 100%)';

        // Pause audio if available
        if (audio) {
            audio.pause();
        }

        console.log('⏸ Vinyl stopped');
    };

    // Click events
    vinylRecord.addEventListener('click', toggleVinyl);
    playButton.addEventListener('click', toggleVinyl);

    // Touch events for mobile
    vinylRecord.addEventListener('touchstart', (e) => {
        e.preventDefault();
        toggleVinyl();
    });

    // Auto-play removed - browser security often blocks it
    // User must click to start audio
    /*
    // Auto-play when section comes into view (disabled)
    const vinylSection = document.querySelector('.vinyl-section');
    if (vinylSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isPlaying) {
                    setTimeout(() => {
                        startVinyl();
                    }, 500);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(vinylSection);
    }
    */

    // Keyboard controls (spacebar to toggle)
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && window.birthdayUtils.isInViewport(vinylRecord, 0.3)) {
            e.preventDefault();
            toggleVinyl();
        }
    });
});

// Easter egg: Double-click to spin faster
document.addEventListener('DOMContentLoaded', () => {
    const vinylRecord = document.getElementById('vinyl-record');
    let clickCount = 0;
    let clickTimer = null;

    vinylRecord.addEventListener('click', () => {
        clickCount++;

        if (clickTimer) {
            clearTimeout(clickTimer);
        }

        clickTimer = setTimeout(() => {
            if (clickCount >= 3) {
                // Triple click - super fast spin!
                vinylRecord.style.animationDuration = '0.5s';
                console.log('🌀 TURBO MODE ACTIVATED!');

                setTimeout(() => {
                    vinylRecord.style.animationDuration = '2s';
                }, 5000);
            }
            clickCount = 0;
        }, 500);
    });
});
