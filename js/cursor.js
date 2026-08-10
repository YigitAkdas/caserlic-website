export function initCursor() {

    const glow =
        document.getElementById("cursor-glow");

    if (!glow) return;

    if (
        !window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {
        return;
    }

    window.addEventListener(
        "mousemove",
        (event) => {

            glow.style.left =
                `${event.clientX}px`;

            glow.style.top =
                `${event.clientY}px`;

            glow.classList.add("active");

        }
    );

}