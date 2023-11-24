import http from '../../shared/services/http-common';

export class TasksApiService{

    getAll() {
        return http.get('/orders');
    }
    getById(id) {
        return http.get(`/orders/${id}`);
    }
    create(data) {
        return http.post('/orders', data);
    }
    update(id, data) {
        return http.put(`/orders/${id}`, data);
    }
    delete(id) {
        return http.delete(`/orders/${id}`);
    }
    findByName(name) {
        return http.get(`/orders?name=${name}`);
    }

}