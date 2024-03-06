
/**
 * To Dos:
 * - Liste aller Game Thumbnails - getElementsByClassName
 * - Wenn Nutzer in der Suchleiste etwas eintippt, starte gleichzeitig suche
 * - Text aus der Suchleiste auslesen
 * - Durchsuche alle Titel und schaue ob Suchtext mit Titel übereinstimmt
 * - Blende alle Elmente aus, die nicht übereinstimmen mit dem Suchtext
 */

const games = document.querySelectorAll(".game");
const searchInput = document.querySelector("#js-search-games");
const tagButtons = document.querySelectorAll('.tag-btn');

//Füge ein keyup Event hinzu
//Wird immer ausgelöst, wenn Nutzer tippt
searchInput.addEventListener("keyup", filterBySearch);

function filterBySearch() {
    const searchValue = searchInput.value.toLowerCase();

    //Durchsuche jedes Game und gleiche den Titel mit dem Suchwert ab
    for (let game of games) {
        const title = game.querySelector("h5").innerText.toLowerCase()

        if (title.includes(searchValue) === false) {
            game.style.display = "none";
        } else {
            game.style.display = "block";
        }
    }

}


/**
 * Filter by tag
 * To do:
 * - Wenn Nutzer Button klickt, rufe filterBytag Funktion auf
 * - Lese Kategorie/Tagname aus button aus bzw. übergebe der Funktion
 * - Durchsuche alle Spiele
 * - Lese Tagnamen aus jedem einzelnen Spiel aus
 */

function filterByTag(filterTagName, activeButton) {

    //deaktiviere alle buttos
    for (let btn of tagButtons) {
        btn.classList.remove("active");
    }
    activeButton.classList.add("active");

    //Durchsuche alle Spiele
    for (let game of games) {

        if (filterTagName === "All") {
            game.style.display = "block";
            continue;
        }

        game.style.display = "none";

        //Finde alle Tags im Spiel
        const tags = game.querySelectorAll('.tag');

        //Dursuche alle Tags
        for (let tag of tags) {
            const gameTagName = tag.innerText;

            if (gameTagName.toLowerCase() === filterTagName.toLowerCase()) {
                console.log("passender tag")
                game.style.display = "block";
            }

        }

    }

}