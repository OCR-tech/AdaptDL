// // =========================================//
// document.addEventListener("DOMContentLoaded", function () {
//   document.querySelectorAll("[include-html]").forEach(function (el) {
//     const file = el.getAttribute("include-html");
//     fetch(file)
//       .then((response) => response.text())
//       .then((data) => {
//         // Try to extract only the .container if present
//         const tempDiv = document.createElement("div");
//         tempDiv.innerHTML = data;
//         let content = tempDiv.querySelector(".container");
//         el.innerHTML = content ? content.innerHTML : data;
//       })
//       .catch(() => {
//         el.innerHTML = "<p>Failed to load content.</p>";
//       });
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[include-html]").forEach(function (el) {
    const file = el.getAttribute("include-html");
    fetch(file)
      .then((response) => response.text())
      .then((data) => {
        el.innerHTML = data;
        // Re-apply theme after content is loaded
        const savedTheme = localStorage.getItem("theme") || "light";
        if (typeof setTheme === "function") setTheme(savedTheme);
      })
      .catch(() => {
        el.innerHTML = "<p>Failed to load content.</p>";
      });
  });
});
