import http from "@/shared/services/http-common";

export class TechnicalApiService{
    getTechnicals(){
        return http.get('/technicals')
    }
    getById(id) {
        return http.get(`/technicals/${id}`);
    }
}