document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[include-html]").forEach(function (el) {
    const file = el.getAttribute("include-html");
    fetch(file)
      .then((response) => response.text())
      .then((data) => {
        el.innerHTML = data;

        // Attach handler after include
        if (el.id === "group-frame1") {
          const select = el.querySelector("#video-source");
          if (select && typeof updateVideoSource === "function") {
            select.onchange = updateVideoSource;
          }
        }

        // Re-apply theme after content is loaded
        const savedTheme = localStorage.getItem("theme") || "light";
        if (typeof setTheme === "function") setTheme(savedTheme);

        // // Re-apply source mode after content is loaded
        // const sourceMode = localStorage.getItem("sourceMode") || "off";
        // if (typeof setSourceMode === "function") setSourceMode(sourceMode);
      })

      .catch(() => {
        el.innerHTML = "<p>Failed to load content.</p>";
      });
  });
});
