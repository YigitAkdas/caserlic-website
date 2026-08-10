export function initNavigation() {

    const navbar =
        document.getElementById("navbar");

    if (!navbar) return;

    navbar.innerHTML = `
        <div class="nav-inner">

            <a href="#hero" class="nav-brand">
                <span></span>
                CASERLIC
            </a>

            <nav>

                <a href="#games">Work</a>
                <a href="#software">Software</a>
                <a href="#studio">Studio</a>

            </nav>

            <a
                href="#contact"
                class="nav-contact"
            >
                Let's talk
                <span>↗</span>
            </a>

        </div>
    `;

}