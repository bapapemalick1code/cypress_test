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