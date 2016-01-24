'use strict';

function UserService($http, AppSettings) {

    const service = {};

    service.register = function (data) {
        return new Promise((resolve, reject) => {
            $http.post(AppSettings.apiUrl+ '/users/register', data).success((data) => {
                resolve(data);
            }).error((err, status) => {
                reject(err, status);
            });
        });
    };

    // Activate user
    service.activateUser = function (data) {
        return new Promise((resolve, reject) => {
            $http.post(AppSettings.apiUrl+ '/users/activate', data).success((data) => {
                resolve(data);
            }).error((err, status) => {
                reject(err, status);
            });
        });
    };

    // Activate user
    service.getUser = function (id) {
        return new Promise((resolve, reject) => {
            $http.get(AppSettings.apiUrl+ '/users/' + id).success((data) => {
                resolve(data);
            }).error((err, status) => {
                reject(err, status);
            });
        });
    };

    return service;
}

export default {
    name: 'UserService',
    fn: UserService
};