/**
 * Cette classe permet d'interagir avec un restAPI (https://dummyapi.io/)
 * le lien vers la documentation est https://dummyapi.io/docs/post
 * On fait une requête de type GET sur le endpoint /post pour récupérer toutes les infos des users
 * Par la suite on return les données
 * Dans le header on a ajouter l'app-id pour avoir accès à l'API
 */
class apiService {
    static getUserData() {
        return cy.request({
            method: "GET",
            url: "https://dummyapi.io/data/v1/post",
            headers: {
                "Content-Type": "application/json",
                "app-id": "61f4248c9d9bb038eaf0c6c0",
            },
        }).then((response) => {
            return response.body.data;
        });
    }
}
export default apiService;