import http from '../../shared/services/http-common';

export class TasksApiService{

    getAll() {
        return http.get('/tasks');
    }
    getById(id) {
        return http.get(`/tasks/${id}`);
    }
    create(data) {
        return http.post('/tasks', data);
    }
    update(id, data) {
        return http.put(`/tasks/${id}`, data);
    }
    delete(id) {
        return http.delete(`/tasks/${id}`);
    }
    findByName(name) {
        return http.get(`/tasks?name=${name}`);
    }

}