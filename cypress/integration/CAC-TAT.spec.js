/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
  beforeEach(() => {
    cy.visit('../../src/index.html');  
  })
  it('verifica o titulo da aplicação', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  })
  it('preenche os campos obrigatórios e envia o formulario', function() {
    cy.get('[name="firstName"]').type('Lucas'); 
    cy.get('[name="lastName"]').type('Burgardt');
    cy.get('[id="email"]').type('lucasburgardt07@gmail.com');
    cy.get('[name="open-text-area"]').type('Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ', {delay: 0});
    cy.get('[type="submit"]').click();
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    cy.get('[name="firstName"]').type('Lucas'); 
    cy.get('[name="lastName"]').type('Burgardt');
    cy.get('[id="email"]').type('lucasburgardt07gmail.com');
    cy.get('[name="open-text-area"]').type('Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ', {delay: 0});
    cy.get('[type="submit"]').click();
    cy.get('[class="error"]').should('be.visible');
  })
})
