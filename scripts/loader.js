/**
 * Loading Screen Manager
 * Handles initial page load with progress animation
 */

class LoadingManager {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.progressBar = document.getElementById('loading-progress-bar');
        this.landingScene = document.getElementById('landing-scene');
        this.progress = 0;
        this.targetProgress = 0;
        this.isComplete = false;
    }

    init() {
        // Start simulated loading
        this.simulateLoading();

        // Real loading checks
        this.checkResources();
    }

    simulateLoading() {
        // Incremental progress simulation
        const steps = [
            { progress: 20, delay: 300, label: 'Loading magic...' },
            { progress: 40, delay: 500, label: 'Preparing envelope...' },
            { progress: 60, delay: 400, label: 'Adding sparkles...' },
            { progress: 80, delay: 300, label: 'Waking up doggo...' },
            { progress: 95, delay: 200, label: 'Almost ready...' }
        ];

        let currentStep = 0;
        const runStep = () => {
            if (currentStep < steps.length) {
                const step = steps[currentStep];
                this.targetProgress = step.progress;

                // Update text
                const loadingText = document.querySelector('.loading-text');
                if (loadingText) {
                    loadingText.innerHTML = `${step.label}<span class="loading-dots"></span>`;
                }

                setTimeout(() => {
                    currentStep++;
                    runStep();
                }, step.delay);
            }
        };

        runStep();

        // Smooth progress animation
        this.animateProgress();
    }

    animateProgress() {
        const animate = () => {
            if (this.progress < this.targetProgress) {
                this.progress += 1;
                this.updateProgressBar(this.progress);
                requestAnimationFrame(animate);
            } else if (this.isComplete && this.progress < 100) {
                this.progress += 2;
                this.updateProgressBar(this.progress);
                if (this.progress < 100) {
                    requestAnimationFrame(animate);
                } else {
                    this.complete();
                }
            }
        };
        animate();
    }

    updateProgressBar(progress) {
        if (this.progressBar) {
            this.progressBar.style.width = `${progress}%`;
        }
    }

    checkResources() {
        // Check if Three.js is loaded
        const checkThreeJS = setInterval(() => {
            if (typeof THREE !== 'undefined') {
                clearInterval(checkThreeJS);
                console.log('✅ Three.js loaded');
                this.resourceLoaded();
            }
        }, 100);

        // Check if DOM is ready
        if (document.readyState === 'complete') {
            this.resourceLoaded();
        } else {
            window.addEventListener('load', () => {
                this.resourceLoaded();
            });
        }

        // Timeout safety - force complete after 5 seconds
        setTimeout(() => {
            if (!this.isComplete) {
                console.log('⚠️ Loading timeout - completing anyway');
                this.resourceLoaded();
            }
        }, 5000);
    }

    resourceLoaded() {
        if (this.isComplete) return;

        // Mark as complete
        this.isComplete = true;
        this.targetProgress = 100;

        console.log('✅ All resources loaded!');
    }

    complete() {
        console.log('🎉 Loading complete!');

        // Update text
        const loadingText = document.querySelector('.loading-text');
        if (loadingText) {
            loadingText.textContent = 'Ready! ✨';
        }

        // Wait a moment then fade out
        setTimeout(() => {
            // Hide loading screen
            if (this.loadingScreen) {
                this.loadingScreen.classList.add('hidden');
            }

            // Show landing scene
            if (this.landingScene) {
                this.landingScene.style.display = 'flex';
                setTimeout(() => {
                    this.landingScene.style.opacity = '1';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling on landing
                }, 50);
            }

            // Remove loading screen from DOM after animation
            setTimeout(() => {
                if (this.loadingScreen) {
                    this.loadingScreen.remove();
                }
            }, 1000);
        }, 500);
    }
}

// Initialize loading manager immediately
const loadingManager = new LoadingManager();
loadingManager.init();

// Export for access
window.loadingManager = loadingManager;
