// theme var
const toggle = document.querySelector("#checkboxInput");
const body = document.body;
const logo = document.querySelector("#brand-logo");
const switchText = document.querySelector("#switch-text");

// sidebar var
const sidebar = document.querySelector("#sideBar");
const toggleBtn = document.querySelector("#toggle-btn");
const closeBtn = document.querySelector("#close-btn");

// Detect mobile mode based on screen width
function isMobile() {
  return window.innerWidth < 992;
}

// theme
if (toggle && body && logo && switchText) {
  toggle.addEventListener("change", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
      logo.src = "img/nexa-icon-dark.png";
      switchText.innerHTML = "Light Mode";
      localStorage.setItem("theme", "dark");
    } else {
      logo.src = "img/nexa-icon-light.png";
      switchText.innerHTML = "Dark Mode";
      localStorage.setItem("theme", "light");
    }
  });
}

// sidebar (active at mobile)
if (sidebar && toggleBtn && closeBtn) {
  // sidebar open
  toggleBtn.addEventListener("click", () => {
    if (isMobile()) {
      sidebar.classList.add("open");
      localStorage.setItem("sidebarState", "open");
    }
  });

  // sidebar close
  closeBtn.addEventListener("click", () => {
    if (isMobile()) {
      sidebar.classList.remove("open");
      localStorage.setItem("sidebarState", "closed");
    }
  });
}

// close sidebar on outside click (mobile)
document.addEventListener("click", (e) => {
  if (!isMobile()) return;

  if (
    sidebar.classList.contains("open") &&
    !sidebar.contains(e.target) &&
    !toggleBtn.contains(e.target)
  ) {
    sidebar.classList.remove("open");
    localStorage.setItem("sidebarState", "closed");
  }
});

// local storage after page refresh
window.addEventListener("DOMContentLoaded", () => {
  // for theme
  if (toggle && body && logo && switchText) {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      body.classList.add("dark");
      logo.src = "img/nexa-icon-dark.png";
      switchText.innerHTML = "Light Mode";
      toggle.checked = true;
    } else {
      body.classList.remove("dark");
      logo.src = "img/nexa-icon-light.png";
      switchText.innerHTML = "Dark Mode";
      toggle.checked = false;
    }
  }

  // force close sidebar on new page load (mobile)
  if (isMobile()) {
    localStorage.setItem("sidebarState", "closed");
  }

  // for sidebar
  if (sidebar) {
    if (isMobile()) {
      // at mobile
      const savedSidebar = localStorage.getItem("sidebarState");
      if (savedSidebar === "open") {
        sidebar.classList.add("open");
      } else {
        sidebar.classList.remove("open");
      }
    } else {
      // at desktop (main css works now)
      sidebar.classList.remove("open");
    }
  }

  body.classList.remove("no-js");
  body.style.visibility = "visible";
});

// resize handling
window.addEventListener("resize", () => {
  if (sidebar) {
    if (isMobile()) {
      const savedSidebar = localStorage.getItem("sidebarState");
      if (savedSidebar === "open") {
        sidebar.classList.add("open");
      } else {
        sidebar.classList.remove("open");
      }
    } else {
      sidebar.classList.remove("open");
    }
  }
});

// set year
date.innerHTML = new Date().getFullYear();
