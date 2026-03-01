/**
 * Particle Effects
 * Sparkles, confetti, and magical effects
 */

class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.animationFrame = null;
    }

    init() {
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particle-canvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '9999';
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.resize();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createSparkle(x, y) {
        const colors = ['#FFD700', '#FFC6D3', '#FFB88C', '#FFFFFF', '#FFE4E1'];
        return {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4 - 2,
            life: 1,
            decay: 0.01 + Math.random() * 0.02,
            size: Math.random() * 4 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.2,
            type: 'sparkle'
        };
    }

    createConfetti(x, y) {
        const colors = ['#FFD4B2', '#FFC6D3', '#FFB88C', '#E8D5F2', '#FFF5E9'];
        return {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 8,
            vy: Math.random() * -10 - 5,
            life: 1,
            decay: 0.005,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.3,
            gravity: 0.3,
            type: 'confetti'
        };
    }

    createHeart(x, y) {
        return {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 3,
            vy: Math.random() * -4 - 2,
            life: 1,
            decay: 0.008,
            size: Math.random() * 20 + 15,
            color: '#FF69B4',
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.15,
            gravity: 0.1,
            type: 'heart'
        };
    }

    explode(x, y, count = 50, type = 'sparkle') {
        for (let i = 0; i < count; i++) {
            if (type === 'sparkle') {
                this.particles.push(this.createSparkle(x, y));
            } else if (type === 'confetti') {
                this.particles.push(this.createConfetti(x, y));
            } else if (type === 'heart') {
                this.particles.push(this.createHeart(x, y));
            }
        }

        if (!this.animationFrame) {
            this.animate();
        }
    }

    update() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.gravity) {
                particle.vy += particle.gravity;
            }

            particle.rotation += particle.rotationSpeed;
            particle.life -= particle.decay;
        });

        // Remove dead particles
        this.particles = this.particles.filter(p => p.life > 0);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.life;
            this.ctx.translate(particle.x, particle.y);
            this.ctx.rotate(particle.rotation);

            if (particle.type === 'sparkle') {
                // Draw star shape
                this.ctx.fillStyle = particle.color;
                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = particle.color;

                this.ctx.beginPath();
                for (let i = 0; i < 5; i++) {
                    const angle = (i * 4 * Math.PI) / 5;
                    const x = Math.cos(angle) * particle.size;
                    const y = Math.sin(angle) * particle.size;
                    if (i === 0) {
                        this.ctx.moveTo(x, y);
                    } else {
                        this.ctx.lineTo(x, y);
                    }
                }
                this.ctx.closePath();
                this.ctx.fill();

            } else if (particle.type === 'confetti') {
                // Draw rectangle
                this.ctx.fillStyle = particle.color;
                this.ctx.fillRect(
                    -particle.size / 2,
                    -particle.size,
                    particle.size,
                    particle.size * 2
                );

            } else if (particle.type === 'heart') {
                // Draw heart shape
                this.ctx.fillStyle = particle.color;
                this.ctx.shadowBlur = 5;
                this.ctx.shadowColor = particle.color;

                const size = particle.size / 20;
                this.ctx.beginPath();
                this.ctx.moveTo(0, size * 3);
                this.ctx.bezierCurveTo(0, size, -size * 5, -size * 2, 0, -size * 8);
                this.ctx.bezierCurveTo(size * 5, -size * 2, 0, size, 0, size * 3);
                this.ctx.fill();
            }

            this.ctx.restore();
        });
    }

    animate() {
        this.update();
        this.draw();

        if (this.particles.length > 0) {
            this.animationFrame = requestAnimationFrame(() => this.animate());
        } else {
            this.animationFrame = null;
        }
    }

    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        if (this.canvas) {
            this.canvas.remove();
        }
    }
}

// Initialize particle system
const particleSystem = new ParticleSystem();

document.addEventListener('DOMContentLoaded', () => {
    particleSystem.init();

    // Trigger explosion when envelope opens
    const envelope = document.getElementById('envelope');
    if (envelope) {
        envelope.addEventListener('click', () => {
            const rect = envelope.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Initial sparkle burst
            particleSystem.explode(centerX, centerY, 30, 'sparkle');

            // Delayed confetti
            setTimeout(() => {
                particleSystem.explode(centerX, centerY, 40, 'confetti');
            }, 300);

            // Hearts
            setTimeout(() => {
                particleSystem.explode(centerX, centerY, 15, 'heart');
            }, 600);
        });
    }
});

// Export for other scripts
window.particleSystem = particleSystem;
