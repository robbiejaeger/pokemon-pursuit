describe("Happy Path Results", () => {
  it("Displays a single request result", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Pokemon Pursuit");
  
    // Intercept request with no next page
    cy.intercept("https://hungry-woolly-leech.glitch.me/api/pokemon/search/a", { fixture: "a.json" });
  
    cy.get("input").type("a");
    cy.contains("Loading results...");
    cy.contains("Arbok");
    cy.contains("Arcanine");
  });

  it("Displays a request result requiring next page", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Pokemon Pursuit");
  
    // Intercept request with next page
    cy.intercept("https://hungry-woolly-leech.glitch.me/api/pokemon/search/b", { fixture: "b.json" });
    cy.intercept("https://hungry-woolly-leech.glitch.me/api/pokemon/search/b?page=MTE=", { fixture: "b-next.json" });
    
    cy.get("input").type("b");
    
    // First page
    cy.contains("Bulbasaur");
    // Next page
    cy.contains("Butterfree");
  });
});