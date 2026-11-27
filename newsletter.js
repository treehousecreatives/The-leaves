document.body.insertAdjacentHTML("beforeend", `
  <button class="newsletter-open" type="button" aria-haspopup="dialog">Sign Up for Newsletter ↗</button>
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
const newsletterFooter = document.querySelector("footer");
if (newsletterFooter) {
  newsletterFooter.append(document.querySelector(".newsletter-open"));
}
const newsletterDialog = document.querySelector(".newsletter-dialog");
const newsletterOpen = document.querySelector(".newsletter-open");
let newsletterTrigger = newsletterOpen;
document.querySelectorAll(".newsletter-open").forEach(button => {
  button.addEventListener("click", () => {
    newsletterTrigger = button;
    newsletterDialog.showModal();
  });
});
newsletterDialog.addEventListener("close", () => newsletterTrigger.focus());
newsletterDialog.addEventListener("click", event => {
  if (event.target === newsletterDialog) {
    const bounds = newsletterDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) newsletterDialog.close();
  }
});
let newsletterSeen = false;
try { newsletterSeen = sessionStorage.getItem("newsletter-subscribed") === "yes"; } catch {}
const selectedWork = document.querySelector("#work");
if (selectedWork && !newsletterSeen) {
  const openNewsletterAtWork = () => {
    if (newsletterSeen || document.visibilityState !== "visible" || document.querySelector("dialog[open]")) return;
    const bounds = selectedWork.getBoundingClientRect();
    if (bounds.top >= window.innerHeight * .85 || bounds.bottom <= 0) return;
    newsletterDialog.showModal();
    newsletterSeen = true;
    window.removeEventListener("scroll", openNewsletterAtWork);
    document.removeEventListener("visibilitychange", openNewsletterAtWork);
    document.removeEventListener("close", openNewsletterAtWork, true);
  };
  window.addEventListener("scroll", openNewsletterAtWork, { passive: true });
  document.addEventListener("visibilitychange", openNewsletterAtWork);
  document.addEventListener("close", openNewsletterAtWork, true);
  openNewsletterAtWork();
}

const popupNewsletterForm = newsletterDialog.querySelector('form[action]');
const inlineNewsletter = document.querySelector(".newsletter-inline");
if (inlineNewsletter) {
  const inlineForm = popupNewsletterForm.cloneNode(true);
  inlineForm.querySelector("#newsletter-email").id = "newsletter-inline-email";
  inlineForm.querySelector('label[for="newsletter-email"]').htmlFor = "newsletter-inline-email";
  inlineNewsletter.append(inlineForm);
}
document.querySelectorAll('.newsletter-dialog form[action], .newsletter-inline form').forEach(newsletterForm => {
const newsletterStatus = document.createElement("p");
newsletterStatus.setAttribute("role", "status");
newsletterForm.append(newsletterStatus);
newsletterForm.addEventListener("submit", async event => {
  event.preventDefault();
  const submit = newsletterForm.querySelector('[type="submit"]');
  submit.disabled = true;
  newsletterStatus.textContent = "Signing you up…";
  try {
    const response = await fetch(newsletterForm.action + "?isAjax=1", {
      method: "POST",
      body: new FormData(newsletterForm)
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error("Signup could not be completed.");
    }
    try { sessionStorage.setItem("newsletter-subscribed", "yes"); } catch {}
    newsletterSeen = true;
    if (newsletterDialog.contains(newsletterForm)) {
      newsletterDialog.querySelector("#newsletter-title").textContent = "Signup successful!";
      newsletterForm.hidden = true;
      newsletterDialog.querySelector("#newsletter-title + p").textContent =
        "You’re on the list. Welcome to the TreeHouse newsletter! Check your inbox for your confirmation email.";
    } else {
      newsletterForm.replaceChildren(newsletterStatus);
      newsletterStatus.textContent = "Signup successful! You’re on the list. Check your inbox for your confirmation email.";
    }
  } catch {
    newsletterStatus.textContent = "We couldn’t confirm your signup. Please try again.";
  } finally {
    submit.disabled = false;
  }
});

});
