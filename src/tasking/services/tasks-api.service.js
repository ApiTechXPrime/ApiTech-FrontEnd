import http from '../../shared/services/http-common';

export class TasksApiService{
    getById(id) {
        return http.get(`/tutorials/${id}`);
    }
    create(data) {
        return http.post('/tutorials', data);
    }
    update(id, data) {
        return http.put(`/tutorials/${id}`, data);
    }
    delete(id) {
        return http.delete(`/tutorials/${id}`);
    }
    findByTitle(title) {
        return http.get(`/tutorials?title=${title}`);
    }

}