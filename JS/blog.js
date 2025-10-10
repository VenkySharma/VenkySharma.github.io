// ============================
// script.js — Modern Blog Logic
// ============================

// Sample post data — replace or load dynamically from JSON/API
const posts = [
  {
    id: 1,
    title: 'Designing for Calm: Micro-interactions that Delight',
    kicker: 'Design · UI',
    date: '2025-10-01',
    summary: 'Small motion can make interfaces feel alive. Here are patterns and principles for tasteful micro-interactions that support UX without distracting from it.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop',
    content: `<p>Micro-interactions are the little moments where a product communicates its status and responds to the user. They can transform a flat UI into something that feels alive and responsive.</p>
    <h3>Principles</h3>
    <ul><li>Purpose first: every animation must have a reason.</li><li>Respect time: keep motion short.</li><li>Prefer transforms over layout changes.</li></ul>
    <p>Example code snippets (CSS) and demo links can be placed here to let readers try the patterns live.</p>`,
    external: ''
  },
  {
    id: 2,
    title: 'Building a Tiny Blog Engine with GitHub Pages',
    kicker: 'Dev · Static Sites',
    date: '2025-09-15',
    summary: 'How to publish a clean blog using GitHub Pages, a single HTML template, and a small JSON file for posts.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop',
    content: `<p>GitHub Pages + a single HTML template can power a tiny, fast blog. Put this file in your repository and point gh-pages to main branch's docs folder, or use the root.</p>
    <h3>Deployment</h3>
    <ol><li>Create repository</li><li>Enable Pages</li><li>Push files</li></ol>
    <p>This article includes a sample 'posts.json' and build-free approach.</p>`,
    external: 'https://medium.com/example-article'
  },
  {
    id: 3,
    title: 'CSS Grid: Layouts for the Modern Web',
    kicker: 'CSS · Layout',
    date: '2025-08-04',
    summary: 'Grid unlocks powerful responsive layouts. This guide covers subgrid, named lines and real-world recipes for dashboard layouts.',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1400&auto=format&fit=crop',
    content: `<p>CSS Grid lets you create two-dimensional layouts with ease. Use named grid areas and template columns to craft semantic layouts.</p>
    <p>Real examples include media galleries, article layouts, and complex dashboards.</p>`,
    external: ''
  }
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
document.getElementById('newPostBtn').addEventListener('click', () => {
  alert('Hook this to your CMS or create a new markdown file in your repo.');
});

// Initial render
renderCards(posts);

// Open from URL hash
(function openFromHash() {
  const m = location.hash.match(/post=(\d+)/);
  if (m) openInModal(parseInt(m[1], 10));
})();
