"use strict";

const WHATSAPP_NUMBER = "5500000000000";
const WHATSAPP_MESSAGE = "Olá! Gostaria de saber mais sobre os serviços da Navalha Premium.";

document.querySelectorAll(".whatsapp-link, .contact-copy .button").forEach((link) => {
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
});

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

function closeMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    mainNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
    mainNav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
});

mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
        menuToggle.focus();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 700 && menuToggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
    }
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealElements.forEach((element) => revealObserver.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
}

const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxClose = lightbox.querySelector(".lightbox-close");
let lastGalleryButton;

document.querySelectorAll(".gallery-item").forEach((button) => {
    button.addEventListener("click", () => {
        const thumbnail = button.querySelector("img");
        lightboxImage.src = button.dataset.full;
        lightboxImage.alt = button.dataset.alt || thumbnail.alt;
        lastGalleryButton = button;
        lightbox.showModal();
        lightboxClose.focus();
    });
});

function closeLightbox() {
    lightbox.close();
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});
lightbox.addEventListener("close", () => {
    lightboxImage.src = "";
    if (lastGalleryButton) {
        lastGalleryButton.focus();
    }
});
