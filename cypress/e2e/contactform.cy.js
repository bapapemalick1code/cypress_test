
describe("MVP Testing - Fake Contact", () => {
    let userData;

    before(() => {
        // Avant l'exécution des tests, récupérez les données depuis l'API
        cy.request({
          method: "GET",
          url: "https://dummyapi.io/data/v1/post",
          headers: {
            "Content-Type": "application/json", 
            "app-id": "61f4248c9d9bb038eaf0c6c0",
          },
        }).then((response) => {
          // Stockez les données du premier utilisateur dans la variable globale
          userData = response.body.data[0];
        });
      });


    it("Renseigner le formulaire avec les données du premier utilisateur", () => {
        // Accédez à la page du formulaire
        cy.visit("https://testqa.purse.tech/fake-contact")
    
        // Vérifiez que les données du premier utilisateur ont été récupérées avec succès
        expect(userData).to.not.be.undefined;
        
        // Remplissez le formulaire avec les données utilisateur
        let genre = userData.owner.title == 'ms' ? 'Femme' : 'Homme';
        cy.get("#gender").select(genre)
        cy.get("#first-name").type(userData.owner.firstName)
        cy.get("#last-name").type(userData.owner.lastName)
        cy.get("#message").type(userData.text)
        // Soumettez le formulaire
        cy.get("#submit-button").click() 
    
        // Effectuez des assertions pour vérifier que le formulaire a été soumis avec succès
        cy.get("#popin-message").should("contain", "Le message a été envoyé.");
        //cy.get("#popin-message").contains('Le message a été envoyé.')
      });


})