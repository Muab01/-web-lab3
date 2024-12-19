import Cart from '../../src/components/Cart';

describe('Cart Component', () => {
  it('should display the correct number of items & total price when adding an item', () => {
    const cartId = 1;
    cy.mount(<Cart cartId={cartId} />);

    cy.contains('Add to Cart').click();

    cy.contains('1 pasta/dish in cart').should('be.visible');
    cy.contains('Total: $10.00').should('be.visible');
  });
});
