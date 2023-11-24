import http from "@/shared/services/http-common";
export class RequestApiService{
    createRequest(data){
        return http.post('/requests', data);
    }
    getRequestByTechId(id)
    {
        return http.get(`/requests/${id}`);
    }
}