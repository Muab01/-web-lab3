describe("E2E: Clear Cart Flow", () => {
    it("adds items to the cart and clears the cart", () => {
      
      cy.visit("/menu");
      cy.contains("Our Menu").should("exist");
      
      cy.contains("Add to Cart").first().click();
      cy.contains("Your Cart").should("exist");
      cy.contains(/x 1/).should("exist");
  
      cy.contains("Open Cart").click();
      cy.url().should("include", "/cart");
  
      cy.contains("Your Cart").should("exist");
      cy.contains(/Quantity: 1/).should("exist");
  
      cy.contains("Clear Cart").click();
  
      cy.contains("Your cart is empty.").should("exist");
    });
  });
  