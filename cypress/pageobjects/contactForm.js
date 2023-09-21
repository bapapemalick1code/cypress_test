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
    enterMessage() {
        return cy.get("#message")
    }
    clickSubmit() {
        return cy.get("#submit-button")
    }
    messageTxt() {
        return cy.get("#popin-message")
    }
}




export default contactForm;