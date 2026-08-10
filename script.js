/* =========================================================
   CASERLIC — INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -60px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* =====================================================
       CURSOR GLOW
    ====================================================== */

    const cursorGlow = document.querySelector(".cursor-glow");

    if (
        cursorGlow &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        window.addEventListener("mousemove", (event) => {

            cursorGlow.style.left = `${event.clientX}px`;
            cursorGlow.style.top = `${event.clientY}px`;
            cursorGlow.style.opacity = "1";

        });

        document.addEventListener("mouseleave", () => {
            cursorGlow.style.opacity = "0";
        });

    }


    /* =====================================================
       PROJECT CARD TILT
    ====================================================== */

    const cards = document.querySelectorAll(".project-card");

    if (window.matchMedia("(pointer: fine)").matches) {

        cards.forEach((card) => {

            const art = card.querySelector(".project-art");

            if (!art) return;

            card.addEventListener("mousemove", (event) => {

                const rect = card.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width;

                const y =
                    (event.clientY - rect.top) /
                    rect.height;

                const rotateX = (0.5 - y) * 5;
                const rotateY = (x - 0.5) * 5;

                art.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-6px)`;

            });

            card.addEventListener("mouseleave", () => {

                art.style.transform =
                    "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";

            });

        });

    }


    /* =====================================================
       NAVBAR SCROLL
    ====================================================== */

    const navbar = document.querySelector(".navbar");

    let lastScroll = 0;

    window.addEventListener(
        "scroll",
        () => {

            const currentScroll = window.scrollY;

            if (currentScroll > 30) {

                navbar.style.background =
                    "rgba(3,5,9,.88)";

            } else {

                navbar.style.background =
                    "rgba(3,5,9,.72)";

            }

            lastScroll = currentScroll;

        },
        {
            passive: true
        }
    );


    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    const sections = document.querySelectorAll(
        "section[id]"
    );

    const navItems = document.querySelectorAll(
        ".nav-links a"
    );

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                const id = entry.target.id;

                navItems.forEach((item) => {

                    item.style.color = "";

                    if (
                        item.getAttribute("href") ===
                        `#${id}`
                    ) {
                        item.style.color = "#ffffff";
                    }

                });

            });

        },
        {
            threshold: 0.4
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });


    /* =====================================================
       SMOOTH ANCHOR OFFSET
    ====================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener("click", (event) => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                const navbarHeight =
                    document.querySelector(".navbar")
                        ?.offsetHeight || 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            });

        });


    /* =====================================================
       HERO PARALLAX
    ====================================================== */

    const heroVisual =
        document.querySelector(".hero-visual");

    if (
        heroVisual &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        window.addEventListener(
            "mousemove",
            (event) => {

                const x =
                    (event.clientX /
                        window.innerWidth -
                        0.5);

                const y =
                    (event.clientY /
                        window.innerHeight -
                        0.5);

                heroVisual.style.transform =
                    `translate(
                        ${x * 18}px,
                        ${y * 18}px
                    )`;

            }
        );

    }


    /* =====================================================
       PROJECT IMAGE PLACEHOLDER INTERACTION
    ====================================================== */

    document
        .querySelectorAll(".project-card")
        .forEach((card) => {

            card.addEventListener("mouseenter", () => {

                card.style.zIndex = "3";

            });

            card.addEventListener("mouseleave", () => {

                card.style.zIndex = "";

            });

        });


    /* =====================================================
       CURRENT YEAR
    ====================================================== */

    const yearElement =
        document.querySelector(".footer-right");

    if (yearElement) {

        yearElement.textContent =
            `© ${new Date().getFullYear()} CASERLIC`;

    }

});