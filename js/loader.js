export async function loadSection(elementId, file) {

    const element = document.getElementById(elementId);

    if (!element) {
        console.warn(`Section not found: ${elementId}`);
        return;
    }

    try {

        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(
                `Could not load ${file}`
            );
        }

        element.innerHTML = await response.text();

    } catch (error) {

        console.error(error);

        element.innerHTML = `
            <div class="load-error">
                Section could not be loaded.
            </div>
        `;

    }
}