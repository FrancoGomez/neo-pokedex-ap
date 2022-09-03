/// < require type="Cypress" />

// More pokemons exist, but there is no image of them (provided by the API)
const POKEMON_COUNT = 898;
const POKEMON_CARDS_PER_PAGE = 20;

describe("Check if pokemon cards are shown", () => {
    it("Visits pokedex page", () => {
        cy.visit("/");
    });

    it("Check if all the cards are loaded", () => {
        cy.get("article.pokemon-card").should(
            "have.length",
            POKEMON_CARDS_PER_PAGE
        );
    });
});

describe("Check if pagination is correctly shown", () => {
    const PREVIOUS_AND_NEXT_BUTTONS = 2;

    it("Check if all the buttons are created", () => {
        cy.get("li.page-item").should(
            "have.length",
            Math.ceil(POKEMON_COUNT / POKEMON_CARDS_PER_PAGE) +
                PREVIOUS_AND_NEXT_BUTTONS
        );
    });
});

describe("Check if next button works", () => {
    it("Click next button", () => {
        cy.intercept("/api/v2/pokemon?offset=20&limit=20").as("getNextPage");
        cy.get("#button-Next").click();
        cy.wait("@getNextPage");
    });

    it("Check if button 2 is active", () => {
        cy.get("#button-2").should("have.class", "active");
    });

    it("Pick a card with id over 20 and not over 40", () => {
        cy.get(".pokemon-card#23");
    });
});

describe("Check if next button get disabled and undisabled", () => {
    it("Click button 45", () => {
        cy.intercept("/api/v2/pokemon?offset=880&limit=20").as("getPage45");
        cy.get("#button-45").click();
        cy.wait("@getPage45");
    });

    it("Check if next button is disabled", () => {
        cy.get("#button-Next").should("have.class", "disabled");
    });

    it("Click button 3", () => {
        cy.intercept("/api/v2/pokemon?offset=40&limit=20").as("getPage3");
        cy.get("#button-3").click();
        cy.wait("@getPage3");
    });

    it("Check if next button in not disabled", () => {
        cy.get("#button-Next").should("not.have.class", "disabled");
    });
});

describe("Check if previous button works", () => {
    it("Click previous button", () => {
        cy.intercept("/api/v2/pokemon?offset=20&limit=20").as(
            "getPreviousPage"
        );
        cy.get("#button-Previous").click();
        cy.wait("@getPreviousPage");
    });

    it("Check if button 2 is active", () => {
        cy.get("#button-2").should("have.class", "active");
    });

    it("Pick a card with id over 0 and not over 20", () => {
        cy.get(".pokemon-card#25");
    });
});

describe("Check if previous button get disabled and undisabled", () => {
    it("Click button 1", () => {
        cy.intercept("/api/v2/pokemon?offset=0&limit=20").as("getPage1");
        cy.get("#button-1").click();
        cy.wait("@getPage1");
    });

    it("Check if previous button is disabled", () => {
        cy.get("#button-Previous").should("have.class", "disabled");
    });

    it("Click button 2", () => {
        cy.intercept("/api/v2/pokemon?offset=20&limit=20").as("getPage2");
        cy.get("#button-2").click();
        cy.wait("@getPage2");
    });

    it("Check if previous button in not disabled", () => {
        cy.get("#button-Previous").should("not.have.class", "disabled");
    });
});

describe("Check if a random pagination button works", () => {
    it("Click button 15", () => {
        cy.intercept("/api/v2/pokemon?offset=280&limit=20").as("getPage15");
        cy.get("#button-15").click();
        cy.wait("@getPage15");
    });

    it("Check if the button 15 is active", () => {
        cy.get("#button-15").should("have.class", "active");
    });

    it("Check if a card, with id 289, exists", () => {
        cy.get("#289");
    });
});

describe("Check if the pokemon modal is shown correctly", () => {
    it("Click the card with id #289", () => {
        cy.intercept("/api/v2/pokemon/slaking").as("getPokemonSlaking");
        cy.get("#289").click();
        cy.wait("@getPokemonSlaking");
    });

    it("Check if the pokemon modal exists", () => {
        cy.get(".modal-content");
    });

    it("Check if the pokemon modal shows the pokemon card", () => {
        cy.get("#pokemon-modal__card").should("not.have.class", "hidden");
    });

    it("Check if the title is correct", () => {
        cy.get("#pokemon-modal__pokemon-name").should(
            "have.text",
            "slaking #289"
        );
    });

    it("Check if the loading alert is hidden", () => {
        cy.get("#alert-loading").should("have.class", "hidden");
    });
});

describe("Check if the pokemon modal can be closed correctly", () => {
    it("Click the modal close button", () => {
        cy.get("button.btn-close").click();
    });

    it("Check is the modal is not visible", () => {
        cy.get("#pokemon-modal").should("not.be.visible");
    });
});

describe("Check if an incorrect search will give an error", () => {
    it("Write an incorrect pokemon name in the search box", () => {
        cy.get(".search-pokemon__input").type("Pikachuu");
    });

    it("Click the search button", () => {
        cy.intercept("/api/v2/pokemon/pikachuu").as("getPokemonPikachuu");
        cy.get(".search-pokemon__button").click();
        cy.wait("@getPokemonPikachuu");
    });

    it("Check if the error alert is shown", () => {
        cy.get("#alert-pokemon-not-found").should("not.have.class", "hidden");
    });

    it("Check if the loading alert is hidden", () => {
        cy.get("#alert-loading").should("have.class", "hidden");
    });

    it("Click the modal close button", () => {
        cy.get("button.btn-close").click();
    });
});

describe("Check if a correct search will give show the correct pokemon", () => {
    it("Clean the search input", () => {
        cy.get(".search-pokemon__input").clear();
    });

    it("Write a correct pokemon name in the search box", () => {
        cy.get(".search-pokemon__input").type("PiKaChU");
    });

    it("Click the search button", () => {
        cy.intercept("/api/v2/pokemon/pikachu").as("getPokemonPikachu");
        cy.get(".search-pokemon__button").click();
        cy.wait("@getPokemonPikachu");
    });

    it("Check if the pokemon modal shows the pokemon card", () => {
        cy.get("#pokemon-modal__card").should("not.have.class", "hidden");
    });

    it("Check if the title is correct", () => {
        cy.get("#pokemon-modal__pokemon-name").should(
            "have.text",
            "pikachu #025"
        );
    });

    it("Check if the loading alert is hidden", () => {
        cy.get("#alert-loading").should("have.class", "hidden");
    });

    it("Click the modal close button", () => {
        cy.get("button.btn-close").click();
    });
});
