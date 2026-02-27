/* ============================================================
   NFPSE — Multi-Page JS  |  script.js
   ============================================================ */
(function() {

  /*  LOADING SCREEN  */
  const loader = document.getElementById('loading-screen');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 600);
      }, 1000);
    });
  }

  /*  HEADER — white on scroll  */
  const header = document.getElementById('header');
  const isLight = document.body.classList.contains('pg-light');

  function checkHeader() {
    if (!header) return;
    if (isLight) {
      /* light pages: always white — already styled via CSS */
      return;
    }
    header.classList.toggle('is-white', window.scrollY > 60);
  }
  window.addEventListener('scroll', checkHeader, { passive: true });
  checkHeader();

  /*  MOBILE NAV  */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  hamburger?.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileNav?.classList.toggle('open', open);
  });

  document.addEventListener('click', (e) => {
    if (!header?.contains(e.target) && !mobileNav?.contains(e.target)) {
      hamburger?.classList.remove('open');
      mobileNav?.classList.remove('open');
    }
  });

  /*  ACTIVE NAV LINK  */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const page = href.split('/').pop();
    if (page === currentPage || (currentPage === '' && page === 'index.html')) {
      a.classList.add('active');
    }
  });

  /*  HERO CANVAS PARTICLES  */
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, pts = [];

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const COLORS = ['#0ea5e9','#38bdf8','#f97316','rgba(255,255,255,0.6)'];

    const newPt = () => ({
      x: Math.random() * W,
      y: H + rand(80),
      r: rand(1.8) + 0.3,
      c: COLORS[Math.floor(rand(COLORS.length))],
      vx: (rand(1) - 0.5) * 0.5,
      vy: -(rand(0.9) + 0.3),
      life: 0,
      max: rand(180) + 100
    });

    function rand(n) { return Math.random() * n; }

    for (let i = 0; i < 80; i++) {
      const p = newPt();
      p.y = rand(H);
      p.life = rand(p.max);
      pts.push(p);
    }

    function hex2rgba(hex, a) {
      if (hex.startsWith('rgba')) return hex.replace(/[\d.]+\)$/, a + ')');
      const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
      return `rgba(${r},${g},${b},${a})`;
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);
      /* subtle center glow */
      const g = ctx.createRadialGradient(W/2,H,0,W/2,H,W*0.5);
      g.addColorStop(0,'rgba(14,165,233,0.06)');
      g.addColorStop(1,'transparent');
      ctx.fillStyle = g; ctx.fillRect(0,0,W,H);

      pts.forEach((p, i) => {
        p.life++; p.x += p.vx; p.y += p.vy;
        const prog = p.life / p.max;
        const alpha = 0.6 * Math.sin(Math.PI * prog);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = hex2rgba(p.c, alpha.toFixed(2));
        ctx.shadowBlur = 4; ctx.shadowColor = p.c;
        ctx.fill(); ctx.shadowBlur = 0;
        if (p.life >= p.max) pts[i] = newPt();
      });
      requestAnimationFrame(frame);
    }
    frame();
  }

  /*  TYPEWRITER  */
  const twEl = document.getElementById('tw-text');
  if (twEl) {
    const words = ['Fire Protection','Fire Prevention','Fire Suppression'];
    let wi = 0, ci = 0, del = false;

    function tick() {
      const w = words[wi];
      if (!del) {
        twEl.textContent = w.slice(0, ++ci);
        if (ci === w.length) { del = true; setTimeout(tick, 2400); return; }
        setTimeout(tick, 75);
      } else {
        twEl.textContent = w.slice(0, --ci);
        if (ci === 0) { del = false; wi = (wi+1) % words.length; setTimeout(tick, 350); return; }
        setTimeout(tick, 42);
      }
    }
    setTimeout(tick, 2400);
  }

  /*  COUNTER ANIMATION  */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        const el = e.target;
        const target = parseInt(el.dataset.count, 10);
        const dur = 2000, step = 16;
        let cur = 0;
        const inc = target / (dur / step);
        const t = setInterval(() => {
          cur += inc;
          if (cur >= target) { el.textContent = target; clearInterval(t); }
          else el.textContent = Math.floor(cur);
        }, step);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => io.observe(c));
  }

  /*  SCROLL REVEAL  */
  const reveals = document.querySelectorAll('[data-r]');
  if (reveals.length) {
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target;
          const delay = el.dataset.delay || '0';
          el.style.transitionDelay = delay + 'ms';
          el.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
          el.style.opacity = '1';
          el.style.transform = 'none';
          ro.unobserve(el);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(r => ro.observe(r));
  }

  /*  SERVICE TOGGLE  */
  document.querySelectorAll('.svc-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.svc-item');
      const open = item.classList.toggle('opened');
      btn.innerHTML = open
        ? 'Show less <i class="fas fa-minus"></i>'
        : 'Read more <i class="fas fa-plus"></i>';
    });
  });

  /*  PDF OPENER  */
  window.openPDF = (f) => window.open(f, '_blank');

  /*  STAT BAR ANIMATE (home hero stats)  */
  document.querySelectorAll('.stat-bar').forEach(bar => {
    const w = bar.dataset.width || '75%';
    setTimeout(() => { bar.style.transition = 'width 1.4s cubic-bezier(0.4,0,0.2,1)'; bar.style.width = w; }, 2600);
  });

})();
