document.body.insertAdjacentHTML("beforeend", `
  <button class="newsletter-open" type="button" aria-haspopup="dialog">Join the newsletter ↗</button>
  <dialog class="newsletter-dialog" aria-labelledby="newsletter-title">
    <form method="dialog"><button class="newsletter-close" aria-label="Close newsletter signup">×</button></form>
    <p class="eyebrow">Inside the TreeHouse</p>
    <h2 id="newsletter-title">Stay in<br><em>the loop.</em></h2>
    <p>Get creative updates, new work, and artist development notes from TreeHouse Creatives.</p>
    <form action="https://5d202e26.sibforms.com/serve/MUIFANwsxyYE1rYq1pZ7VQC9gkEDQay6GNKUZTjpw0zBySXll5onbUqIL5IpGRx4BUCIDrgGtkc50M8eWvo5Bi6tYb7IUGWhwL2ggKQk_CSfquribPhohyWCeDBYZiLEDMSoImXZEXBcFZycu6WWwMrHNuz-nWdY-vclHPQ4B_QTi80sqkpyU-q1Rh525gVJIlVfUbfMNWvIm_CYtw==" method="POST">
      <input type="hidden" name="locale" value="en">
      <input type="hidden" name="html_type" value="simple">
      <input type="text" name="email_address_check" value="" tabindex="-1" autocomplete="off" hidden>
      <label for="newsletter-email">Your email</label>
      <input id="newsletter-email" name="EMAIL" type="email" autocomplete="email" required>
      <label class="newsletter-consent"><input type="checkbox" name="newsletter_consent" value="Yes, send me the TreeHouse newsletter" required> I’d like to receive the TreeHouse newsletter by email.</label>
      <button class="newsletter-submit" type="submit">Join the newsletter ↗</button>
    </form>
  </dialog>
`);
const newsletterDialog = document.querySelector(".newsletter-dialog");
const newsletterOpen = document.querySelector(".newsletter-open");
newsletterOpen.addEventListener("click", () => newsletterDialog.showModal());
newsletterDialog.addEventListener("close", () => newsletterOpen.focus());
newsletterDialog.addEventListener("click", event => {
  if (event.target === newsletterDialog) {
    const bounds = newsletterDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) newsletterDialog.close();
  }
});
let newsletterSeen = false;
try { newsletterSeen = sessionStorage.getItem("newsletter-seen") === "yes"; } catch {}
if (!newsletterSeen) {
  setTimeout(() => {
    if (document.visibilityState !== "visible" || document.querySelector("dialog[open]")) return;
    newsletterDialog.showModal();
    try { sessionStorage.setItem("newsletter-seen", "yes"); } catch {}
  }, 15000);
}
