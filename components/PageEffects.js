"use client";

import { useEffect } from "react";

/**
 * Handles everything tied to scroll position and viewport intersection:
 * the top progress bar, the mile-marker HUD, the descending star -> arrow
 * scroll guide with its dotted trail, the end-of-page caption, and the
 * fade-up reveal animations on elements marked with the `.reveal` class.
 *
 * Runs once on mount, after the page content (sections, `.reveal`
 * elements, `[data-mile]` sections) is already in the DOM.
 */
export default function PageEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const progressBar = document.getElementById("progress-bar");
    const hudOdo = document.querySelector("#hud .odo");
    const hudLabel = document.querySelector("#hud span:last-child");
    const endCaption = document.getElementById("end-caption");
    const guideTrail = document.getElementById("guide-trail");
    const guideIcon = document.getElementById("guide-icon");
    const iconStar = document.getElementById("icon-star");
    const iconArrow = document.getElementById("icon-arrow");

    function computeScrollT() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    }

    function updateScrollUI() {
      const scrollT = computeScrollT();
      if (progressBar) progressBar.style.width = (scrollT * 100).toFixed(1) + "%";
      if (endCaption) endCaption.classList.toggle("is-visible", scrollT > 0.94);

      // star -> arrow morph across the first ~18% of the page, then it
      // continues down as an arrow with a dotted trail behind it
      const morphT = Math.min(1, Math.max(0, (scrollT - 0.04) / 0.16));
      const posPct = scrollT * 100;
      if (guideTrail) guideTrail.style.height = posPct + "%";
      if (guideIcon) guideIcon.style.top = posPct + "%";
      if (iconStar) {
        iconStar.style.opacity = 1 - morphT;
        iconStar.style.transform = `scale(${1 - morphT * 0.5}) rotate(${morphT * 70}deg)`;
      }
      if (iconArrow) {
        iconArrow.style.opacity = morphT;
        iconArrow.style.transform = `scale(${0.55 + morphT * 0.45})`;
      }
    }

    window.addEventListener("scroll", updateScrollUI, { passive: true });

    const mileIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hudOdo && hudLabel) {
            hudOdo.textContent = "MILE " + entry.target.dataset.mile;
            hudLabel.textContent = "05 — " + entry.target.dataset.milelabel;
          }
        });
      },
      { threshold: 0.5 }
    );
    const mileSections = document.querySelectorAll("section[data-mile]");
    mileSections.forEach((s) => mileIO.observe(s));

    updateScrollUI();

    // ---------- scroll reveal ----------
    const revealEls = document.querySelectorAll(".reveal");
    let revealIO;
    if (reduceMotion) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    } else {
      revealIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealIO.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach((el) => revealIO.observe(el));
    }

    return () => {
      window.removeEventListener("scroll", updateScrollUI);
      mileIO.disconnect();
      if (revealIO) revealIO.disconnect();
    };
  }, []);

  return null;
}
