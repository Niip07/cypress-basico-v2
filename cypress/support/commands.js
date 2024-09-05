Cypress.Commands.add('fillAndSubmit', function() {
    cy.get('[name="firstName"]').type('Lucas'); 
    cy.get('[name="lastName"]').type('Burgardt');
    cy.get('[id="email"]').type('lucasburgardt07@gmail.com');
    cy.get('[name="open-text-area"]').type('Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ', {delay: 0});
    cy.get('#phone-checkbox').click();
    cy.get('#phone').type('1234');
    cy.contains('Enviar').click();
})
