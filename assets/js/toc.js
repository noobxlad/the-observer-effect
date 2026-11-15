/**
 * Table of Contents & Scrollspy — The Observer Effect
 * Generates sticky sidebar TOC, handles mobile accordion, and highlights active section.
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const tocContainer = document.getElementById("toc");
    const article = document.querySelector(".post-content");
    const sidebar = document.querySelector(".post-sidebar");

    if (!tocContainer || !article) return;

    const headings = Array.from(article.querySelectorAll("h2, h3"));
    if (headings.length < 2) {
      if (sidebar) sidebar.style.display = "none";
      return;
    }

    const list = document.createElement("ul");
    list.className = "toc-list";

    headings.forEach(function (heading, index) {
      if (!heading.id) {
        heading.id = heading.textContent
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim() || ("section-" + index);
      }

      const li = document.createElement("li");
      li.className = heading.tagName === "H3" ? "toc-item toc-h3" : "toc-item";

      const a = document.createElement("a");
      a.href = "#" + heading.id;
      a.textContent = heading.textContent;
      a.className = "toc-link";

      // On mobile, clicking a link closes the dropdown
      a.addEventListener("click", function () {
        const toggle = document.querySelector(".toc-toggle");
        if (toggle && window.innerWidth < 1024) {
          tocContainer.classList.remove("open");
          const wrapper = document.querySelector(".toc-wrapper");
          if (wrapper) wrapper.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });

      li.appendChild(a);
      list.appendChild(li);
    });

    tocContainer.innerHTML = "";
    tocContainer.appendChild(list);

    // Mobile collapsible toggle
    const toggle = document.querySelector(".toc-toggle");
    const wrapper = document.querySelector(".toc-wrapper");
    if (toggle && wrapper) {
      toggle.addEventListener("click", function () {
        const isOpen = tocContainer.classList.toggle("open");
        wrapper.classList.toggle("open", isOpen);
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    }

    // Scrollspy: highlight active heading in TOC as the user scrolls
    const tocLinks = Array.from(document.querySelectorAll(".toc-link"));
    if ("IntersectionObserver" in window && tocLinks.length > 0) {
      let activeHeadingId = null;

      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              activeHeadingId = entry.target.id;
            }
          });

          if (activeHeadingId) {
            tocLinks.forEach(function (link) {
              const matches = link.getAttribute("href") === "#" + activeHeadingId;
              link.classList.toggle("active", matches);
            });
          }
        },
        {
          rootMargin: "-80px 0px -65% 0px",
          threshold: 0
        }
      );

      headings.forEach(function (h) {
        observer.observe(h);
      });
    }
  });
})();
