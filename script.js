/* =========================================================
   CASERLIC V2
   Interactive JavaScript
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const navbar =
    document.querySelector(".navbar");

const heroArt =
    document.querySelector(".hero-art");

const cursorLight =
    document.querySelector(".light-cursor");

const canvas =
    document.getElementById("particleCanvas");

const ctx =
    canvas ? canvas.getContext("2d") : null;


/* =========================================================
   NAVBAR
========================================================= */

function updateNavbar() {

    if (!navbar) return;

    if (window.scrollY > 30) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
);


updateNavbar();


/* =========================================================
   MOUSE LIGHT + HERO PARALLAX
========================================================= */

let mouseX = window.innerWidth * 0.5;
let mouseY = window.innerHeight * 0.4;

let targetX = mouseX;
let targetY = mouseY;


window.addEventListener(
    "pointermove",
    (event) => {

        targetX = event.clientX;
        targetY = event.clientY;

    },
    { passive: true }
);


function animatePointer() {

    mouseX +=
        (targetX - mouseX) * 0.08;

    mouseY +=
        (targetY - mouseY) * 0.08;


    if (cursorLight) {

        cursorLight.style.left =
            `${mouseX}px`;

        cursorLight.style.top =
            `${mouseY}px`;

    }


    if (heroArt && window.innerWidth > 900) {

        const x =
            (mouseX / window.innerWidth - 0.5);

        const y =
            (mouseY / window.innerHeight - 0.5);


        heroArt.style.transform =
            `
            translateY(-50%)
            translate3d(${x * 18}px, ${y * 18}px, 0)
            rotateX(${y * -2}deg)
            rotateY(${x * 2}deg)
            `;

    }


    requestAnimationFrame(
        animatePointer
    );

}


animatePointer();


/* =========================================================
   SCROLL REVEALS
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -60px 0px"
        }
    );


revealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   PARTICLE SYSTEM
========================================================= */

const particles = [];

let canvasWidth = 0;
let canvasHeight = 0;

const particleCount =
    window.innerWidth < 700 ? 45 : 85;


function resizeCanvas() {

    if (!canvas || !ctx) return;

    const pixelRatio =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );


    canvasWidth =
        window.innerWidth;

    canvasHeight =
        window.innerHeight;


    canvas.width =
        canvasWidth * pixelRatio;

    canvas.height =
        canvasHeight * pixelRatio;


    canvas.style.width =
        `${canvasWidth}px`;

    canvas.style.height =
        `${canvasHeight}px`;


    ctx.setTransform(
        pixelRatio,
        0,
        0,
        pixelRatio,
        0,
        0
    );

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


function createParticles() {

    particles.length = 0;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        particles.push({

            x:
                Math.random() *
                canvasWidth,

            y:
                Math.random() *
                canvasHeight,

            radius:
                Math.random() * 1.5 + .25,

            speedX:
                (Math.random() - .5) *
                .18,

            speedY:
                (Math.random() - .5) *
                .18,

            opacity:
                Math.random() * .5 + .1

        });

    }

}


createParticles();


function drawParticles() {

    if (!canvas || !ctx) return;


    ctx.clearRect(
        0,
        0,
        canvasWidth,
        canvasHeight
    );


    particles.forEach(
        (particle) => {

            particle.x +=
                particle.speedX;

            particle.y +=
                particle.speedY;


            if (
                particle.x < -10
            ) {
                particle.x =
                    canvasWidth + 10;
            }

            if (
                particle.x >
                canvasWidth + 10
            ) {
                particle.x = -10;
            }


            if (
                particle.y < -10
            ) {
                particle.y =
                    canvasHeight + 10;
            }

            if (
                particle.y >
                canvasHeight + 10
            ) {
                particle.y = -10;
            }


            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.radius,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(100,210,255,${particle.opacity})`;


            ctx.fill();

        }
    );


    requestAnimationFrame(
        drawParticles
    );

}


drawParticles();


/* =========================================================
   PROJECT CARD PARALLAX
========================================================= */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


projectCards.forEach(
    (card) => {

        card.addEventListener(
            "pointermove",
            (event) => {

                if (
                    window.innerWidth < 900
                ) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const xPercent =
                    x / rect.width -
                    0.5;


                const yPercent =
                    y / rect.height -
                    0.5;


                const art =
                    card.querySelector(
                        ".project-art"
                    );


                if (art) {

                    art.style.transform =
                        `
                        translate3d(
                            ${xPercent * 18}px,
                            ${yPercent * 18}px,
                            0
                        )
                        `;

                }

            }
        );


        card.addEventListener(
            "pointerleave",
            () => {

                const art =
                    card.querySelector(
                        ".project-art"
                    );


                if (art) {

                    art.style.transform =
                        "translate3d(0,0,0)";

                }

            }
        );

    }
);


/* =========================================================
   MOBILE MENU
========================================================= */

const mobileMenuButton =
    document.querySelector(
        ".mobile-menu-button"
    );


const desktopNav =
    document.querySelector(
        ".desktop-nav"
    );


if (mobileMenuButton) {

    mobileMenuButton.addEventListener(
        "click",
        () => {

            if (!desktopNav) {
                return;
            }


            desktopNav.classList.toggle(
                "mobile-visible"
            );

        }
    );

}


/* =========================================================
   SMOOTH LINKS
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const id =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !id ||
                        id === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            id
                        );


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView({
                            behavior:
                                "smooth",
                            block:
                                "start"
                        });

                    }

                }
            );

        }
    );


/* =========================================================
   VISIBILITY / TAB
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            canvas?.getContext("2d");

        }

    }
);