import Cart from '../../src/components/Cart';
import { mount } from 'cypress/react18';

describe('Kundvagnskomponent', () => {
  it('ska visa att en maträtt läggs till i kundvagnen', () => {
    const cartId = 1;

    // Given: Menyn är laddad och carts/kundvagnen är tom
    cy.intercept('GET', '/api/menu', { fixture: 'menu.json' }).as('hämtaMeny');
    mount(<Cart cartId={cartId} />);
    cy.wait('@hämtaMeny');
    cy.get('[data-cy="cart-empty"]').should('be.visible');

    // When: Jag klickar på knappen för att lägga till en maträtt i carts/kundvagnen
    cy.get('[data-cy="add-to-cart"]').should('be.visible').click();

    // Then: Maträtten visas i carts/kundvagnen med ett meddelande
    cy.get('[data-cy="cart-item"]').should('contain', 'har lagts till i kundvagnen');
  });
});
