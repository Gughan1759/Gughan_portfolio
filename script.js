(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-nav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      navigation.classList.toggle("is-open", !isOpen);
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  const photo = document.querySelector("#profile-photo");
  const photoFallback = document.querySelector("#photo-fallback");
  if (photo && photoFallback) {
    const showFallback = () => {
      photo.hidden = true;
      photoFallback.hidden = false;
    };
    photo.addEventListener("error", showFallback);
    photo.addEventListener("load", () => {
      photo.hidden = false;
      photoFallback.hidden = true;
    });
    if (!photo.complete || photo.naturalWidth === 0) showFallback();
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");
  if (form && status) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const subject = String(data.get("subject") || "").trim() || `Portfolio message from ${name}`;
      const message = String(data.get("message") || "").trim();
      const body = `Hi Gughan,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`;
      const mailto = `mailto:gughan.sivasubramaniyam@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      status.textContent = "Opening your email app. Review the draft and send it from there.";
      window.location.href = mailto;
    });
  }
})();
