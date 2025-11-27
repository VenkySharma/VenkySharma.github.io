document.addEventListener("DOMContentLoaded", () => {
  console.log("About page loaded with particle background.");

  // 🎇 Particle Background (same as before)
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
    ctx.fillStyle = "rgba(255,255,255,0.8)";
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
          ctx.strokeStyle = `rgba(255,255,255,${1 - distance / 100})`;
          ctx.lineWidth = 0.3;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }


  // =====================
// 📝 To-Do Interactions
// =====================

function initTodo() {
  const input = document.getElementById("todoInput");
  const addBtn = document.getElementById("todoAddBtn");
  const list = document.getElementById("todoList");

  if (!input || !addBtn || !list) return;

  addBtn.onclick = () => addTodo();
  input.addEventListener("keypress", e => {
    if (e.key === "Enter") addTodo();
  });

  function addTodo() {
    const task = input.value.trim();
    if (task === "") return;

    const li = document.createElement("li");
    li.className = "todo-item";

    const span = document.createElement("span");
    span.textContent = task;

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.className = "todo-del-btn";
    del.onclick = () => li.remove();

    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);

    input.value = "";
  }
}

  drawParticles();

  // =====================
  // 🧠 Dynamic Content
  // =====================

  const contentBox = document.getElementById("dynamic-content");
  const dropdownLinks = document.querySelectorAll(".dropdown-content a");

  if (!contentBox || dropdownLinks.length === 0) return;

  const contentMap = {
    "Favorite Articles": `
      <h2>📚 Favorite Articles</h2>
      <div class="card-grid">
        <div class="card">
          <h3>Understanding XSS Attacks</h3>
          <p>Learn how Cross-Site Scripting works and how to prevent it effectively.</p>
          <a href="/Html/articles/xss.html" class="btn">Learn More</a>
        </div>
        <div class="card">
          <h3>OWASP Top 10 Explained</h3>
          <p>A breakdown of the most critical web vulnerabilities every developer should know.</p>
          <a href="/Html/articles/owasp.html" class="btn">Learn More</a>
        </div>
        <div class="card">
          <h3>Building a Secure Web App</h3>
          <p>Practical steps for securing your front-end and back-end components.</p>
          <a href="/Html/articles/secureapp.html" class="btn">Learn More</a>
        </div>
      </div>
    `,

    "Side Projects": `
      <h2>🛠️ My Side Projects</h2>
      <div class="card-grid">
        <div class="card">
          <img src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=800&q=80" alt="Portfolio Project">
          <h3>A noob's Web..</h3>
          <p>Playing with web and its components just to timepass. It shows you can have fun with Html, Js and css.</p>
          <a href="https://venkysharma.github.io/" class="btn">Learn More</a>
        </div>
        <div class="card">
          <img src="https://images.unsplash.com/photo-1723095469034-c3cf31e32730?w=800&q=80" alt="Security Tool">
          <h3>Analysis of FIR data</h3>
          <p>Bihar Police report is publicly posted. I have collected all the data(only using FIR Count) related to FIR and have done some analysis on top of that. 
          You can also play on csv data.</p>
          <a href="/Html/about/project1.html" class="btn">Learn More</a>
        </div>
      </div>
    `,

    "Journey in Cyber Sec": `
      <h2>🚀 My Journey in Cyber Security</h2>
      <p>Started with curiosity about how hacking works — now exploring more Cyber security and ethical hacking.</p>
    `

    "To-Do": `
  <h2>📝 To-Do List</h2>
  <div class="todo-container">
    <div class="todo-input-row">
      <input type="text" id="todoInput" placeholder="Add task, event, birthday..." />
      <button id="todoAddBtn">Add</button>
    </div>
    <ul id="todoList"></ul>
  </div>
`

  };

  dropdownLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const text = e.target.textContent.trim();
      const newContent = contentMap[text];

      if (newContent) {
        contentBox.classList.remove("hidden");
        contentBox.style.opacity = 0;
        setTimeout(() => {
          contentBox.innerHTML = newContent;
          contentBox.style.opacity = 1;

          // Initialize TO-DO widget after the content loads
        if (text === "To-Do") initTodo();
        }, 150);
      } else {
        contentBox.innerHTML = `<p>🚧 Content coming soon...</p>`;
        contentBox.classList.remove("hidden");
      }
    });
  });

});
