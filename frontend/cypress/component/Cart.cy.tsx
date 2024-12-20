import Cart from '../../src/components/Cart';
import { mount } from 'cypress/react18';

describe('Cart Component', () => {
it('should display "Cart is empty" when there are no items', () => {
     // Given: En cart/kundvagn utan några varor
        const cartId = 1;
        mount(<Cart cartId={cartId} />);
      
    // Then: Texten "Cart is empty" ska visas
        cy.contains('Cart is empty').should('be.visible');
    });
})      