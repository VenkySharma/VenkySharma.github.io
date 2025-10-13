// ============================
// script.js — Modern Blog Logic
// ============================

// Sample post data — replace or load dynamically from JSON/API
const posts = [
  {
    id: 1,
    title: 'Docker from scratch and Sample web App',
    kicker: 'Docker · Web-App',
    date: '2023-09-23',
    summary: 'Learn how to create a Docker image from scratch and deploy a simple Flask web application. This guide walks you through writing a Dockerfile, building the image, and running the app in a container, making it easy to deploy web applications efficiently.',
    image: 'https://images.unsplash.com/photo-1646627927863-19874c27316b?q=80&w=1400&auto=format&fit=crop',
    content: `<p>Learn how to create a Docker image from scratch and deploy a simple Flask web application. This guide walks you through writing a Dockerfile, building the image, and running the app in a container, making it easy to deploy web applications efficiently.',
   </p>`,
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
    content: `<p>Performing Kmeans using Cosine Similarity and Gmm on MNIST dataset.</p>
  
  # Diffusion Models Explained (Simple Version)

## 🧠 What Are Diffusion Models?
Diffusion models are like **digital artists**. They start with random noise and gradually turn it into a clear and meaningful image, sound, or video.

Think of it as a computer learning how to **undo chaos** — step by step, it removes the noise until a beautiful picture appears.

---

## 🎨 Simple Analogies

### 1. The Careful Painter
An artist starts by splashing random paint on a canvas and slowly refines it until a painting appears.  
➡️ A diffusion model does the same but with pixels — starting from random noise and improving it step by step.

### 2. The Photo Restorer
Imagine restoring an old photo full of scratches.  
A diffusion model learns to remove the "scratches" (noise) to make the image clear again.

### 3. The Music From Static
It’s like turning radio static into real music by learning what patterns make sense.

---

## 🚀 Why Do We Need Diffusion Models?
Before diffusion models, there were other generative models like **GANs**, **VAEs**, and **Autoregressive Models**.  
They worked — but each had problems:

| Model | What It’s Like | Pros | Cons |
|-------|----------------|------|------|
| **GANs** | Two artists competing | Realistic results | Hard to train |
| **VAEs** | Compressor/Decompressor | Stable | Blurry images |
| **Autoregressive** | Builds step by step | Detailed | Very slow |
| **Diffusion** | Patient restorer | Sharp, stable, flexible | Slow but improving |

So, diffusion models were created because we needed something that was:
✅ Stable  
✅ High-quality  
✅ Creative  
✅ Easy to train  

---

## 🌍 Where Are Diffusion Models Used?

### 🖼️ 1. Image Creation
Create new pictures from text prompts.  
Example: “A panda surfing on a rainbow.”  
Used in **DALL·E**, **Midjourney**, and **Stable Diffusion**.

### 🧑‍🎨 2. Image Editing
Fix, recolor, or stylize existing pictures.  
Used for photo restoration and movie editing.

### 🎬 3. Video & Animation
Turn descriptions into moving scenes.  
Used in animation and film previsualization.

### 🔊 4. Audio & Music
Generate music or realistic sound effects.  
Example: “Soft piano with ocean waves.”

### 🧬 5. Science & Medicine
Used for drug discovery, molecule design, and enhancing medical images like MRI or CT scans.

### 💼 6. Business & Design
Generate product concepts, fashion designs, or marketing visuals automatically.

### ⏰ 7. Prediction Tasks
Predict trends (like stock prices or weather) by learning from noisy data patterns.

---

## 🧩 Summary

| Feature | Why It Matters |
|----------|----------------|
| **Stability** | Easier to train than GANs |
| **Quality** | Produces photo-realistic images |
| **Control** | Responds to text, sketches, or conditions |
| **Versatility** | Works for images, videos, sound, and 3D models |
| **Creativity** | Every generation can be unique |

---

## ✨ In Simple Words
> Diffusion models are like calm, patient artists — they start with random noise and carefully reveal beauty hidden inside it.

---

**References:**
- Lilian Weng, *“What Are Diffusion Models?”* (2021) — [Blog Post](https://lilianweng.github.io/posts/2021-07-11-diffusion-models/)
- Ho et al., *“Denoising Diffusion Probabilistic Models”*, NeurIPS 2020.
- Yang et al., *“Diffusion Models: A Comprehensive Survey”*, 2022.`,
        external: ''
  },

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
// Function to generate tag
function generatePopularTags() {
  const tagCount = {};
  
  posts.forEach(post => {
    const tags = post.kicker.split('·').map(t => t.trim());
    tags.forEach(tag => {
      if (tagCount[tag]) tagCount[tag]++;
      else tagCount[tag] = 1;
    });
  });

  // Sort tags by frequency
  const sortedTags = Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);

  const tagListContainer = document.querySelector('.taglist');
  tagListContainer.innerHTML = '';

  sortedTags.forEach(tag => {
    const btn = document.createElement('button');
    btn.className = 'tag';
    btn.textContent = tag;
    btn.onclick = () => filterByTag(tag);
    tagListContainer.appendChild(btn);
  });
}
// Filter post when tag is called
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
  modalContent.innerHTML = `<div style="margin-bottom:12px;border-radius:10px;overflow:hidden;height:300px;background-size:cover;background-position:center;background-image:linear-gradient(180deg,rgba(0,0,0,0.25),transparent), url(${p.image})"></div>` + p.content;
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

// New post button (demo)
//document.getElementById('newPostBtn').addEventListener('click', () => {
//  alert('Hook this to your CMS or create a new markdown file in your repo.');
//});

// Initial render
renderCards(posts);
generatePopularTags();


// Open from URL hash
(function openFromHash() {
  const m = location.hash.match(/post=(\d+)/);
  if (m) openInModal(parseInt(m[1], 10));
})();
