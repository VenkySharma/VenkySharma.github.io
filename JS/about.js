document.addEventListener("DOMContentLoaded", () => {
  console.log("About page loaded with interactive design");

  // ======================================
  // 🎇 Particle Background
  // ======================================
  const canvas = document.getElementById("particle-bg");
  const ctx = canvas.getContext("2d");

  let particles = [];
  const numParticles = 80;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      xSpeed: (Math.random() - 0.5) * 0.5,
      ySpeed: (Math.random() - 0.5) * 0.5
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    connectParticles();
    moveParticles();
    requestAnimationFrame(drawParticles);
  }

  function moveParticles() {
    particles.forEach(p => {
      p.x += p.xSpeed;
      p.y += p.ySpeed;
      if (p.x < 0 || p.x > canvas.width) p.xSpeed *= -1;
      if (p.y < 0 || p.y > canvas.height) p.ySpeed *= -1;
    });
  }

  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
          ctx.lineWidth = 0.3;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  drawParticles();

  // ======================================
  // 📄 Dynamic Content Loader
  // ======================================
  const contentBox = document.getElementById("dynamic-content");
  const navLinks = document.querySelectorAll(".nav-links a[data-section]");

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const section = link.getAttribute("data-section");
      loadSection(section);
    });
  });

  function loadSection(section) {
    let html = "";

    switch (section) {
      case "projects":
        html = `
          <div class="section-header">
            <h2>🚀 My Side Projects</h2>
            <p>Here are some of the projects I've been working on recently.</p>
          </div>
          <div class="card-grid">
            <div class="card">
              <img src="/images/project1-thumbnail.jpg" alt="Project 1">
              <h3>Portfolio Website</h3>
              <p>A sleek portfolio website showcasing my cybersecurity journey and technical blogs.</p>
              <a href="/Html/project1.html" class="btn">Learn More</a>
            </div>
            <div class="card">
              <img src="/images/project2-thumbnail.jpg" alt="Project 2">
              <h3>Web Vulnerability Scanner</h3>
              <p>A Python-based scanner that detects common web vulnerabilities and reports them in real time.</p>
              <a href="/Html/project2.html" class="btn">Learn More</a>
            </div>
          </div>
        `;
        break;

      case "articles":
        html = `
          <div class="section-header">
            <h2>📑 Favorite Articles</h2>
            <p>Some cybersecurity articles that shaped my learning.</p>
          </div>
          <div class="card-grid">
            <div class="card">
              <h3>Understanding XSS Attacks</h3>
              <p>A practical guide to Cross-Site Scripting vulnerabilities and how to prevent them.</p>
              <a href="/Html/article1.html" class="btn">Read More</a>
            </div>
            <div class="card">
              <h3>OWASP Top 10 Explained</h3>
              <p>An overview of the top web application security risks and real-world mitigation steps.</p>
              <a href="/Html/article2.html" class="btn">Read More</a>
            </div>
          </div>
        `;
        break;

      case "videos":
        html = `
          <div class="section-header">
            <h2>🎥 YouTube</h2>
            <p>My latest videos and cybersecurity tutorials.</p>
          </div>
          <div class="card-grid">
            <div class="card">
              <iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID" allowfullscreen></iframe>
              <h3>How I Built My Portfolio Website</h3>
              <p>A walkthrough of my web dev setup and design process.</p>
            </div>
          </div>
        `;
        break;

      case "stories":
        html = `
          <div class="section-header">
            <h2>📖 My Journey</h2>
            <p>Snapshots of how I grew in web development and cybersecurity.</p>
          </div>
          <div class="card-grid">
            <div class="card">
              <h3>From Web Dev to Security</h3>
              <p>Started with frontend, then moved toward understanding how to secure what I build.</p>
            </div>
            <div class="card">
              <h3>First Capture the Flag</h3>
              <p>My first CTF was a turning point — it sparked my love for ethical hacking.</p>
            </div>
          </div>
        `;
        break;

      case "updates":
        html = `
          <div class="section-header">
            <h2>✨ Updates</h2>
            <p>What’s new and what’s coming next.</p>
          </div>
          <div class="card-grid">
            <div class="card">
              <h3>Portfolio 2.0 Launch</h3>
              <p>New animations, cleaner design, and dynamic sections — you’re looking at it now!</p>
            </div>
            <div class="card">
              <h3>Upcoming: Blog Integration</h3>
              <p>Next step — integrating a live blog feed with Markdown support.</p>
            </div>
          </div>
        `;
        break;
    }

    // Animate section load
    contentBox.classList.remove("hidden");
    contentBox.style.opacity = 0;
    setTimeout(() => {
      contentBox.innerHTML = html;
      contentBox.style.opacity = 1;
      contentBox.scrollIntoView({ behavior: "smooth" });
    }, 200);
  }
});
