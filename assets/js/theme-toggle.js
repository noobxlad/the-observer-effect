/**
 * Theme Toggle — The Observer Effect
 * Handles dark/light mode switching with localStorage persistence
 * and system preference detection.
 */
(function () {
  "use strict";

  const STORAGE_KEY = "teo-theme";
  const DARK = "dark";
  const LIGHT = "light";

  function getPreferred() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? DARK
      : LIGHT;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);

    // Update toggle button icons
    const btn = document.getElementById("theme-toggle");
    if (btn) {
      const sunIcon = btn.querySelector(".icon-sun");
      const moonIcon = btn.querySelector(".icon-moon");
      if (sunIcon && moonIcon) {
        sunIcon.style.display = theme === DARK ? "block" : "none";
        moonIcon.style.display = theme === DARK ? "none" : "block";
      }
    }
  }

  function toggle() {
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current === DARK ? LIGHT : DARK);
  }

  // Apply theme immediately (also set in head to prevent flash)
  applyTheme(getPreferred());

  // Bind toggle button once DOM is ready
  document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.addEventListener("click", toggle);
    }
    // Re-apply to update icons
    applyTheme(getPreferred());
  });

  // Listen for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function (e) {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? DARK : LIGHT);
      }
    });
})();
