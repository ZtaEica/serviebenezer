const wa = document.body.dataset.wa;

// Formulario -> WhatsApp
document.getElementById('wa-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target));
  const lines = [
    'Hola, quiero una cotización de fumigación.',
    `Nombre: ${d.nombre}`,
    `Plaga: ${d.plaga}`,
    d.zona && `Zona: ${d.zona}`,
    d.detalle && `Detalles: ${d.detalle}`,
  ].filter(Boolean);
  window.open(
    `https://wa.me/${wa}?text=${encodeURIComponent(lines.join('\n'))}`,
    '_blank',
    'noopener',
  );
});

// Cabecera con sombra al bajar
const header = document.getElementById('top');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
onScroll();
addEventListener('scroll', onScroll, { passive: true });

// Aparición al hacer scroll
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const items = document.querySelectorAll('.reveal');
if (reduce || !('IntersectionObserver' in window)) {
  items.forEach((el) => el.classList.add('in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  items.forEach((el) => io.observe(el));
}

// Cinta de lugares: duplica la lista para el bucle continuo
const chips = document.querySelector('.chips');
if (chips && !reduce) {
  const clone = chips.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  chips.parentElement.append(clone);
  chips.parentElement.classList.add('run');
}

// Galería ampliada
const lb = document.getElementById('lb');
document.querySelectorAll('.gallery button').forEach((b) =>
  b.addEventListener('click', () => {
    lb.querySelector('img').src = b.dataset.full;
    lb.querySelector('img').alt = b.dataset.cap;
    lb.querySelector('figcaption').textContent = b.dataset.cap;
    lb.showModal();
  }),
);
lb.addEventListener('click', (e) => {
  if (e.target === lb || e.target.closest('.lb-x')) lb.close();
});

// Menú móvil
const burger = document.querySelector('.burger');
const nav = document.getElementById('nav');
const setMenu = (open) => {
  nav.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
};
burger.addEventListener('click', () =>
  setMenu(!nav.classList.contains('open')),
);
nav.addEventListener('click', (e) => {
  if (e.target.closest('a')) setMenu(false);
});
addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setMenu(false);
});

// Enlace activo según la sección visible
const links = [...nav.querySelectorAll('a')];
const secs = links
  .map((a) => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);
if ('IntersectionObserver' in window) {
  const so = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => {
          if (a.getAttribute('href') === '#' + en.target.id)
            a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  secs.forEach((s) => so.observe(s));
}

// Carrusel de la portada
const slides = [...document.querySelectorAll('.slide')];
const dots = [...document.querySelectorAll('.dots button')];
let cur = 0,
  timer;
const show = (i) => {
  cur = (i + slides.length) % slides.length;
  slides.forEach((s, k) => s.classList.toggle('on', k === cur));
  dots.forEach((d, k) => d.classList.toggle('on', k === cur));
};
const play = () => {
  if (!reduce) {
    clearInterval(timer);
    timer = setInterval(() => show(cur + 1), 6500);
  }
};
dots.forEach((d, k) =>
  d.addEventListener('click', () => {
    show(k);
    play();
  }),
);
const hero = document.querySelector('.hero');
hero.addEventListener('mouseenter', () => clearInterval(timer));
hero.addEventListener('mouseleave', play);
document.addEventListener('visibilitychange', () =>
  document.hidden ? clearInterval(timer) : play(),
);
play();
