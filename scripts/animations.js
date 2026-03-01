/**
 * Scroll Animations
 * Uses Intersection Observer for scroll-triggered reveals
 */

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.letter-section');

    if (sections.length === 0) {
        console.log('No sections found for animation');
        return;
    }

    // Intersection Observer options
    const observerOptions = {
        root: null, // viewport
        threshold: 0.3, // 30% of element visible
        rootMargin: '0px'
    };

    // Create observer
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                const sectionIndex = parseInt(section.getAttribute('data-section'));

                // Add visible class to trigger CSS animations
                section.classList.add('visible');

                // Trigger section-specific animations
                triggerSectionSpecificAnimations(section);

                console.log(`📍 Section ${sectionIndex} is now visible`);

                // Optional: Unobserve after revealing (one-time animation)
                // sectionObserver.unobserve(section);
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    console.log(`🔍 Observing ${sections.length} sections for scroll animations`);
});

// Section-specific animation triggers
function triggerSectionSpecificAnimations(section) {
    // Header Section - Float hearts
    if (section.classList.contains('header-section')) {
        const hearts = section.querySelectorAll('.floating-hearts span');
        hearts.forEach((heart, index) => {
            setTimeout(() => {
                heart.style.opacity = '1';
            }, index * 200);
        });
    }

    // Message Section - Fade in message lines
    if (section.classList.contains('message-section')) {
        const messageLines = section.querySelectorAll('.message-line');
        messageLines.forEach((line, index) => {
            line.style.opacity = '0';
            setTimeout(() => {
                line.style.opacity = '1';
            }, index * 300);
        });
    }

    // Gallery Section - Staggered photo reveals
    if (section.classList.contains('gallery-section')) {
        const photos = section.querySelectorAll('.photo-frame');
        photos.forEach((photo, index) => {
            photo.style.opacity = '0';
            photo.style.transform = 'scale(0.8) translateY(30px)';
            setTimeout(() => {
                photo.style.transition = 'all 0.5s ease-out';
                photo.style.opacity = '1';
                photo.style.transform = 'scale(1) translateY(0)';
            }, index * 150);
        });
    }

    // Closing Section - Trigger floating elements
    if (section.classList.contains('closing-section')) {
        const floatingElements = section.querySelectorAll('.float-element');
        floatingElements.forEach((element, index) => {
            // Restart animation by removing and re-adding
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = `floatUp 6s ease-in infinite ${index * 0.5}s`;
            }, 100);
        });
    }
}

// Smooth scroll behavior for any internal links
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Parallax effect for dog character (optional enhancement)
document.addEventListener('DOMContentLoaded', () => {
    const dog = document.querySelector('.dog-character');

    if (dog && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            const moveX = (mouseX - 0.5) * 30; // Max 30px movement
            const moveY = (mouseY - 0.5) * 30;

            dog.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        });
    }
});

// Add "Easter egg" - Konami code or secret interaction
document.addEventListener('DOMContentLoaded', () => {
    let secretSequence = [];
    const code = ['r', 'o', 'n', 'g']; // Type "rong" for easter egg

    document.addEventListener('keydown', (e) => {
        secretSequence.push(e.key.toLowerCase());
        secretSequence = secretSequence.slice(-code.length);

        if (secretSequence.join('') === code.join('')) {
            triggerEasterEgg();
            secretSequence = [];
        }
    });
});

function triggerEasterEgg() {
    console.log('🎊 SECRET DISCOVERED!');

    // Create heart explosion
    const body = document.body;

    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.textContent = ['💖', '✨', '🥐', '🐕', '💿'][Math.floor(Math.random() * 5)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '-50px';
        heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
        heart.style.zIndex = '9999';
        heart.style.pointerEvents = 'none';
        heart.style.animation = `floatUp ${Math.random() * 3 + 3}s ease-out forwards`;

        body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 6000);
    }

    // Show message
    const message = document.createElement('div');
    message.textContent = '🎉 Happy Birthday Rong! You found the secret! 🎉';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.background = 'rgba(255, 192, 203, 0.95)';
    message.style.padding = '2rem';
    message.style.borderRadius = '20px';
    message.style.fontSize = '1.5rem';
    message.style.fontFamily = 'Pacifico, cursive';
    message.style.color = '#8B4513';
    message.style.zIndex = '10000';
    message.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)';
    message.style.textAlign = 'center';

    body.appendChild(message);

    setTimeout(() => {
        message.style.transition = 'opacity 1s';
        message.style.opacity = '0';
        setTimeout(() => message.remove(), 1000);
    }, 3000);
}
