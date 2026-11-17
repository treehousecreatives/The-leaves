document.getElementById("year").textContent=new Date().getFullYear();
window.addEventListener("load",()=>setTimeout(()=>document.querySelector(".loader").classList.add("hide"),250));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll(".reveal, [data-growth], .founder-tag").forEach(el=>io.observe(el));
const nav=document.querySelector(".mobile-nav");
document.querySelector(".menu").addEventListener("click",()=>nav.classList.add("open"));
nav.querySelector("button").addEventListener("click",()=>nav.classList.remove("open"));
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
document.body.insertAdjacentHTML("beforeend", `
  <button class="floating-development" type="button" data-open-development>
    <span class="floating-development-icon" aria-hidden="true">↗</span>
    <span>Start Your Development</span>
  </button>
<dialog id="development-guide" class="development-guide" aria-labelledby="guide-title">
  <form method="dialog"><button class="guide-close" aria-label="Close development guide">×</button></form>
  <h2 id="guide-title">What are you looking for?</h2>
  <div class="guide-options">
    <a href="tree-on-the-mix.html"><strong>Work on my sound</strong><span>Recording, vocal production, mixing, or mastering.</span></a>
    <a href="shot-with-tree.html"><strong>Create visuals for my music</strong><span>Portraits, press photos, cover art, or campaign imagery.</span></a>
    <a href="treehouse-direction.html"><strong>Find my creative direction</strong><span>Artist identity, release concepts, or a cohesive vision.</span></a>
    <a href="development-inquiry.html"><strong>I’m still figuring it out</strong><span>See what we can help with and tell us about your project.</span></a>
  </div>
</dialog>
`);

const developmentGuide = document.getElementById("development-guide");
let guideTrigger;
document.querySelectorAll("[data-open-development]").forEach(button => {
  button.setAttribute("aria-haspopup", "dialog");
  button.setAttribute("aria-controls", developmentGuide.id);
  button.addEventListener("click", () => {
    const fromMobileMenu = nav.contains(button);
    guideTrigger = fromMobileMenu ? document.querySelector(".menu") : button;
    if (fromMobileMenu) nav.classList.remove("open");
    developmentGuide.showModal();
  });
});
developmentGuide.addEventListener("close", () => guideTrigger?.focus());
developmentGuide.querySelectorAll(".guide-options a").forEach(link => {
  link.addEventListener("click", () => developmentGuide.close());
});
