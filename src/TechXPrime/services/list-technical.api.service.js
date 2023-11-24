import http from "../../shared/services/http-common";

export class ListTechnicalApiService{
    getClients(){
        return http.get('/technicals')
    }
    getClientById(id) {
        return http.get('/technicals', { params: { id } });
    }
}