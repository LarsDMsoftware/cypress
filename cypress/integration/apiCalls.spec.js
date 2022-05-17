/// <reference types="cypress" />

describe('Pet store API Intercept test', () => {
    it('Intercepting API response', () => {
        
        cy.intercept('POST','https://petstore3.swagger.io/api/v3/pet',(req) => {
            req.body.name = "Intercepted"
        } ).as('petPost');

        cy.visit('https://petstore3.swagger.io')
        cy.contains('Add a new pet to the store').click()
        cy.contains('Try it out').click()
        cy.contains('Execute').click()

        cy.wait('@petPost').then (req => {
            console.log(req)
            expect(req.request.body.name).to.equal("Intercepted")
        });
    });
});




  //https://petstore3.swagger.io/api/v3/pet