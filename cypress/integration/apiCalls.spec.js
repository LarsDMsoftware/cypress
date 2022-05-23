/// <reference types="cypress" />




//2
describe('Pet store  API Intercept', () => {
    //1
    it('Intercepting PUT API response', () => {
        cy.fixture('petStorePost.json').then((data) => {
            cy.request('PUT', 'https://petstore3.swagger.io/api/v3/pet/', data)
        })
        cy.intercept('PUT', 'https://petstore3.swagger.io/api/v3/pet*', (req) => {
            req.body.name = "Dogs"
        }).as('petPost');

        cy.visit('https://petstore3.swagger.io')
        cy.contains('Update an existing pet').click()
        cy.contains('Try it out').click()
        cy.contains('Execute').click()
        cy.contains('Execute').click()
        cy.wait('@petPost').then(req => {
            console.log(req)
            expect(req.request.body.name).to.equal("Dogs")
        });
    });

    it('Intercepting POST API response', () => {

        cy.intercept('POST', 'https://petstore3.swagger.io/api/v3/pet', (req) => {
            req.body.name = "Intercepted by POST Request"
        }).as('petPost');

        cy.visit('https://petstore3.swagger.io')
        cy.contains('Add a new pet to the store').click()
        cy.contains('Try it out').click()
        cy.contains('Execute').click()

        cy.wait('@petPost').then(req => {
            console.log(req)
            expect(req.request.body.name).to.equal("Intercepted by POST Request")
        });
    });

    // 3 
    it('Intercepting GET API response', () => {

        cy.intercept('GET', 'https://petstore3.swagger.io/api/v3/pet/findByStatus?status=*', (req) => {
            req.url = 'https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available'

        }).as('petPost');

        cy.visit('https://petstore3.swagger.io')
        cy.contains('Finds Pets by status').click()
        cy.contains('Try it out').click()
        cy.get('select').eq(1).select('sold')
        cy.contains('Execute').click()
        cy.wait('@petPost').then(req => {
            console.log(req)
            expect(req.request.body.ArrayList.length).to.equal('have.length', 16)
        });
    });

    //5
    it('Intercepting GET API response', () => {

        cy.intercept('GET', 'https://petstore3.swagger.io/api/v3/pet/*', (req) => {
            req.url = 'https://petstore3.swagger.io/api/v3/pet/10'
            //headers: {url: 'https://petstore3.swagger.io/api/v3/pet/15'}
        }).as('petPost');

        cy.visit('https://petstore3.swagger.io')
        cy.contains('Find pet by ID').click()
        cy.contains('Try it out').click()
        cy.get('input[placeholder = petId]').clear().type(1)
        cy.contains('Execute').click()
        cy.contains('Execute').click()
        cy.wait('@petPost').then(req => {
            console.log(req)
            //expect(req.request.body.name).to.equal("Intercepted")
        });
    });



});



  //https://petstore3.swagger.io/api/v3/pet