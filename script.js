document.getElementById("year").textContent=new Date().getFullYear();
window.addEventListener("load",()=>setTimeout(()=>document.querySelector(".loader").classList.add("hide"),250));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll(".reveal, [data-growth], .founder-tag").forEach(el=>io.observe(el));
const nav=document.querySelector(".mobile-nav");
document.querySelector(".menu").addEventListener("click",()=>nav.classList.add("open"));
nav.querySelector("button").addEventListener("click",()=>nav.classList.remove("open"));
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
const developmentGuide = document.getElementById("development-guide");
if (developmentGuide) {
  let guideTrigger;
  document.querySelectorAll("[data-open-development]").forEach(button => {
    button.addEventListener("click", () => {
      const fromMobileMenu = nav.contains(button);
      guideTrigger = fromMobileMenu ? document.querySelector(".menu") : button;
      if (fromMobileMenu) nav.classList.remove("open");
      developmentGuide.showModal();
    });
  });
  developmentGuide.addEventListener("close", () => guideTrigger?.focus());
  developmentGuide.querySelector('a[href="#process"]').addEventListener("click", () => developmentGuide.close());
}
