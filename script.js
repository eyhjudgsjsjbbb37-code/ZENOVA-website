
/* ZENOVA SCROLL REVEAL */

const revealElements = document.querySelectorAll(
    ".section-heading, .about-card, .why-card, .faq-item, .contact"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});
// ZENOVA Appearance Studio Controls

const appearanceToggle = document.getElementById("appearanceToggle");
const appearancePanel = document.getElementById("appearancePanel");
const appearanceOverlay = document.getElementById("appearanceOverlay");
const closeAppearance = document.getElementById("closeAppearance");

function openAppearance() {
  appearancePanel.classList.add("active");
  appearanceOverlay.classList.add("active");
}

function closeAppearancePanel() {
  appearancePanel.classList.remove("active");
  appearanceOverlay.classList.remove("active");
}

appearanceToggle.addEventListener("click", openAppearance);
closeAppearance.addEventListener("click", closeAppearancePanel);
appearanceOverlay.addEventListener("click", closeAppearancePanel);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAppearancePanel();
  }
});
// ZENOVA Theme Switcher

const themeButtons = document.querySelectorAll(".theme-option");
const resetThemeButton = document.getElementById("resetAppearance");

function applyTheme(theme) {
  const availableThemes = ["original", "midnight", "gold", "arctic"];

  if (!availableThemes.includes(theme)) {
    theme = "original";
  }

  document.body.setAttribute("data-theme", theme);
  localStorage.setItem("zenova-theme", theme);

  themeButtons.forEach(button => {
    button.classList.toggle(
      "selected",
      button.dataset.theme === theme
    );
  });
}

// Theme selection
themeButtons.forEach(button => {
  button.addEventListener("click", () => {
    applyTheme(button.dataset.theme);
  });
});

// Restore original theme
resetThemeButton.addEventListener("click", () => {
  applyTheme("original");
});

// Load saved theme
const savedTheme = localStorage.getItem("zenova-theme") || "original";
applyTheme(savedTheme);
/* ZENOVA INTRO ANIMATION */

window.addEventListener("load", () => {
  const intro = document.getElementById("zenova-intro");

  if (!intro) return;

  setTimeout(() => {
    intro.classList.add("hide");

    document.body.classList.add("site-loaded");

    setTimeout(() => {
      intro.remove();
    }, 900);

  }, 8200);
});
/* ZENOVA UNIVERSE INTERACTIVE EXPERIENCE */

const universeSteps = {
  create: {
    label: "01 — CREATE",
    title: "Every Great Product Starts With An Idea",
    description:
      "نبدأ بفكرة، ندرس احتياجات الجمهور، ونحول الإبداع إلى رؤية واضحة قابلة للتنفيذ."
  },

  build: {
    label: "02 — BUILD",
    title: "Turning Ideas Into Reality",
    description:
      "نصمم ونطور المنتجات الرقمية بعناية، مع التركيز على الجودة وتجربة المستخدم والتفاصيل."
  },

 launch: {
  label: "03 — LAUNCH",
  title: "Ready To Reach The World",
  description:
    "نجهز منتجاتنا للإطلاق، ونعمل على تقديمها بصورة احترافية تصل إلى الجمهور المستهدف.",
  link: "#products",
  linkText: "EXPLORE OUR PRODUCTS ↗"
}
};

const universeButtons = document.querySelectorAll(".universe-node");
const universeDetails = document.getElementById("universeDetails");

universeButtons.forEach(button => {
  button.addEventListener("click", () => {
    const step = universeSteps[button.dataset.step];

    if (!step || !universeDetails) return;

    universeButtons.forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    universeDetails.style.opacity = "0";
    universeDetails.style.transform = "translateY(12px)";

    setTimeout(() => {
universeDetails.innerHTML = `
  <span>${step.label}</span>
  <h3>${step.title}</h3>
  <p>${step.description}</p>
  ${step.link ? `
    <a href="${step.link}" class="universe-product-link">
      ${step.linkText}
    </a>
  ` : ""}
`;

      universeDetails.style.opacity = "1";
      universeDetails.style.transform = "translateY(0)";
    }, 250);
  });
});
/* ZENOVA UNIVERSE SCROLL ANIMATION */
const universeSection = document.querySelector(".zenova-universe");

if (universeSection) {
  const universeObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      universeSection.classList.add("is-visible");
      universeObserver.disconnect();
    }
  }, {
    threshold: 0
  });

  universeObserver.observe(universeSection);
}