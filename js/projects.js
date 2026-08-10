export function renderGames(games) {

    const grid =
        document.getElementById("games-grid");

    if (!grid) return;

    grid.innerHTML = games.map((game, index) => {

        return `
            <article
                class="project-card reveal"
                data-project="${index}"
            >

                <div class="project-image">

                    <img
                        src="${game.image}"
                        alt="${game.title}"
                        loading="lazy"
                    >

                    <div class="project-overlay"></div>

                    <span class="project-number">
                        ${String(index + 1).padStart(2, "0")}
                    </span>

                </div>


                <div class="project-info">

                    <div>

                        <span class="project-category">
                            ${game.category}
                        </span>

                        <h3>
                            ${game.title}
                        </h3>

                    </div>

                    <span class="project-status">
                        ${game.status}
                    </span>

                </div>


                <p class="project-description">
                    ${game.description}
                </p>

            </article>
        `;

    }).join("");

}