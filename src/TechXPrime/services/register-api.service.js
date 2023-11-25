import http from "@/shared/services/http-common";

export class RegisterApiService{
    getClientByEmail(email){
        return http.get(`/clients/email?email=${email}`)
    }
    getTechnicalByEmail(email){
        return http.get(`/technicals/email?email=${email}`)
    }
    createClient(data){
        return http.post('/clients', data);
    }
    createTechnical(data){
        return http.post('/technicals', data);
    }
}