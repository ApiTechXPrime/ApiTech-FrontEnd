import http from "../../shared/services/http-common";

export class ViewOrderApiService{
    getAll() {
        return http.get('/orders');
    }
}