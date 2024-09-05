// <reference types="Cypress" />

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
    cy.contains('Enviar').click();
    cy.clock();
    cy.get('[class="success"]').should('be.visible');
    cy.tick(3000);
    cy.get('[class="success"]').should('not.be.visible');
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    cy.get('[name="firstName"]').type('Lucas'); 
    cy.get('[name="lastName"]').type('Burgardt');
    cy.get('[id="email"]').type('lucasburgardt07gmail.com');
    cy.get('[name="open-text-area"]').type('Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ', {delay: 0});
    cy.contains('Enviar').click();
    cy.clock();
    cy.get('[class="error"]').should('be.visible');
    cy.tick(3000);
    cy.get('[class="error"]').should('not.be.visible');
  })
  it('deve preencher o telefone com letras e continuar vazio', function () {
    cy.get('#phone').type('Teste');
    cy.get('#phone').should('have.text', '');
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.get('[name="firstName"]').type('Lucas'); 
    cy.get('[name="lastName"]').type('Burgardt');
    cy.get('[id="email"]').type('lucasburgardt07@gmail.com');
    cy.get('[name="open-text-area"]').type('Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ', {delay: 0});
    cy.get('#phone-checkbox').check();
    cy.contains('Enviar').click();
    cy.clock();
    cy.get('[class="error"]').should('be.visible');
    cy.tick(3000);
    cy.get('[class="error"]').should('not.be.visible');
  })
  Cypress._.times(5, () => {
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
      cy.get('[name="firstName"]')
        .type('Lucas')
        .clear()
        .should('have.text', '');      
      cy.get('[name="lastName"]')
        .type('Burgardt')
        .clear()
        .should('have.text', '');      
      cy.get('[id="email"]')
        .type('lucasburgardt07@gmail.com')
        .clear()
        .should('have.text', '');      
      cy.get('[name="open-text-area"]')
        .type('Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ', {delay: 0})
        .clear()
        .should('have.text', '');      
      cy.get('#phone-checkbox').click();
    });
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
    cy.contains('Enviar').click();
    cy.get('[class="error"]').should('be.visible');
  })
  it('envia o formulario com comando customizado', function() {
    cy.fillAndSubmit();
    cy.clock();
    cy.get('[class="success"]').should('be.visible');
    cy.tick(3000);
    cy.get('[class="success"]').should('not.be.visible');
  })
  it('seleciona um produto (Youtube) por seu texto', function(){
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube');
  })
  it('seleciona um produto (Mentoria) por seu valor', function(){
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria');
  })
  it('seleciona um produto (Blog) por seu indice', function(){
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog');
  })
  it('marca o tipo de atendimento "Feedback"', function() {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', "feedback");
  })
  it('marca cada tipo de atendimento', function() {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })
  it('marca ambos checkboxes, depois desmarca o ultimo', function() {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked');
  })
  it('seleciona um arquivo da pastas fixtures', function() {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json');
      })
  })
  it('seleciona um arquivo simulando drag and drop', function(){
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json');
      })
  })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
    cy.fixture('example.json').as('sampleFile');
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json');
      })
  })
  it('verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', function(){
    cy.get('#privacy a').should('have.attr', 'target', '_blank');
  })
  it('acessa a pagina da politica de privacidade removendo o target e então clicando no link', function(){
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click();
    cy.contains('Talking About Testing')
      .should('be.visible');
  })
  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible');
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios')
      .invoke('hide')
      .should('not.be.visible');
  })
  it('preenche a area de texto usando o comando invoke', function() {
    const longText = Cypress._.repeat('0123456789', 20);

    cy.get('#open-text-area')
      .invoke('val', longText)
      .should('have.value', longText);
  }) 
  it('faz uma requisição HTTP', function () { 
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .should(function(response) { 
        const { status, statusText, body } = response; 
        expect(status).to.equal(200); 
        expect(statusText).to.equal('OK'); 
        expect(body).to.include('CAC TAT');
      })
  })
  it.only('mostra o gato', function() {
    cy.get('[id="cat"]')
      .invoke('show')
      .should('be.visible');
  })
})
