describe("E2E: Full page from Home to Order Status", () => {
  it("navigates from homepage to menu, adds an item to the cart, places an order, and verifies order status", () => {
    
    cy.visit("/");
    cy.contains("Pasta Bella").should("exist");
    cy.contains("Menu").click();

    
    cy.url().should("include", "/menu");
    cy.contains("Our Menu").should("exist");

   
    cy.contains("Add to Cart").first().click();
    cy.contains("Your Cart").should("exist");
    cy.contains("Open Cart").click();
    cy.url().should("include", "/cart");
    cy.contains("Your Cart").should("exist");

   
    cy.get('.cart-item-quantity').should("contain.text", "Quantity: 1");
    cy.contains(/Total: \$\d+\.\d{2}/).should("exist");

   
    cy.contains("Order Pasta").click();
    cy.url().should("include", "/order");

    
    cy.get('input[name="customerName"]').type("Muab");
    cy.get('input[name="customerContact"]').type("123456789");
    cy.get('select[name="pickupOrDineIn"]').select("Pickup");
    cy.contains("Order Now").click();

    cy.url().should("include", "/order-status");
    cy.contains("Order Status").should("exist");
    cy.contains("Preparing your order...").should("exist");
    cy.contains(/1×/).should("exist");
    cy.contains("pickup").should("exist");
    cy.contains(/Price for your order: \$\d+\.\d{2}/).should("exist");
  });
});
