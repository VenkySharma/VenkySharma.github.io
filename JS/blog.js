// ============================
// blog.js — Modern Blog Logic + Parallax + Scroll Snapping
// ============================

// --- Your Existing Blog Logic (unchanged) ---

const posts = [
  {
    id: 1,
    title: 'Docker from scratch and Sample web App',
    kicker: 'Docker · Web-App',
    date: '2023-09-23',
    summary: 'Learn how to create a Docker image from scratch and deploy a simple Flask web application. This guide walks you through writing a Dockerfile, building the image, and running the app in a container, making it easy to deploy web applications efficiently.',
    image: 'https://images.unsplash.com/photo-1646627927863-19874c27316b?q=80&w=1400&auto=format&fit=crop',
    content: `<p>Learn how to create a Docker image from scratch and deploy a simple Flask web application. This guide walks you through writing a Dockerfile, building the image, and running the app in a container, making it easy to deploy web applications efficiently.</p>`,
    external: "https://medium.com/@venkateshkumar9211/creating-docker-from-scratch-and-deploying-sample-web-app-c6ca3151a5b5"
  },
  {
    id: 2,
    title: 'Virtualization, Docker and Kubernetes in Google Cloud Platform',
    kicker: 'Google-Cloud · Container',
    date: '2023-10-12',
    summary: 'Explore how Virtualization, Docker, and Kubernetes work together in Google Cloud Platform.',
    image: 'https://images.unsplash.com/photo-1511296265581-c2450046447d?q=80&w=1400&auto=format&fit=crop',
    content: `<p>Explore how Virtualization, Docker, and Kubernetes work together in Google Cloud Platform.
            This blog covers the fundamentals of each technology and 
            demonstrates how they enable scalable and efficient cloud-native application deployment.</p>`,
    external: "https://medium.com/@venkateshkumar9211/virtualization-docker-and-kubernetes-in-google-cloud-platform-b0a062939714"
  },
  {
    id: 3,
    title: 'ML(Kmeans and GMM)',
    kicker: 'ML · Basics',
    date: '2023-08-18',
    summary: 'Performing Kmeans using Cosine Similarity and Gmm on MNIST dataset.',
    image: 'https://images.unsplash.com/photo-1526925539332-aa3b66e35444?q=80&w=1400&auto=format&fit=crop',
    content: `<p>Performing Kmeans using Cosine Similarity and Gmm on MNIST dataset.</p>`,
    external: '/Html/Blogs/ML/Assignment2/m23cse028_report.html'
  },
  {
    id: 4,
    title: 'Diffusion Models and Stories',
    kicker: 'Diffusion models · Image Synthesis',
    date: '2025-10-13',
    summary: 'What are diffusion models, ideas behind it.',
    image: 'https://images.unsplash.com/photo-1608054361605-1bfd5a2b31c7?q=80&w=1400&auto=format&fit=crop',
    content: `
    <p><strong>How does the magic of diffusion models actually work?</strong>  
    At their core, diffusion models are a mathematically principled way to learn how structure emerges from randomness—step by step.</p>
    
    <h2>🧠 What Are Diffusion Models?</h2>
    <p>
    Diffusion models are generative models that learn a data distribution by reversing a gradual stochastic corruption process.
    They define a forward noising process <span>q(x_t | x_0)</span> and a learned reverse denoising process <span>p_θ(x_{t-1} | x_t)</span>.
    </p>
    
    <p>
    Unlike adversarial methods, diffusion models optimize an explicit likelihood-based objective and exhibit remarkable training stability.
    </p>
    
    <h2>🌫️ Forward Diffusion Process (q)</h2>
    <p>
    The forward process incrementally adds Gaussian noise to the data over <em>T</em> timesteps:
    </p>
    
    <p>
    \\[
    q(x_t | x_{t-1}) = \\mathcal{N}(\\sqrt{1 - \\beta_t} \\, x_{t-1}, \\beta_t I)
    \\]
    </p>
    
    <p>
    By composition, we obtain a closed-form expression:
    </p>
    
    <p>
    \\[
    q(x_t | x_0) = \\mathcal{N}(\\sqrt{\\bar{\\alpha}_t} \\, x_0, (1 - \\bar{\\alpha}_t) I)
    \\]
    </p>
    
    <p>
    where \\( \\alpha_t = 1 - \\beta_t \\) and \\( \\bar{\\alpha}_t = \\prod_{i=1}^{t} \\alpha_i \\).
    As \\( t \\to T \\), the distribution converges to isotropic Gaussian noise.
    </p>
    
    <h3>🎞️ Animated SVG Diagram: Forward Process</h3>
    <p>
    An effective animation shows an image gradually dissolving into noise:
    </p>
    <ul>
      <li>Frame 1: Original image (x₀)</li>
      <li>Frames 2–N: Increasing noise opacity, decreasing signal</li>
      <li>Final frame: Pure Gaussian noise (x<sub>T</sub>)</li>
    </ul>
    <p>
    Each timestep animates a linear interpolation weighted by \\( \\sqrt{\\bar{\\alpha}_t} \\).
    </p>
    
    <h2>🔁 Reverse Diffusion Process (p)</h2>
    <p>
    The generative process learns to invert the forward diffusion:
    </p>
    
    <p>
    \\[
    p_θ(x_{t-1} | x_t) = \\mathcal{N}(\\mu_θ(x_t, t), \\sigma_t^2 I)
    \\]
    </p>
    
    <p>
    Rather than predicting \\( x_0 \\) directly, modern diffusion models predict the noise term \\( \\epsilon \\):
    </p>
    
    <p>
    \\[
    \\epsilon_θ(x_t, t) \\approx \\epsilon
    \\]
    </p>
    
    <p>
    This reparameterization improves numerical stability and simplifies training.
    </p>
    
    <h3>🎞️ Animated SVG Diagram: Reverse Process</h3>
    <p>
    This animation runs backward in time:
    </p>
    <ul>
      <li>Start: Static noise field</li>
      <li>Each frame: Noise subtraction + structure emergence</li>
      <li>End: Fully formed image</li>
    </ul>
    <p>
    Arrows are animated with easing functions to emphasize gradual refinement rather than abrupt changes.
    </p>
    
    <h2>📉 Training Objective (Variational Perspective)</h2>
    <p>
    Diffusion models optimize a variational lower bound on the negative log-likelihood.
    In practice, this reduces to a denoising score-matching loss:
    </p>
    
    <p>
    \\[
    \\mathcal{L} = \\mathbb{E}_{x_0, \\epsilon, t}
    \\left[
    \\lVert
    \\epsilon - \\epsilon_θ(\\sqrt{\\bar{\\alpha}_t} x_0 + \\sqrt{1 - \\bar{\\alpha}_t} \\epsilon, t)
    \\rVert^2
    \\right]
    \\]
    </p>
    
    <p>
    This objective scales cleanly with data dimensionality and avoids adversarial instability.
    </p>
    
    <h2>🚀 Advanced Mechanisms in Modern Diffusion Models</h2>
    
    <h3>⚡ DDPM vs DDIM</h3>
    <p>
    DDPM uses a fully stochastic reverse process.
    DDIM reformulates sampling as a deterministic mapping:
    </p>
    
    <p>
    \\[
    x_{t-1} = \\sqrt{\\bar{\\alpha}_{t-1}} \\hat{x}_0 +
    \\sqrt{1 - \\bar{\\alpha}_{t-1}} \\epsilon
    \\]
    </p>
    
    <p>
    This enables high-quality generation in far fewer steps.
    </p>
    
    <h3>🧭 Classifier-Free Guidance</h3>
    <p>
    Guidance is applied by interpolating conditional and unconditional predictions:
    </p>
    
    <p>
    \\[
    \\hat{\\epsilon} = (1 + w) \\epsilon_{cond} - w \\epsilon_{uncond}
    \\]
    </p>
    
    <p>
    The guidance scale \\( w \\) controls the trade-off between diversity and prompt fidelity.
    </p>
    
    <h3>🧩 Latent Diffusion Models</h3>
    <p>
    Latent diffusion performs the process in a compressed latent space \\( z \\):
    </p>
    
    <p>
    \\[
    x \\xrightarrow{Encoder} z \\xrightarrow{Diffusion} \\hat{z}
    \\xrightarrow{Decoder} \\hat{x}
    \\]
    </p>
    
    <p>
    This reduces computational cost by orders of magnitude without sacrificing perceptual quality.
    </p>
    
    <h2>📊 Mathematical Comparison: Diffusion vs GANs vs Flow Models</h2>
    
    <h3>Diffusion Models</h3>
    <p>
    Optimize an explicit variational objective.  
    Likelihood: approximate but well-defined.  
    Sampling: iterative, slow but stable.
    </p>
    
    <p>
    \\[
    \\text{Training: } \\min_θ \\; \\mathbb{E}[|| \\epsilon - \\epsilon_θ ||^2]
    \\]
    </p>
    
    <h3>GANs</h3>
    <p>
    Learn via a minimax game between generator and discriminator.  
    No explicit likelihood.  
    Fast sampling but unstable training.
    </p>
    
    <p>
    \\[
    \\min_G \\max_D \\; \\mathbb{E}_{x \\sim p_{data}}[\\log D(x)] +
    \\mathbb{E}_{z \\sim p(z)}[\\log(1 - D(G(z)))]
    \\]
    </p>
    
    <h3>Normalizing Flows</h3>
    <p>
    Learn exact likelihoods via invertible transformations.  
    Efficient sampling and inference but limited architectural flexibility.
    </p>
    
    <p>
    \\[
    \\log p(x) = \\log p(z) + \\sum_i \\log
    \\left| \\det \\frac{\\partial f_i}{\\partial x} \\right|
    \\]
    </p>
    
    <h3>Summary Table (Conceptual)</h3>
    <ul>
      <li><strong>Diffusion:</strong> Stable, high quality, slow sampling</li>
      <li><strong>GANs:</strong> Fast, sharp images, unstable</li>
      <li><strong>Flows:</strong> Exact likelihoods, architectural constraints</li>
    </ul>
    
    <h2>🌍 Why Diffusion Models Matter</h2>
    <p>
    Diffusion models represent a convergence of probability theory, deep learning, and numerical simulation.
    They have become the backbone of modern image, video, audio, and multimodal generation systems.
    </p>
    
    <p>
    At a deeper level, diffusion models formalize a powerful idea:
    <strong>generation is not creation from nothing, but the controlled removal of uncertainty.</strong>
    </p>
    `,
    external: ''

];

// Elements
const grid = document.getElementById('grid');
const countEl = document.getElementById('count');
const searchInput = document.getElementById('search');
const backdrop = document.getElementById('backdrop');
const modalTitle = document.getElementById('modalTitle');
const modalKicker = document.getElementById('modalKicker');
const modalMeta = document.getElementById('modalMeta');
const modalContent = document.getElementById('modalContent');
const externalOpen = document.getElementById('externalOpen');

let activePost = null;

// Render posts grid
function renderCards(list) {
  grid.innerHTML = '';
  list.forEach((p, i) => {
    const card = document.createElement('article');
    card.className = 'card fade-up';
    card.style.animationDelay = `${i * 60}ms`;

    card.innerHTML = `
      <div class="thumb" style="background-image:linear-gradient(180deg, rgba(7,12,20,0.12), rgba(2,6,23,0.35)), url(${p.image})"></div>
      <div class="kicker">${p.kicker}</div>
      <h3>${p.title}</h3>
      <p class="summary">${p.summary}</p>
      <div class="meta">
        <div style="color:var(--muted);font-size:13px">${new Date(p.date).toLocaleDateString()}</div>
        <div class="tags"><span class="tag">${p.kicker.split('·')[0].trim()}</span></div>
      </div>
      <div class="readrow">
        <button class="btn" onclick="openInModal(${p.id})">Read</button>
        <button class="close" onclick="${p.external ? `window.open('${p.external}', '_blank')` : `sharePost(${p.id})`}">${p.external ? 'Open externally' : 'Share'}</button>
      </div>
    `;

    grid.appendChild(card);
  });
  countEl.textContent = list.length;
}

// Generate tags dynamically
function generatePopularTags() {
  const tagCount = {};
  
  posts.forEach(post => {
    const tags = post.kicker.split('·').map(t => t.trim());
    tags.forEach(tag => tagCount[tag] = (tagCount[tag] || 0) + 1);
  });

  const sortedTags = Object.entries(tagCount).sort((a, b) => b[1] - a[1]);
  const tagListContainer = document.querySelector('.taglist');
  tagListContainer.innerHTML = '';

  sortedTags.forEach(([tag]) => {
    const btn = document.createElement('button');
    btn.className = 'tag';
    btn.textContent = tag;
    btn.onclick = () => filterByTag(tag);
    tagListContainer.appendChild(btn);
  });
}

function filterByTag(tag) {
  const filtered = posts.filter(post => post.kicker.includes(tag));
  renderCards(filtered);
}

// Modal handling
function openInModal(id) {
  const p = posts.find(x => x.id === id);
  if (!p) return;
  activePost = p;
  modalTitle.textContent = p.title;
  modalKicker.textContent = p.kicker;
  modalMeta.textContent = `Published on ${new Date(p.date).toLocaleDateString()}`;
  modalContent.innerHTML = `
    <div style="margin-bottom:12px;border-radius:10px;overflow:hidden;height:300px;background-size:cover;background-position:center;background-image:linear-gradient(180deg,rgba(0,0,0,0.25),transparent), url(${p.image})"></div>
    ${p.content}
  `;
  externalOpen.style.display = p.external ? 'inline-block' : 'none';
  externalOpen.onclick = () => { if (p.external) window.open(p.external, '_blank'); };
  backdrop.style.display = 'flex';
}

document.getElementById('closeModal').onclick = () => {
  backdrop.style.display = 'none';
  activePost = null;
};
backdrop.addEventListener('click', (e) => {
  if (e.target === backdrop) backdrop.style.display = 'none';
});

// Share handler
function sharePost(id) {
  const link = `${window.location.href.split('#')[0]}#post=${id}`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard');
  }
}

// Search functionality
searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.summary.toLowerCase().includes(q) ||
    p.kicker.toLowerCase().includes(q)
  );
  renderCards(filtered);
});

// Initial render
renderCards(posts);
generatePopularTags();

// Open post from URL hash
(function openFromHash() {
  const m = location.hash.match(/post=(\d+)/);
  if (m) openInModal(parseInt(m[1], 10));
})();





