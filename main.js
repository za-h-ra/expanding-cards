import { gsap } from 'gsap';
import SplitType from 'split-type';

// — Cache DOM
const panels = document.querySelectorAll('.panel');
const chars = new SplitType('.glitch', { types: 'chars' }).chars;

// — Glitch hover
chars.forEach((char) => {
  char.addEventListener('mouseenter', () => {
    const slices = gsap.utils.random(3, 6, 1);
    const tl = gsap.timeline();
    for (let i = 0; i < slices; i++) {
      const start = gsap.utils.random(
        (i / slices) * 100,
        ((i + 1) / slices) * 100,
      );
      const thickness = gsap.utils.random(5, 15);
      const end = start + thickness;
      tl.to(
        char,
        {
          clipPath: `inset(${start}% 0 ${100 - end}% 0)`,
          x: gsap.utils.random(-8, 8),
          duration: 0.1,
        },
        i * 0.08,
      );
    }
    tl.to(char, { clipPath: 'inset(0)', x: 0, duration: 0.2 }, '>0.1');
  });
});

// — Panel click
panels.forEach((panel) => {
  panel.addEventListener('click', () => {
    panels.forEach((p) => p.classList.remove('panel--active'));
    panel.classList.add('panel--active');
  });
});

// — Optional: Custom cursor
document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.createElement('div');
  cursor.classList.add('cursor');
  document.body.appendChild(cursor);
  gsap.set(cursor, { xPercent: -50, yPercent: -50 });
  window.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.2,
      ease: 'power2.out',
    });
  });
});
