
//import de la class contactForm contenant les locators 
import contactForm from '../../pageobjects/contactForm'

//import de la class contenant l'API
import apiService from '../../restAPI/apiService'

describe('Formulaire de contact', () => {
  let userData
  before(() => {
    apiService.getUserData().then((data) => {
      // Stockez les données du premier utilisateur dans la variable globale
      userData = data[0];
    });
  })

  beforeEach(() => {
    cy.visit('/fake-contact');
  })

  context("Cas passant - Renseigner tous les champs", () => {
    it('Valider le formulaire avec les bonnes informations', () => {
      //instancier la classe contacForm pour accéder aux méthodes créées
      const formObj = new contactForm();
      //créer une variable et y stocker la valeur en fonction du titre récupéré
      let genre = userData.owner.title == 'ms' ? 'Femme' : 'Homme'
      formObj.enterGenre().select(genre).should('contain.text', genre) //vérifier si le titre récupéré a bien été saisi
      formObj.enterPrenom().type(userData.owner.firstName).should('contain.value', userData.owner.firstName) //vérifier si le prénom récupéré a bien été saisi
      formObj.enterNom().type(userData.owner.lastName).should('contain.value', userData.owner.lastName)  //vérifier si le nom récupéré a bien été saisi
      formObj.enterSociete().type("agiltoo").should('contain.value', "agiltoo")   //saisir et vérifier si la champ société a été renseigné
      formObj.enterPhone().type('07101010010').should('contain.value', '07101010010')   //saisir et vérifier si la champ téléphone a été correctement renseigné 
      formObj.enterTitleMessage().type('Hello').should('contain.value', 'Hello')      //saisir et vérifier si la Titre message société a été renseigné
      formObj.enterMessage().type(userData.text).should('contain.value', userData.text) //vérifier si le message récupéré a bien été saisi
      formObj.clickSubmit().click();
      formObj.successTxt().should('have.text', 'Le message a été envoyé.') 
        .and('have.css', 'color', 'rgb(0, 119, 0)') //vérifier si le message success est affiché avec la bonne couleur
    })
  })

  context("Cas non passant", () => {

    it('Valider le formulaire sans renseigner le prenom ou le nom ', () => {
      const formObj = new contactForm();
      let genre = userData.owner.title == 'ms' ? 'Femme' : 'Homme'
      formObj.enterGenre().select(genre).should('contain.text', genre)
      let prenom = formObj.enterPrenom().should('be.empty')
      let nom = formObj.enterNom().should('be.empty')
      if (prenom || nom) {
        formObj.enterMessage().type(userData.text)
        formObj.clickSubmit().click();
        //vérifier si le message d'erreur est affiché
        formObj.errorTxt().should('contain', 'Veuillez remplir tous les champs obligatoires.');
      }
    })

    it('Le champ téléphone ne doit pas contenir de lettre ', () => {
      //instancier la classe contacForm pour accéder aux méthodes créées
      const formObj = new contactForm();
      //créer une variable et y stocker la valeur en fonction du titre récupéré
      let genre = userData.owner.title == 'ms' ? 'Femme' : 'Homme'
      formObj.enterGenre().select(genre).should('contain.text', genre) //vérifier si le titre récupéré a bien été saisi
      formObj.enterPrenom().type(userData.owner.firstName).should('contain.value', userData.owner.firstName) //vérifier si le prénom récupéré a bien été saisi
      formObj.enterNom().type(userData.owner.lastName).should('contain.value', userData.owner.lastName)  //vérifier si le nom récupéré a bien été saisi
      formObj.enterSociete().type("agiltoo").should('contain.value', "agiltoo")   //saisir et vérifier si la champ société a été renseigné
      formObj.enterPhone().type('jhbbhbn').invoke('val')
        .should(value => {
          expect(Number.isNaN(+value), 'saisir un numéro valide').to.eq(false)    // passes
        })  //saisir et vérifier si la champ téléphone a été renseigné
      formObj.enterTitleMessage().type('Hello').should('contain.value', 'Hello')      //saisir et vérifier si la Titre message société a été renseigné
      formObj.enterMessage().type(userData.text).should('contain.value', userData.text) //vérifier si le message récupéré a bien été saisi
      formObj.clickSubmit().click();
      formObj.successTxt().should('have.text', 'Le message a été envoyé.'); //vérifier si le message success est affiché
    })

    it('Valider le formulaire en mettant des espaces sur les champs obligatoires', () => {
      //instancier la classe contacForm pour accéder aux méthodes créées
      const formObj = new contactForm();
      //créer une variable et y stocker la valeur en fonction du titre récupéré
      let genre = userData.owner.title == 'ms' ? 'Femme' : 'Homme'
      formObj.enterGenre().select(genre)
      formObj.enterPrenom().type(' ')
      formObj.enterNom().type(' ')
      formObj.enterSociete()
      formObj.enterPhone()
      formObj.enterTitleMessage() 
      formObj.enterMessage().type(' ') 
      formObj.clickSubmit().click();
      formObj.errorTxt().should('not.have.text', 'Le message a été envoyé.'); //vérifier que le message success n'est pas affiché
    })

  })
  
  

})