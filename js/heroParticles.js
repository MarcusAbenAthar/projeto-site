// Hero Section: Partículas animadas (criptomoedas, sardinhas, foguetes)
document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.createElement('canvas');
  canvas.className = 'hero__particles';
  document.querySelector('.hero').appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let w, h, particles;
  const icons = [];
  const iconImgs = [
    'assets/img/ps_logo.jpg',
    'assets/img/img4.jpg', // sardinha/coin
    'assets/img/logo_original.jpg', // foguete
  ];
  let loaded = 0;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = document.querySelector('.hero').offsetHeight;
  }

  window.addEventListener('resize', resize);

  // Carrega ícones
  iconImgs.forEach(src => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      loaded++;
      if (loaded === iconImgs.length) init();
    };
    icons.push(img);
  });

  function randomIcon() {
    return icons[Math.floor(Math.random() * icons.length)];
  }

  function init() {
    resize();
    particles = Array.from({length: 14}, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 26 + Math.random() * 20,
      speed: 0.3 + Math.random() * 0.7,
      angle: Math.random() * Math.PI * 2,
      icon: randomIcon(),
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.015
    }));
    animate();
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.rot += p.rotSpeed;
      // Wrap
      if (p.x > w + 40) p.x = -40;
      if (p.x < -40) p.x = w + 40;
      if (p.y > h + 40) p.y = -40;
      if (p.y < -40) p.y = h + 40;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = 0.18;
      ctx.drawImage(p.icon, -p.r, -p.r, p.r * 2, p.r * 2);
      ctx.restore();
    }
    requestAnimationFrame(animate);
  }
});
