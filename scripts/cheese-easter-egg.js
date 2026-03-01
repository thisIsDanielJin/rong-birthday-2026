/**
 * Cheese Easter Egg - Fart Sound Effect
 * Spinning cheese emojis that play a fart sound when clicked
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🧀 Cheese easter egg script loading...');

    const cheeseLeft = document.getElementById('cheese-left');
    const cheeseRight = document.getElementById('cheese-right');
    const fartSound = document.getElementById('fart-sound');

    console.log('Cheese left:', cheeseLeft);
    console.log('Cheese right:', cheeseRight);
    console.log('Fart sound element:', fartSound);

    if (!cheeseLeft || !cheeseRight) {
        console.error('❌ Cheese emojis not found!');
        return;
    }

    // Fallback if audio element doesn't exist
    if (!fartSound) {
        console.log('⚠️ Fart sound element not found, creating fallback');
        const audio = new Audio('audio/fart.mp3');
        audio.volume = 0.8;

        const playFart = () => {
            console.log('🧀💨 Playing fart (fallback)...');
            audio.currentTime = 0;
            audio.play()
                .then(() => console.log('✅ Fart played!'))
                .catch(err => {
                    console.error('❌ Fart sound playback failed:', err);
                });
        };

        cheeseLeft.addEventListener('click', playFart);
        cheeseRight.addEventListener('click', playFart);
        console.log('✅ Cheese click listeners added (fallback mode)');
        return;
    }

    // Set volume
    fartSound.volume = 0.8;
    console.log('🔊 Fart sound volume set to 0.8');

    // Play fart sound function
    const playFart = (e) => {
        console.log('🧀💨 Cheese clicked! Playing fart...');

        // Reset to beginning
        fartSound.currentTime = 0;

        // Play sound
        fartSound.play()
            .then(() => {
                console.log('✅ Fart sound playing successfully!');
            })
            .catch(err => {
                console.error('❌ Fart sound playback failed:', err);
            });

        // Add temporary animation
        const target = e.currentTarget;
        target.style.animation = 'none';
        setTimeout(() => {
            target.style.animation = 'cheeseSpin 0.5s linear 3';
            console.log('🌀 Cheese spinning fast!');
        }, 10);

        // Reset animation after it completes
        setTimeout(() => {
            target.style.animation = 'cheeseSpin 3s linear infinite';
        }, 1500);
    };

    // Add click listeners
    cheeseLeft.addEventListener('click', playFart);
    cheeseRight.addEventListener('click', playFart);
    console.log('✅ Cheese click listeners added');

    // Touch events for mobile
    cheeseLeft.addEventListener('touchstart', (e) => {
        e.preventDefault();
        playFart(e);
    });

    cheeseRight.addEventListener('touchstart', (e) => {
        e.preventDefault();
        playFart(e);
    });

    console.log('🧀✅ Cheese easter egg fully activated!');
});
