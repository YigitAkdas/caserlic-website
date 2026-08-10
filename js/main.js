import { loadSection } from "./loader.js";
import { initNavigation } from "./navigation.js";
import { initRevealAnimations } from "./animations.js";
import { initCursor } from "./cursor.js";

import { games } from "../data/games.js";
import { renderGames } from "./projects.js";


async function boot() {

    /*
     * Navigation
     */

    initNavigation();


    /*
     * Sections
     */

    await Promise.all([

        loadSection(
            "hero",
            "sections/hero.html"
        ),

        loadSection(
            "about",
            "sections/about.html"
        ),

        loadSection(
            "games",
            "sections/games.html"
        ),

        loadSection(
            "software",
            "sections/software.html"
        ),

        loadSection(
            "experiences",
            "sections/experiences.html"
        ),

        loadSection(
            "studio",
            "sections/studio.html"
        ),

        loadSection(
            "contact",
            "sections/contact.html"
        )

    ]);


    /*
     * Games
     */

    renderGames(games);


    /*
     * Interactions
     */

    initRevealAnimations();

    initCursor();

}


boot();