describe('Pet store API Intercept test', () => {
    it('Intercepting API response', () => {
        
        
        cy.intercept('POST','https://petstore3.swagger.io/api/v3/pet',(req) => {
            req.body.name = "Intercepted"
        } ).as('petPost');

        cy.visit('https://petstore3.swagger.io')
        cy.contains('POST').click()
        cy.contains('Try it out').click()
        cy.fixture('petStorePost.json').then((petFixture) => {
            cy.get('textarea').click().clear().type(`{
                "id": 155,
                "name": "not intercepted",
                "category": {
                  "id": 155,
                  "name": "not intecepted"
                },
                "photoUrls": [
                  "string"
                ],
                "tags": [
                  {
                    "id": 0,
                    "name": "string"
                  }
                ],
                "status": "available"
              }`)
            
        })
        cy.contains('Execute').click()


        /*
        cy.fixture('petStorePost.json').then((petFixture) => {
            cy.get('textarea').click().clear().type(petFixture)
            //cy.request('POST', 'https://petstore3.swagger.io/api/v3/pet',petFixture);
        })*/

        /*
        cy.wait(4000)
        cy.fixture('petStorePost.json').then((petFixture) => {
            cy.request('POST', 'https://petstore3.swagger.io/api/v3/pet',petFixture);
        })*/

        cy.wait('@petPost').then (req => {
            console.log(req)
            expect(req.request.body.name).to.equal("Intercepted")
        });
    });
});




  //https://petstore3.swagger.io/api/v3/pet