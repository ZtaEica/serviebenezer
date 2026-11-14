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
