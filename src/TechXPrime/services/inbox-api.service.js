import http from "../../shared/services/http-common";

export class InboxApiService{
    getClients(){
        return http.get('/clients')
    }
    getClientById(id) {
        return http.get('/clients', { params: { id } });
    }
}