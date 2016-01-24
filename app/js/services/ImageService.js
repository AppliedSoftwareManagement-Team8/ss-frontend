'use strict';

function ImageService($http, AppSettings) {

    const service = {};

    service.getProfileImage = (id) => {
        return new Promise((resolve, reject) => {
            $http.get(AppSettings.apiUrl + '/images/users/' + id).success((data) => {
                resolve(data);
            }).error((err, status) => {
                reject(err, status);
            });
        });
    };

    service.getProductImage = (id) => {
        return new Promise((resolve, reject) => {
            $http.get(AppSettings.apiUrl + '/images/products/' + id).success((data) => {
                resolve(data);
            }).error((err, status) => {
                reject(err, status);
            });
        });
    };

    service.delete = (id) => {
        return new Promise((resolve, reject) => {
            $http.delete(AppSettings.apiUrl + '/images/' + id).success((data) => {
                resolve(data);
            }).error((err, status) => {
                reject(err, status);
            });
        });
    };

    service.uploadImages = (images, data) => {
        var fd = new FormData();
        fd.append('image', images);
        for (var key in data) {
            fd.append(key, data[key]);
        }
        return new Promise((resolve, reject) => {
            $http.post(AppSettings.apiUrl + '/images/', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).success((data) => {
                resolve(data);
            }).error((err, status) => {
                reject(err, status);
            });
        });
    };

    service.uploadImage = (image, data) => {
        var fd = new FormData();
        fd.append('image', image);
        for (var key in data) {
            fd.append(key, data[key]);
        }
        return new Promise((resolve, reject) => {
            $http.post(AppSettings.apiUrl + '/images/', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).success((data) => {
                resolve(data);
            }).error((err, status) => {
                reject(err, status);
            });
        });
    };

    return service;
}

export default {
    name: 'ImageService',
    fn: ImageService
};
