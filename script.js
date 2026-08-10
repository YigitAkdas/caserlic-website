/* =========================================================
   CASERLIC
   Interactive Experience
========================================================= */


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   MOUSE PARALLAX
========================================================= */

const orbs =
    document.querySelectorAll(".orb");


const heroVisual =
    document.querySelector(".hero-visual");


window.addEventListener(
    "mousemove",
    (event) => {

        const x =
            (event.clientX / window.innerWidth - 0.5);

        const y =
            (event.clientY / window.innerHeight - 0.5);


        orbs.forEach((orb, index) => {

            const strength =
                (index + 1) * 15;

            orb.style.transform =
                `translate(${x * strength}px, ${y * strength}px)`;

        });


        if (heroVisual) {

            heroVisual.style.transform =
                `
                translateY(-50%)
                translate(${x * 18}px, ${y * 18}px)
                rotateX(${y * -2}deg)
                rotateY(${x * 2}deg)
                `;

        }

    }
);


/* =========================================================
   NAVBAR SCROLL
========================================================= */

const navbar =
    document.querySelector(".navbar");


let lastScroll =
    0;


window.addEventListener(
    "scroll",
    () => {

        const currentScroll =
            window.scrollY;


        if (currentScroll > 40) {

            navbar.style.background =
                "rgba(5,7,12,0.55)";

            navbar.style.borderBottom =
                "1px solid rgba(255,255,255,0.05)";

        } else {

            navbar.style.background =
                "transparent";

            navbar.style.borderBottom =
                "none";

        }


        lastScroll =
            currentScroll;

    },
    {
        passive: true
    }
);


/* =========================================================
   HERO CORE ANIMATION
========================================================= */

const visualCore =
    document.querySelector(".visual-core");


let coreRotation =
    0;


function animateCore() {

    coreRotation += 0.08;

    if (visualCore) {

        visualCore.style.transform =
            `
            translate(-50%, -50%)
            rotate(${coreRotation}deg)
            `;

    }

    requestAnimationFrame(
        animateCore
    );

}


animateCore();


/* =========================================================
   PROJECT HOVER
========================================================= */

const projects =
    document.querySelectorAll(".project");


projects.forEach((project) => {

    project.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                project.getBoundingClientRect();


            const x =
                event.clientX - rect.left;


            const y =
                event.clientY - rect.top;


            const xPercent =
                (x / rect.width - 0.5);


            const yPercent =
                (y / rect.height - 0.5);


            const visual =
                project.querySelector(
                    ".project-visual"
                );


            if (visual) {

                visual.style.transform =
                    `
                    translate(
                        ${xPercent * 12}px,
                        ${yPercent * 12}px
                    )
                    `;

            }

        }
    );


    project.addEventListener(
        "mouseleave",
        () => {

            const visual =
                project.querySelector(
                    ".project-visual"
                );


            if (visual) {

                visual.style.transform =
                    "translate(0,0)";

            }

        }
    );

});


/* =========================================================
   SMOOTH ANCHOR LINKS
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton =
    document.querySelector(".menu-button");


const navLinks =
    document.querySelector(".nav-links");


if (menuButton) {

    menuButton.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "mobile-open"
            );

        }
    );

}


/* =========================================================
   REDUCE MOTION
========================================================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (prefersReducedMotion.matches) {

    document
        .querySelectorAll(".reveal")
        .forEach((element) => {

            element.classList.add(
                "visible"
            );

        });

}