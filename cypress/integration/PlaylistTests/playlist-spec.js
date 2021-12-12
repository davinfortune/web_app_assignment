let shows;
const showId =  88329; // The show hawkeye id
let reviews;

describe("Playlist", () => {
  before(() => {
    var key = "77885d4f621d9af0c6c5c522b1c9df9d";
    cy.request(
      `https://api.themoviedb.org/3/discover/tv?api_key=${key}`
    )
      .its("body")
      .then((response) => {
        shows = response.results;
      });
  });
  beforeEach(() => {
    cy.visit("/");
  });  

  describe("From the home page", () => {
    it("should navigate to the tv shows page and change browser URL", () => {
        cy.get("header").find(".MuiToolbar-root").find("button").eq(4).click();
      cy.url().should("include", `/tvshows`);
      cy.get("h3").contains("Tv Shows");
    });
  });

    describe(
      "when the viewport is a mobile",
      {
        viewportHeight: 896,
        viewportWidth: 414,
      },
      () => {
        it("should allow navigation to the tv page from the dropdown menu", () => {
          cy.get("header").find("button").click();
          cy.get("li").eq(4).click();
          cy.url().should("include", `/tvshows`);
        });
      });
  });

  describe("From the tv shows page", () => {
    beforeEach(() => {
      cy.get("header").find(".MuiToolbar-root").find("button").eq(4).click();
      cy.get("button[aria-label='add to playlist']").eq(0).click();
      cy.get("button[aria-label='add to playlist']").eq(1).click();
      cy.get("header").find(".MuiToolbar-root").find("button").eq(5).click();
    });
    it("should add movies to the watchlist navigate to the tv shows detail page and change the browser URL", () => {
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
      cy.url().should("include", `/tvshows/${shows[0].id}`);
      cy.get("h3").contains(shows[0].name);
    });
  });

