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
          <img src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=800&q=80" alt="Portfolio Project" style="max-width:300px; border-radius:8px;">
          <h3>A noob's Web..</h3>
          <p>Playing with web and its components just to timepass. It shows you can have fun with Html, Js and css.</p>
          <a href="https://venkysharma.github.io/" class="btn">Learn More</a>
        </div>
        <div class="card">
          <img src="https://images.unsplash.com/photo-1723095469034-c3cf31e32730" alt="Security Tool" style="max-width:300px; border-radius:8px;">
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
    `,

    "To-Do": `
  <h2>📝 To-Do List</h2>
  <div class="todo-container">
    <div class="todo-input-row">
      <input type="text" id="todoInput" placeholder="Don't worry it is not for you. It is for my use to define goals for the day or the week" />
      <button id="todoAddBtn">Add</button>
    </div>
    <ul id="todoList"></ul>
  </div>
`,
    "Weekly-Updates": `
      <h2>📅 Weekly Updates</h2>
      
      <h3>Recent Activity: Fall (Aug–Dec 2025)</h3>
      
      <ul>
        <li>
          <strong>Attended Crypto Winter School 2025 at IIT Bhilai (9–12 December 2025):</strong>
          <p>This was an amazing hands-on experience covering advanced cryptography topics. I learned a lot from experts and had the opportunity to network with peers!</p>
          <p>Official Event Page: <a href="https://events.iitbhilai.ac.in/cws/" target="_blank">Crypto Winter School 2025</a></p>
          <div style="display:flex; gap:20px; flex-wrap:wrap; justify-content:center; margin:20px 0;">
            <img src="/Images/IMG-20251212-WA0018.jpg" alt="Group activity at Crypto Winter School, IIT Bhilai" style="max-width:300px; border-radius:8px;">
            <img src="/Images/IMG20251211145125.jpg" alt="IIT Bhilai Campus during Crypto event" style="max-width:300px; border-radius:8px;">
            <img src="/Images/IMG20251212134507.jpg" alt="Event cuisine" style="max-width:300px; border-radius:8px;">
          </div>
        </li>
      
        <li>
          <strong>Completed Courses in Fall 2025:</strong>
      
          <h4>College Courses (medium difficulty)</h4>
          <ul>
            <li>Generative Artificial Intelligence – Grade: B+ (among ~200 students)</li>
            <li>Hardware Security for IoT – Grade: B+ (among ~50 students)</li>
            <li>Introduction to Machine Learning – Grade: C+ (among ~400 students)</li>
          </ul>
      
          <h4>NPTEL Courses</h4>
          <ul>
            <li>Data Science for Engineers – Grade: 80% (top 5%)</li>
            <li>Responsible & Safe AI Systems – Grade: 75%</li>
            <li>Introduction to Large Language Models – Did not sit for exam due to time conflict, not completed</li>
          </ul>
      
          <p>Grades are not my main priority, but they can impact fellowship opportunities and future prospects, so it’s worth reflecting on performance. For reference, B+ corresponds to 9 and C+ to 7.</p>
      
          <p>Both the Generative AI and Intro to ML courses were math-intensive, but the grades differ because the ML course had double the number of students. Minor calculation mistakes in Decision Trees slightly lowered my grade.</p>
      
          <p>For example, a small entropy miscalculation in the Decision Tree algorithm cost me points. 😊</p>
      
          <p>The Generative AI course was project-heavy, so excelling in projects mattered more than exams. I was the second highest scorer in the GenAI end-sem project, which helped me achieve a B+.</p>
      
          <p>My motivation for choosing these courses was to understand the fundamentals behind ML and LLMs, even though my background is more systems and security-oriented. This knowledge has been invaluable in understanding how models work under the hood.</p>
      
          <p>Overall, I’ve achieved the most crucial goal as a researcher: <strong>learning and understanding!</strong> I feel confident to explain any topic in ML, DL, or LLMs.</p>
      
          <div style="display:flex; gap:20px; flex-wrap:wrap; justify-content:center; margin:20px 0;">
            <img src="/Images/L2hvbWUvZWZzZGF0YS82NV9zZXJ2ZXIvcG9zdEltYWdlLzIwMjUvMTIvMTYvMjAyNTEyMTYwNTM0MjMwNzg1LnBuZw==.jpeg" alt="Course-related image" style="max-width:300px; border-radius:8px;">
          </div>
        </li>
      </ul>
      `,
    


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
      }
      else {
        contentBox.innerHTML = `<p>🚧 Content coming soon...</p>`;
        contentBox.classList.remove("hidden");
      }
    });
  });
});
