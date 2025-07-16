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

// GLITCH

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

const intro = document.getElementById('intro');

const hideIntro = () => {
  intro.classList.add('hidden');
  setTimeout(() => {
    intro.style.display = 'none';
  }, 1200);
};

// Show the glitch text after delay (optional stagger)
gsap.from('.glitch .char', {
  opacity: 0,
  y: 100,
  stagger: 0.05,
  delay: 0.8,
  duration: 0.6,
  ease: 'power3.out',
});

// Wait for click to dismiss intro
intro.addEventListener('click', hideIntro);

// grab the layer
const grad = document.querySelector('.gradient-layer');

// create quick setters for maximum perf
const setG1X = gsap.quickSetter(grad, '--g1-x', '%');
const setG1Y = gsap.quickSetter(grad, '--g1-y', '%');
const setG2X = gsap.quickSetter(grad, '--g2-x', '%');
const setG2Y = gsap.quickSetter(grad, '--g2-y', '%');
const setG3X = gsap.quickSetter(grad, '--g3-x', '%');
const setG3Y = gsap.quickSetter(grad, '--g3-y', '%');

window.addEventListener('mousemove', (e) => {
  // normalize to 0–100
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;

  // stagger each blob’s movement for a layered ripple
  setG1X(x * 0.6 + 10); // moves 60% of pointer + 10% offset
  setG1Y(y * 0.6 + 10);

  setG2X(x * 0.4 + 50); // 40% + 50% base
  setG2Y(y * 0.4 + 50);

  setG3X(x * 0.2 + 30); // 20% + 30% base
  setG3Y(y * 0.2 + 30);
});

// create ripple element
const ripple = document.getElementById('ripple');
let last = 0;

window.addEventListener('mousemove', (e) => {
  const now = performance.now();
  if (now - last < 100) return; // throttle to 10fps
  last = now;

  // position
  ripple.style.left = `${e.clientX}px`;
  ripple.style.top = `${e.clientY}px`;

  // animate
  gsap.killTweensOf(ripple);
  gsap.fromTo(
    ripple,
    {
      scale: 0,
      opacity: 1,
    },
    {
      scale: 4,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    },
  );
});
