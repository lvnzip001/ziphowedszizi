/**
 * Zipho & Zizi — Wedding Website
 * Vanilla JS: nav, scroll effects, countdown, gallery lightbox, FAQ, RSVP form
 */
(function () {
  "use strict";

  /* Sticky header background on scroll */
  function toggleScrolled() {
    document.body.classList.toggle("scrolled", window.scrollY > 60);
  }
  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /* Mobile nav toggle */
  const navToggle = document.querySelector(".mobile-nav-toggle");

  function setMobileNav(open) {
    document.body.classList.toggle("mobile-nav-active", open);
    if (!navToggle) return;

    navToggle.classList.toggle("bi-list", !open);
    navToggle.classList.toggle("bi-x", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      setMobileNav(!document.body.classList.contains("mobile-nav-active"));
    });
  }
  document.querySelectorAll("#navmenu a").forEach(function (link) {
    link.addEventListener("click", function () {
      setMobileNav(false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setMobileNav(false);
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1199) setMobileNav(false);
  });
  window.addEventListener("pageshow", function () {
    setMobileNav(false);
  });

  /* Scroll-to-top button */
  const scrollTopBtn = document.querySelector(".scroll-top");
  function toggleScrollTop() {
    if (scrollTopBtn) scrollTopBtn.classList.toggle("active", window.scrollY > 300);
  }
  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* Divider draw-in: the thin gold rule scales in from the center the
     first time it scrolls into view, instead of just sitting there static. */
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    var dividerObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            dividerObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll(".divider").forEach(function (el) {
      dividerObserver.observe(el);
    });
  } else {
    document.querySelectorAll(".divider").forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  /* FAQ accordion */
  document.querySelectorAll(".faq-item h3").forEach(function (item) {
    item.addEventListener("click", function () {
      this.parentNode.classList.toggle("faq-active");
    });
  });

  /* -------------------------------------------------
     Countdown timer to the wedding day
     Edit WEDDING_DATE below if the date changes.
     ------------------------------------------------- */
  var WEDDING_DATE = "2027-03-25T14:00:00";

  function startCountdown() {
    var el = document.querySelector("[data-countdown]");
    if (!el) return;
    var target = new Date(WEDDING_DATE).getTime();

    var days = el.querySelector(".cd-days");
    var hours = el.querySelector(".cd-hours");
    var mins = el.querySelector(".cd-mins");
    var secs = el.querySelector(".cd-secs");

    // Only fade a digit when its value actually changes, rather than
    // re-animating all four every second — a small detail that keeps the
    // countdown feeling calm instead of jittery.
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function setIfChanged(node, value) {
      if (!node || node.textContent === value) return;
      if (reduceMotion) {
        node.textContent = value;
        return;
      }
      node.classList.add("tick");
      setTimeout(function () {
        node.textContent = value;
        node.classList.remove("tick");
      }, 200);
    }

    function tick() {
      var now = new Date().getTime();
      var diff = target - now;

      if (diff <= 0) {
        el.innerHTML = '<div class="unit" style="min-width:auto;padding:0.9rem 1.6rem;"><strong>Forever starts today!</strong></div>';
        clearInterval(timer);
        return;
      }

      var d = Math.floor(diff / (1000 * 60 * 60 * 24));
      var h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      var m = Math.floor((diff / (1000 * 60)) % 60);
      var s = Math.floor((diff / 1000) % 60);

      setIfChanged(days, String(d));
      setIfChanged(hours, String(h).padStart(2, "0"));
      setIfChanged(mins, String(m).padStart(2, "0"));
      setIfChanged(secs, String(s).padStart(2, "0"));
    }

    tick();
    var timer = setInterval(tick, 1000);
  }
  startCountdown();

  /* -------------------------------------------------
     RSVP form submission (Formspree-compatible AJAX)
     Update the form's action= URL in rsvp.html with
     your own Formspree endpoint before going live.
     ------------------------------------------------- */
  var rsvpForm = document.querySelector("#rsvp-form");
  if (rsvpForm) {
    rsvpForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var successBox = document.querySelector("#rsvp-success");
      var errorBox = document.querySelector("#rsvp-error");
      var submitBtn = rsvpForm.querySelector('button[type="submit"]');
      var originalLabel = submitBtn ? submitBtn.textContent : "";

      if (successBox) successBox.style.display = "none";
      if (errorBox) errorBox.style.display = "none";
      if (submitBtn) {
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;
      }

      fetch(rsvpForm.action, {
        method: "POST",
        body: new FormData(rsvpForm),
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (response.ok) {
            if (successBox) successBox.style.display = "block";
            rsvpForm.reset();
          } else {
            if (errorBox) errorBox.style.display = "block";
          }
        })
        .catch(function () {
          if (errorBox) errorBox.style.display = "block";
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.textContent = originalLabel;
            submitBtn.disabled = false;
          }
          window.scrollTo({ top: rsvpForm.offsetTop - 140, behavior: "smooth" });
        });
    });
  }

  /* -------------------------------------------------
     Modals (Registry / Honeymoon Fund) — generic enough to reuse for
     any future modal: just add a trigger with data-modal-target="id"
     pointing at a .modal-overlay with that id.
     ------------------------------------------------- */
  var lastModalTrigger = null;

  function openModal(modal, trigger) {
    lastModalTrigger = trigger || null;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    var closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(modal) {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastModalTrigger) lastModalTrigger.focus();
  }

  document.querySelectorAll("[data-modal-target]").forEach(function (trigger) {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      var modal = document.getElementById(trigger.getAttribute("data-modal-target"));
      if (modal) openModal(modal, trigger);
    });
  });

  document.querySelectorAll(".modal-overlay").forEach(function (modal) {
    var closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        closeModal(modal);
      });
    }
    // Click on the dimmed backdrop (not the box itself) closes it too.
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal(modal);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
      var openModalEl = document.querySelector(".modal-overlay.active");
      if (openModalEl) closeModal(openModalEl);
    }
  });

  /* Conditional guest-count field for RSVP */
  var attendingSelect = document.querySelector("#attending");
  var guestsRow = document.querySelector("#guests-row");
  if (attendingSelect && guestsRow) {
    function toggleGuestsRow() {
      guestsRow.style.display = attendingSelect.value === "yes" ? "block" : "none";
    }
    attendingSelect.addEventListener("change", toggleGuestsRow);
    toggleGuestsRow();
  }
})();
