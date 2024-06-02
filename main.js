"use strict";

import Lenis from "lenis";

const hamburgerEl = document.querySelector(".hamburger");
hamburgerEl.addEventListener("click", function (e) {
  this.classList.toggle("is-clicked");
});

const navLinksEl = document.querySelector(".nav_links");
const navLinksAll = document.querySelectorAll(".nav_link");

navLinksEl.addEventListener("click", function (e) {
  const navEl = e.target;
  if (!navEl.classList.contains("nav_link")) return;

  navLinksAll.forEach((el) => el.classList.remove("is-active"));
  navEl.classList.add("is-active");
});

const sections = document.querySelectorAll(`section[class^="section_"]`);
const header = document.querySelector("header");
const allSections = [header, ...sections];

const observerOpts = {
  root: null,
  threshold: 0.15,
  rootMargin: "0px 0px -50% 0px",
};

const linkObserver = new IntersectionObserver((entries, _) => {
  entries.forEach((entry) => {
    // console.log(
    //   `Observing: ${entry.target.id}, isIntersecting: ${entry.isIntersecting}`
    // );
    if (!entry.isIntersecting) return;

    const id = entry.target.id;
    // console.log(`Intersecting: ${id}`);
    const navEl = navLinksEl.querySelector(`[href="#${id}"]`);
    if (!navEl) return;
    navLinksAll.forEach((el) => el.classList.remove("is-active"));
    navEl.classList.add("is-active");
  });
}, observerOpts);

allSections.forEach((section) => linkObserver.observe(section));

const handleSubmit = (event) => {
  event.preventDefault();

  const myForm = event.target;
  const formData = new FormData(myForm);

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => {
      for (const child of myForm.children) {
        child.value = "";
      }
      alert("Thank you for your submission");
    })
    .catch((error) => alert(error));
};

document.querySelector("form").addEventListener("submit", handleSubmit);

document.addEventListener("DOMContentLoaded", function (e) {
  const headerHeroEl = document.querySelector(".header_hero-content");
  headerHeroEl.classList.add("is-animated");
});

// Lenis scroll
const lenis = new Lenis();

lenis.on("scroll", (e) => {
  console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
