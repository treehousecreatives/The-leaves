const floatingDevelopment = document.querySelector(".floating-development");
if (floatingDevelopment) {
  floatingDevelopment.classList.add("scroll-development");
  const updateDevelopmentVisibility = () => {
    floatingDevelopment.classList.toggle("is-visible", window.scrollY > 160);
  };
  window.addEventListener("scroll", updateDevelopmentVisibility, { passive: true });
  updateDevelopmentVisibility();
}
