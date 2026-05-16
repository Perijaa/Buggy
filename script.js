document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initHeader();
  initHeroParallax();
  initBoatParallax();
  initMobileMenu();
  initScrollAnimations();
  initSmoothScroll();
  initWhatsApp();
});

function initHeroParallax() {
  const layer = document.getElementById('heroBg');
  const hero = document.getElementById('hero');
  if (!layer || !hero) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = 140;
        const shift = Math.min(y * 0.32, max);
        layer.style.transform = `translate3d(0, ${shift}px, 0)`;
        ticking = false;
      });
    },
    { passive: true }
  );
}

function initBoatParallax() {
  const layer = document.getElementById('boatBgParallax');
  const section = document.getElementById('boat');
  if (!layer || !section) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const update = () => {
    const rect = section.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    const scrolled = Math.max(0, -rect.top);
    const shift = Math.min(scrolled * 0.12, 72);
    layer.style.transform = `translate3d(0, ${shift}px, 0)`;
  };

  window.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  update();
}

function initLoader() {
  const loader = document.getElementById('loader');
  
  setTimeout(() => {
    loader.classList.add('hidden');
    
    setTimeout(() => {
      document.querySelectorAll('.hero .anim-fade').forEach(el => {
        el.classList.add('visible');
      });
    }, 200);
  }, 1800);
}

function initHeader() {
  const header = document.getElementById('header');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle('scrolled', window.scrollY > 80);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

function initMobileMenu() {
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mobileMenu');

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

function initScrollAnimations() {
  const elements = document.querySelectorAll('.anim');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) reveal(entry.target);
      });
    },
    {
      threshold: 0.06,
      rootMargin: '0px 0px 120px 0px',
    }
  );

  function reveal(el) {
    if (el.classList.contains('visible')) return;
    el.classList.add('visible');
    observer.unobserve(el);
  }

  elements.forEach((el) => {
    observer.observe(el);
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh && rect.bottom > 0) reveal(el);
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: 'smooth'
      });
    });
  });
}

function initWhatsApp() {
  const fab = document.getElementById('waFab');
  
  window.addEventListener('scroll', () => {
    fab.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });
}
