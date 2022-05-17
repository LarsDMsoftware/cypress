/// <reference types="cypress" />

describe('Pet store  API Intercept', () => {
    it('Intercepting POST API response', () => {
        
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

    it('Intercepting GET API response', () => {
        
        cy.intercept('GET','https://petstore3.swagger.io/api/v3/pet/*',(req) => {
            req.url = 'https://petstore3.swagger.io/api/v3/pet/10'
            //headers: {url: 'https://petstore3.swagger.io/api/v3/pet/15'}
        }).as('petPost');

        cy.visit('https://petstore3.swagger.io')
        cy.contains('Find pet by ID').click()
        cy.contains('Try it out').click()
        cy.get('input[placeholder = petId]').clear().type(1)
        cy.contains('Execute').click()
        cy.contains('Execute').click()
15
        cy.wait('@petPost').then (req => {
            console.log(req)
            //expect(req.request.body.name).to.equal("Intercepted")
        });
    });



    it('Intercepting PUT API response', () => {
        
        cy.intercept('PUT','https://petstore3.swagger.io/api/v3/pet/*',(req) => {
            req.url = 'https://petstore3.swagger.io/api/v3/pet/10'
            //headers: {url: 'https://petstore3.swagger.io/api/v3/pet/15'}
        }).as('petPost');

        cy.visit('https://petstore3.swagger.io')
        cy.contains('Find pet by ID').click()
        cy.contains('Try it out').click()
        cy.get('input[placeholder = petId]').clear().type(1)
        cy.contains('Execute').click()
        cy.contains('Execute').click()
15
        cy.wait('@petPost').then (req => {
            console.log(req)
            //expect(req.request.body.name).to.equal("Intercepted")
        });
    });
});



  //https://petstore3.swagger.io/api/v3/pet