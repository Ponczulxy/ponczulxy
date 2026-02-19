document.addEventListener('DOMContentLoaded', () => {
    
   
    const intro = document.getElementById('intro-overlay');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        if(intro) {
            intro.classList.add('intro-hidden');
            setTimeout(() => {
                document.body.style.overflow = 'auto';
            }, 1000);
        }
    }, 2800);

    
    window.addEventListener('mousemove', (e) => {
        document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray;
        let mouse = { x: null, y: null, radius: 150 };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        class Particle {
            constructor(x, y, dirX, dirY, size, color) {
                this.x = x; this.y = y;
                this.dirX = dirX; this.dirY = dirY;
                this.size = size; this.color = color;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) this.dirX = -this.dirX;
                if (this.y > canvas.height || this.y < 0) this.dirY = -this.dirY;

                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < mouse.radius) {
                    if (mouse.x < this.x && this.x < canvas.width - 10) this.x += 2;
                    if (mouse.x > this.x && this.x > 10) this.x -= 2;
                    if (mouse.y < this.y && this.y < canvas.height - 10) this.y += 2;
                    if (mouse.y > this.y && this.y > 10) this.y -= 2;
                }
                this.x += this.dirX;
                this.y += this.dirY;
                this.draw();
            }
        }

        function initParticles() {
            particlesArray = [];
            let n = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < n; i++) {
                let size = Math.random() * 2 + 0.5;
                let x = Math.random() * innerWidth;
                let y = Math.random() * innerHeight;
                let dx = (Math.random() * 0.5) - 0.25;
                let dy = (Math.random() * 0.5) - 0.25;
                particlesArray.push(new Particle(x, y, dx, dy, size, 'rgba(255,255,255,0.2)'));
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            particlesArray.forEach(p => p.update());
            requestAnimationFrame(animateParticles);
        }

        window.addEventListener('resize', () => {
            canvas.width = innerWidth; canvas.height = innerHeight;
            initParticles();
        });

        canvas.width = innerWidth; canvas.height = innerHeight;
        initParticles();
        animateParticles();
    }

    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    
    const progressBar = document.getElementById('progress-bar');
    const heroContent = document.getElementById('hero-content');
    const heroTitle = document.querySelector('#hero-content h1');
    const scrollHint = document.getElementById('scroll-hint');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrolled / winHeight) * 100;

        if (progressBar) progressBar.style.width = `${scrollPercent}%`;

        if (scrolled < 1000) {
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
                heroContent.style.opacity = 1 - (scrolled / 700);
            }
            if (heroTitle) {
                heroTitle.style.letterSpacing = `${scrolled / 35}px`;
            }
            if (scrollHint) {
                scrollHint.style.opacity = 1 - (scrolled / 150);
            }
        }
    }, { passive: true });

    
    const mainProject = document.querySelector('.project-item');
    if (mainProject) {
        mainProject.addEventListener('mouseenter', () => {
            document.body.style.transition = 'background-color 1.2s ease';
            document.body.style.backgroundColor = '#050505';
        });
        mainProject.addEventListener('mouseleave', () => {
            document.body.style.backgroundColor = '#000000';
        });
    }

    console.log("Noir Engine v3.0 (Spotlight + Particles + Intro): Connected");

});
