/* ===============================
   ABOUT TABS
================================ */

const tabs = document.querySelectorAll(".tab-btn");
const panels = document.querySelectorAll(".tab-panel");

let skillAnimated = false;

tabs.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabs.forEach((b) => b.classList.remove("active"));
    panels.forEach((p) => p.classList.remove("active"));

    btn.classList.add("active");
    const panel = document.getElementById(btn.dataset.tab);
    panel.classList.add("active");

    if (btn.dataset.tab === "skills" && !skillAnimated) {
      animateSkills();
      skillAnimated = true;
    }
  });
});

/* ===============================
   SKILL PROGRESS
================================ */

function animateSkills() {
  document.querySelectorAll(".skill").forEach((skill) => {
    const percent = +skill.dataset.percent;
    const circle = skill.querySelector(".fg");
    const text = skill.querySelector(".percent-text");

    const r = 50;
    const c = 2 * Math.PI * r;

    circle.style.strokeDasharray = c;
    circle.style.strokeDashoffset = c;

    let current = 0;
    const interval = setInterval(() => {
      if (current > percent) {
        clearInterval(interval);
        return;
      }

      text.textContent = current + "%";
      circle.style.strokeDashoffset = c - (current / 100) * c;
      current++;
    }, 15);
  });
}

/* ===============================
   TYPING EFFECT
================================ */

const texts = ["Web Developer", "UI/UX Designer", "Editing"];

let count = 0;
let index = 0;
let isDeleting = false;

const typingElement = document.getElementById("typing");

function typeEffect() {
  if (!typingElement) return;

  const fullText = texts[count];
  let currentText = fullText.substring(0, index);

  typingElement.textContent = currentText;

  let speed = isDeleting ? 60 : 120;

  if (!isDeleting && index < fullText.length) {
    index++;
  } else if (isDeleting && index > 0) {
    index--;
  }

  if (!isDeleting && index === fullText.length) {
    speed = 1400;
    isDeleting = true;
  }

  if (isDeleting && index === 0) {
    isDeleting = false;
    count = (count + 1) % texts.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

/* ===============================
   PROJECT TABS (FIX)
================================ */

const projectTabs = document.querySelectorAll(".project-tabs button");
const projectPanels = document.querySelectorAll(".project-panel");

/* === FUNCTION AKTIFKAN PANEL === */
function activateProject(targetId) {
  projectTabs.forEach((b) => b.classList.remove("active"));
  projectPanels.forEach((p) => {
    p.classList.remove("active");
    p.style.animation = "none";
  });

  const targetPanel = document.getElementById(targetId);
  const targetBtn = document.querySelector(`.project-tabs button[data-target="${targetId}"]`);

  if (targetBtn) targetBtn.classList.add("active");
  if (targetPanel) {
    targetPanel.classList.add("active");
    requestAnimationFrame(() => {
      targetPanel.style.animation = "fadeUp 0.6s ease forwards";
    });
  }
}

/* === CLICK TAB === */
projectTabs.forEach((btn) => {
  btn.addEventListener("click", () => {
    activateProject(btn.dataset.target);
  });
});

/* === AUTO LOAD === */
window.addEventListener("DOMContentLoaded", () => {
  const defaultPanel = document.querySelector(".project-panel.active") || projectPanels[0];

  if (defaultPanel) {
    activateProject(defaultPanel.id);
  }
});

/* ===============================
   SCROLL REVEAL
================================ */

const revealItems = document.querySelectorAll(".project-card, .empty-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((el) => observer.observe(el));

/* ===============================
   CONTACT REVEAL
================================ */

const contactSection = document.querySelector(".contact-section");

window.addEventListener("scroll", () => {
  if (!contactSection) return;

  const top = contactSection.getBoundingClientRect().top;
  if (top < window.innerHeight - 120) {
    contactSection.classList.add("show");
  }
});
