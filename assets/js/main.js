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
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      document.body.classList.toggle("mobile-nav-active");
      navToggle.classList.toggle("bi-list");
      navToggle.classList.toggle("bi-x");
    });
  }
  document.querySelectorAll("#navmenu a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (document.body.classList.contains("mobile-nav-active")) {
        document.body.classList.remove("mobile-nav-active");
        if (navToggle) {
          navToggle.classList.add("bi-list");
          navToggle.classList.remove("bi-x");
        }
      }
    });
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

  /* AOS scroll animations */
  window.addEventListener("load", function () {
    if (window.AOS) {
      AOS.init({ duration: 700, easing: "ease-in-out", once: true, mirror: false });
    }
  });

  /* GLightbox for the photo gallery */
  window.addEventListener("load", function () {
    if (window.GLightbox) {
      GLightbox({ selector: ".glightbox" });
    }
  });

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
