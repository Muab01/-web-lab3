import Cart from '../../src/components/Cart';
import { mount } from 'cypress/react18';

describe('Cart Component', () => {
  it('should display the Cart ID', () => {
    // Given: Jag har en kundvagn med ett specifikt ID
    const cartId = 1;
    mount(<Cart cartId={cartId} />);

    // Then: Komponentens text ska visa Cart ID
    cy.contains('Cart ID: 1').should('be.visible');
  });
});
