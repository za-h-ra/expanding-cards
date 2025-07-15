import { gsap } from 'gsap';
import SplitType from 'split-type';

// PANELS
const panels = document.querySelectorAll('.panel');

const removeActiveClasses = () => {
  panels.forEach((panel) => {
    panel.classList.remove('active');
  });
};

panels.forEach((panel) => {
  panel.addEventListener('click', () => {
    removeActiveClasses();
    panel.classList.add('active');
  });
});

// CURSOR
document.addEventListener('DOMContentLoaded', () => {
  // 1) create & inject
  const cursor = document.createElement('div');
  cursor.classList.add('cursor');
  document.body.appendChild(cursor);

  // 2) tell GSAP to center it via transform
  gsap.set(cursor, { xPercent: -50, yPercent: -50 });

  // 3) move it on mousemove
  window.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.2,
      ease: 'power2.out',
    });
  });
});

// 1) split into chars
new SplitType('.glitch', { types: 'chars' });

// 2) grab them
const chars = document.querySelectorAll('.glitch .char');

chars.forEach((char) => {
  char.addEventListener('mouseenter', () => {
    const slices = gsap.utils.random(3, 6, 1);
    const tl = gsap.timeline();

    for (let i = 0; i < slices; i++) {
      // compute a random “start” Y%, then a small thickness
      const start = gsap.utils.random(
        (i / slices) * 100,
        ((i + 1) / slices) * 100,
      );
      const thickness = gsap.utils.random(5, 15);
      const end = start + thickness;

      // animate that one slice
      tl.to(
        char,
        {
          clipPath: `inset(${start}% 0 ${100 - end}% 0)`,
          x: gsap.utils.random(-8, 8),
          duration: 0.1,
          ease: 'power2.out',
        },
        i * 0.08,
      );
    }

    // then restore the full letter
    tl.to(
      char,
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        x: 0,
        duration: 0.2,
        ease: 'expo.out',
      },
      `>0.1`,
    );
  });
});
