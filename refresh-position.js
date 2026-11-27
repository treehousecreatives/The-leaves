const pageNavigation = performance.getEntriesByType("navigation")[0];
if (pageNavigation?.type === "reload") {
  history.scrollRestoration = "manual";
  if (location.hash) {
    history.replaceState(history.state, "", location.pathname + location.search);
  }
  const resetScrollPosition = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };
  resetScrollPosition();
  window.addEventListener("pageshow", () => {
    resetScrollPosition();
    requestAnimationFrame(resetScrollPosition);
  }, { once: true });
}
