/**
 * Table of Contents Generator — The Observer Effect
 * Auto-generates a TOC from h2 and h3 headings in the article.
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const tocContainer = document.getElementById("toc");
    const article = document.querySelector(".post-content");

    if (!tocContainer || !article) return;

    const headings = article.querySelectorAll("h2, h3");
    if (headings.length < 2) {
      tocContainer.parentElement.style.display = "none";
      return;
    }

    const list = document.createElement("ul");
    list.className = "toc-list";

    headings.forEach(function (heading) {
      // Ensure heading has an id
      if (!heading.id) {
        heading.id = heading.textContent
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim();
      }

      const li = document.createElement("li");
      li.className = heading.tagName === "H3" ? "toc-item toc-h3" : "toc-item";

      const a = document.createElement("a");
      a.href = "#" + heading.id;
      a.textContent = heading.textContent;
      a.className = "toc-link";

      li.appendChild(a);
      list.appendChild(li);
    });

    tocContainer.appendChild(list);

    // Collapsible TOC
    const toggle = document.querySelector(".toc-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        const content = tocContainer;
        const isCollapsed = content.classList.toggle("collapsed");
        toggle.setAttribute("aria-expanded", !isCollapsed);
      });
    }
  });
})();
