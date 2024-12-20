import Cart from '../../src/components/Cart';
import { mount } from 'cypress/react18';

describe('Cart Component', () => {
    it('should display 1 item in cart when a pasta dish is added', () => {
        // Given: En cart/kundvagn
        const cartId = 1;
        mount(<Cart cartId={cartId} />);
      
        // When: Vi lägger till en vara
        cy.contains('Add to Cart').click();
      
        // Then: Texten ska visa att det finns 1 vara i kundvagnen
        cy.contains('1 pasta/dish in cart').should('be.visible');
    });
})      