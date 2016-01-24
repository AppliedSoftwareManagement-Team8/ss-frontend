'use strict';

function BidService($http, AppSettings) {

    const service = {};

    // Get all by user
    service.getAllByBidder = function (id) {
        return new Promise((resolve, reject) => {
            $http.get(AppSettings.apiUrl+ '/bids/user/' + id).success((data) => {
                resolve(data);
            }).error((err, status) => {
                reject(err, status);
            });

        });
    };

    service.getSingle = function (id) {
        return new Promise((resolve, reject) => {
            $http.get(AppSettings.apiUrl+ '/bids/' + id).success((data) => {
                resolve(data);
            }).error((err, status) => {
                reject(err, status);
            });

        });
    };

    service.postNewProductBid = function (data) {
        return new Promise((resolve, reject) => {
            $http.post(AppSettings.apiUrl+ '/bids/', data).success((data) => {
                resolve(data);
            }).error((err, status) => {
                reject(err, status);
            });

        });
    };

    return service;
}

export default {
    name: 'BidService',
    fn: BidService
};