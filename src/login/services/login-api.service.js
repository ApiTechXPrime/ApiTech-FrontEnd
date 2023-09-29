import http from "@/shared/services/http-common";

export class LoginApiService{

    getUsers() {
        return Promise.all([
            http.get('/clients'),
            http.get('/technicals')
        ]).then(([clientsResponse, technicalsResponse]) => {
            return {
                users: {
                    clients: clientsResponse.data,
                    technicals: technicalsResponse.data
                }
            };
        })
    }
}