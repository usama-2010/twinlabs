(function () {
  document.documentElement.setAttribute("data-theme", "light");
  document.documentElement.style.colorScheme = "light";
  try {
    localStorage.setItem("theme", "light");
  } catch {}
})();
