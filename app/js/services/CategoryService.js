'use strict';

function CategoryService($http, AppSettings) {

    const service = {};

    // Get all Categories
    service.get = function () {
        return new Promise((resolve, reject) => {
            $http.get(AppSettings.apiUrl+ '/categories/').success((data) => {
                resolve(data);
            }).error((err, status) => {
                reject(err, status);
            });
        });
    };

    return service;
}

export default {
    name: 'CategoryService',
    fn: CategoryService
};