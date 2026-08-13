export function renderGames(games) {
    const grid = document.getElementById("games-grid");

    if (!grid) return;

    grid.innerHTML = games.map((game, index) => {
        const platforms = Array.isArray(game.platform)
            ? game.platform.join(" · ")
            : game.platform || "";

        const featuredClass = game.featured
            ? "project-card--featured"
            : "";

        const hasLink = game.link && game.link !== "#";

        return `
            <article
                class="project-card ${featuredClass} reveal"
                data-project="${game.id || index}"
            >

                <div class="project-image">

                    <img
                        src="${game.image}"
                        alt="${game.title}"
                        loading="${index === 0 ? "eager" : "lazy"}"
                    >

                    <div class="project-overlay"></div>

                    <span class="project-number">
                        ${String(index + 1).padStart(2, "0")}
                    </span>

                    <span class="project-open">
                        ${hasLink ? "VIEW PROJECT ↗" : "IN DEVELOPMENT"}
                    </span>

                </div>


                <div class="project-info">

                    <div class="project-main">

                        <div class="project-meta">

                            <span class="project-category">
                                ${game.category}
                            </span>

                            ${
                                game.year
                                    ? `
                                        <span class="project-year">
                                            ${game.year}
                                        </span>
                                    `
                                    : ""
                            }

                        </div>


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


                <div class="project-details">

                    ${
                        game.genre
                            ? `
                                <span>
                                    ${game.genre}
                                </span>
                            `
                            : ""
                    }

                    ${
                        platforms
                            ? `
                                <span>
                                    ${platforms}
                                </span>
                            `
                            : ""
                    }

                </div>


                ${
                    hasLink
                        ? `
                            <a
                                class="project-link"
                                href="${game.link}"
                                aria-label="View ${game.title}"
                            >
                                <span>VIEW PROJECT</span>
                                <span>↗</span>
                            </a>
                        `
                        : ""
                }

            </article>
        `;
    }).join("");

    requestAnimationFrame(() => {
        grid.querySelectorAll(".project-card").forEach((card) => {
            card.classList.add("is-visible");
        });
    });
}