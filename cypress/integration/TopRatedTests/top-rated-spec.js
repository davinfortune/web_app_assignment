let movies;    // List of movies from TMDB

// Utility functions
const filterByTitle = (movieList, string) =>
  movieList.filter((m) => m.title.toLowerCase().search(string) !== -1);

const filterByGenre = (movieList, genreId) =>
  movieList.filter((m) => m.genre_ids.includes(genreId));

const filterByGenreAndTitle = (movieList, genreId, string) =>
  movieList.filter((m) => m.genre_ids.includes(genreId) && m.title.toLowerCase().search(string) !== -1);

describe("Top rated", () => {
  before(() => {
    // Get movies from TMDB and store in movies variable.
    var key = "77885d4f621d9af0c6c5c522b1c9df9d";
    cy.request(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`
    )
      .its("body")    // Take the body of HTTP response from TMDB
      .then((response) => {
        movies = response.results
      })
  })
  beforeEach(() => {
    cy.visit("/");
    cy.get("header").find(".MuiToolbar-root").find("button").eq(3).click();
  });

  describe("Base tests", () => {
    it("displays page header", () => {
        cy.get("h3").contains("Top Rated Movies");
      });
  });

  describe("By movie genre", () => {
    it("should display movies with the specified genre only", () => {
       const selectedGenreId = 35;
       const selectedGenreText = "Comedy";
       const matchingMovies = filterByGenre(movies, selectedGenreId);
       cy.get("#genre-select").click();
       cy.get("li").contains(selectedGenreText).click();
       cy.get(".MuiCardHeader-content").should(
         "have.length",
         matchingMovies.length
       );
       cy.get(".MuiCardHeader-content").each(($card, index) => {
         cy.wrap($card).find("p").contains(matchingMovies[index].title);
       });
     });
   });

   describe("Favorites page", () => {
    it("should add movies to the favourite page", () => {
        cy.get('button[aria-label="add to favorites"]').eq(0).click();
        cy.get("header").find(".MuiToolbar-root").find("button").eq(1).click();
        cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
        cy.url().should("include", `/movies/${movies[0].id}`);
        cy.get("h3").contains(movies[0].title);
     });
   });


   describe("If Heart Icon is shown", () => {
    it("should check if a heart shows after movie is added to your favourites", () => {
      cy.get('button[aria-label="add to favorites"]').eq(0).click();
      cy.get('.MuiCardHeader-avatar').eq(0);
    });
   });


});