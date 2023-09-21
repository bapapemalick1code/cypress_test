import contactForm from '../../pageobjects/contactForm'
import apiService from '../../restAPI/api'

describe('MVP Testing - Fake Contact', () => {
  let userData
  
  before(function () {
    apiService.getUserData().then((data) => {
      // Stockez les données du premier utilisateur dans la variable globale
      userData = data[0];
    });
  })


  beforeEach(function () {
    cy.visit('https://testqa.purse.tech/fake-contact');
  })


  it('Valider le formulaire avec les bonnes informations', () => {
    const formObj = new contactForm();
    let genre = userData.owner.title == 'ms' ? 'Femme' : 'Homme'
    formObj.enterGenre().select(genre).should('contain.text',genre)
    formObj.enterPrenom().type(userData.owner.firstName).should('contain.value',userData.owner.firstName)
    formObj.enterNom().type(userData.owner.lastName).should('contain.value',userData.owner.lastName)
    formObj.enterMessage().type(userData.text).should('contain.value',userData.text)
    formObj.clickSubmit().click();
    formObj.messageTxt().should('have.text', 'Le message a été envoyé.');
  })


  it('Valider le formulaire sans renseigner le prenom ou le nom ', () => {
    const formObj = new contactForm();
    let genre = userData.owner.title == 'ms' ? 'Femme' : 'Homme'
    formObj.enterGenre().select(genre).should('contain.text',genre)
    let prenom = formObj.enterPrenom().should('be.empty')
    let nom = formObj.enterNom().should('be.empty')
    if (prenom || nom)
    {
      formObj.enterMessage().type(userData.text)
      formObj.clickSubmit().click();
      formObj.messageTxt().should('contain', 'Veuillez remplir tous les champs obligatoires.');
    }
  })


  it('Valider le formulaire sans renseigner le genre ', () => {
   //
  })

  
  it('Valider le formulaire sans renseigner le message ', () => {
  //
  })


  it('Verifier le bon format du champ telephone ', () => {
    //
    })

   
})