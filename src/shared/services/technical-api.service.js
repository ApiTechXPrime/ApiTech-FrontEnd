import http from "../../technical/http-common";

export class TechnicalApiService{
    getTechnicals(){
        return http.get('/technicals')
    }
}