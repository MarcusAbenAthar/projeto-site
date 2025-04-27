// Partículas animadas no Hero (efeito tech)
document.addEventListener('DOMContentLoaded', function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Cria SVG de partículas
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.classList.add('hero__particles');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.setAttribute('viewBox', '0 0 1440 400');

  // Gera partículas
  for (let i = 0; i < 18; i++) {
    const circle = document.createElementNS(svgNS, 'circle');
    const cx = Math.random() * 1440;
    const cy = 60 + Math.random() * 280;
    const r = 6 + Math.random() * 8;
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', r);
    circle.setAttribute('fill', 'url(#glowGradient)');
    circle.setAttribute('opacity', '0.13');
    svg.appendChild(circle);
  }

  // Gradiente glow
  const defs = document.createElementNS(svgNS, 'defs');
  const radial = document.createElementNS(svgNS, 'radialGradient');
  radial.setAttribute('id', 'glowGradient');
  radial.innerHTML = `
    <stop offset="0%" stop-color="#FF6F00" stop-opacity="1"/>
    <stop offset="80%" stop-color="#FFC107" stop-opacity="0.5"/>
    <stop offset="100%" stop-color="#0A0A0A" stop-opacity="0"/>
  `;
  defs.appendChild(radial);
  svg.appendChild(defs);

  hero.appendChild(svg);

  // === NEON GRID PARALLAX ===
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    document.documentElement.style.setProperty('--ng1', `${y * 0.3}px`);
    document.documentElement.style.setProperty('--ng2', `${y * 0.1}px`);
  });

  // === COIN CLUSTER ON HOVER ===
  const hoverEls = document.querySelectorAll('.vip-benefits__card');
  hoverEls.forEach(el => {
    el.addEventListener('mouseover', (e) => {
      for (let i = 0; i < 5; i++) {
        const coin = document.createElement('div');
        coin.classList.add('coin-cluster');
        // Substituindo o texto pelo ícone SVG do Bitcoin
        const img = document.createElement('img');
        img.src = 'https://cdn-icons-png.flaticon.com/512/5409/5409705.png';
        img.alt = 'Bitcoin';
        img.classList.add('coin-cluster-icon');
        coin.appendChild(img);
        const dx = Math.random() * 100 - 50;
        const dy = -Math.random() * 100;
        coin.style.setProperty('--dx', `${dx}px`);
        coin.style.setProperty('--dy', `${dy}px`);
        coin.style.left = `${e.pageX}px`;
        coin.style.top = `${e.pageY}px`;
        document.body.appendChild(coin);
        coin.addEventListener('animationend', () => coin.remove());
      }
    });
  });

  // === SCROLL REVEAL ===
  const revealEls = document.querySelectorAll('.revealable');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('reveal');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => observer.observe(el));

  // === THEME TOGGLE ===
  const themeToggle = document.querySelector('.theme-toggle');
  const root = document.documentElement;
  const stored = localStorage.getItem('theme') || root.getAttribute('data-theme');
  const apply = theme => {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
  };
  apply(stored);
  themeToggle.addEventListener('click', () => apply(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

  // === BACK TO TOP LOGIC ===
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});
