const loader = document.getElementById("loader");
const nav = document.getElementById("site-nav");
const menuToggle = document.querySelector(".menu-toggle");
const cursorGlow = document.querySelector(".cursor-glow");

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hide"), 650);
});

menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("nav a");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove("active"));
      const active = document.querySelector(`nav a[href="#${entry.target.id}"]`);
      active?.classList.add("active");
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => sectionObserver.observe(section));

document.querySelectorAll(".tilt-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    if (window.innerWidth < 700) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -11;
    const rotateY = ((x / rect.width) - 0.5) * 11;
    card.style.transform =
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

window.addEventListener("mousemove", (e) => {
  if (cursorGlow) {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  }
});

const words = ["HTML", "CSS", "Python", "Web Design"];
const typing = document.getElementById("typing-text");
let wordIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  if (!typing) return;
  const word = words[wordIndex];

  typing.textContent = deleting
    ? word.slice(0, charIndex--)
    : word.slice(0, charIndex++);

  let delay = deleting ? 55 : 90;

  if (!deleting && charIndex > word.length) {
    deleting = true;
    delay = 1100;
  } else if (deleting && charIndex < 0) {
    deleting = false;
    charIndex = 0;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 350;
  }

  setTimeout(typeLoop, delay);
}

typeLoop();
