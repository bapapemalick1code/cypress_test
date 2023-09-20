
describe("MVP Testing - Fake Contact", () => {
    let id;
    let genre;
    let prenom;
    let nom;
    let message;
    it("Récupérer les données de test depuis l'API", () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyapi.io/data/v1/post',
            headers: {
                'Content-Type': 'text/html',
                'app-id': '61f4248c9d9bb038eaf0c6c0',
            },
        })
            .then((response) => {
                //recuperation des données du premier User 
                expect(response.body.data[0])
                prenom = response.body.data[0].owner.firstName;
                nom = response.body.data[0].owner.lastName;
                genre = response.body.data[0].owner.title == 'ms' ? 'Femme' : 'Homme';
                message = response.body.data[0].text;
                id = response.body.data[0].id;
            })
    })
    it("Tester le formulaire en saisissant les données obligatoires", () => {
        //Acces au formulaire
        cy.visit("https://testqa.purse.tech/fake-contact")
        //Remplissage du formulaire avec les données récupérées depuis l'API
        cy.get("#gender").select(genre)
        cy.get("#first-name").type(prenom)
        cy.get("#last-name").type(nom)
        cy.get("#message").type(message)
        cy.get("#submit-button").click()
        //verification du message après l'envoi
        cy.get("#popin-message").contains('Le message a été envoyé.')
    })
})