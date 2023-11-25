import http from "@/shared/services/http-common";
import axios from "axios";

export class TechnicalApiService{
    getTechnicals(){
        return http.get('/technicals')
    }
    getById(id) {
        return http.get(`/technicals/${id}`);
    }

    updateTechnical(technicalData) {
        const technicalId = technicalData.id;
        return http.put(`/technicals/${technicalId}`, technicalData)
    }
}