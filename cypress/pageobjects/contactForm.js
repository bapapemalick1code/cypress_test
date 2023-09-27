/**
 * class contactForm avec les méthodes contenant tous les éléments du formulaire
 */
class contactForm {

    enterGenre() {
        return cy.get("#gender")
    }

    enterPrenom() {
        return cy.get("#first-name")
    }

    enterNom() {
        return cy.get("#last-name")
    }

    enterSociete() {
        return cy.get("#company")
    }

    enterPhone() {
        return cy.get("#phone")
    }

    enterTitleMessage() {
        return cy.get("#message-title")
    }

    enterMessage() {
        return cy.get("#message")
    }

    clickSubmit() {
        return cy.get("#submit-button")
    }

    successTxt() {
        return cy.get("#popin-message")
    }
    
    errorTxt() {
        return cy.get("#popin-message")
    }
}

export default contactForm;