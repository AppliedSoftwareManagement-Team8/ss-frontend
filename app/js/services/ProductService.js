'use strict';

function ProductService($http, AppSettings) {

    const service = {};

    service.postNewProduct = (data) => {
        return new Promise((resolve, reject) => {
            $http.post(AppSettings.apiUrl + '/products/', data).success((data) => {
                resolve(data);
            }).error((err, status) => {
                reject(err, status);
            });
        });
    };

    service.getAllByCategory = (categoryID, pageNum) => {
        return new Promise((resolve, reject) => {
            $http.get(AppSettings.apiUrl + '/products/category/' + categoryID + '/' + pageNum).success((data) => {
                resolve(data);
            }).error((err, status) => {
                reject(err, status);
            });
        });
    };

    service.getAllByOwner = (ownerID) => {
        return new Promise((resolve, reject) => {
            $http.get(AppSettings.apiUrl + '/products/owner/' + ownerID).success((data) => {
                resolve(data);
            }).error((err, status) => {
                reject(err, status);
            });
        });
    };

    service.getAllByCategorySorted = (categoryId, pageNum, sortType) => {
        return new Promise((resolve, reject) => {
            $http.get(AppSettings.apiUrl + '/products/category/' + categoryId + "/" + pageNum + "?sort=" + sortType).success((data) => {
                resolve(data);
            }).error((err, status) => {
                reject(err, status);
            });
        });
    };

    service.getAllByQuerySorted = (query, pageNum, sortType) => {
        return new Promise((resolve, reject) => {
            $http.get(AppSettings.apiUrl + '/products/search/' + query + "/" + pageNum + "?sort=" + sortType).success((data) => {
                resolve(data);
            }).error((err, status) => {
                reject(err, status);
            });
        });
    };

    service.getOneById = (id) => {
        return new Promise((resolve, reject) => {
            $http.get(AppSettings.apiUrl + '/products/' + id).success((data) => {
                resolve(data);
            }).error((err, status) => {
                reject(err, status);
            });
        });
    };

    service.getTimeRemaining = (date) => {
        var now = new Date();
        var diffMs = (new Date(date) - now);
        var diffDays = Math.round(diffMs / 86400000); // days
        var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
        var diffSecs = Math.round((((diffMs % 86400000) % 3600000) % 60000) / 1000); // seconds
        return diffDays + " days: " + diffHrs + " hrs: " + diffMins + " min: " + diffSecs + " secs";
    };

    return service;
}

export default {
    name: 'ProductService',
    fn: ProductService
};