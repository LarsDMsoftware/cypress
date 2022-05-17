describe('Pet store API Intercept test', () => {
    it('Intercepting API response', () => {
        
        
        cy.intercept('GET','https://petstore3.swagger.io/api/v3/pet/*',(req) => {
            req.body.id = 15
        } ).as('petPost');

        cy.fixture('petStorePost.json').then((petFixture) => {
            cy.request('GET', 'https://petstore3.swagger.io/api/v3/pet/1');
        })

        cy.wait('@petPost').then (req => {
            console.log(req)
            //expect(req.request.body.name).to.equal("Intercepted")
        });
    });
});
