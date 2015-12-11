'use strict';

function UserRatingController() {

    // ViewModel
    const vm = this;
    vm.rating = 5;
    vm.rateFunction = function (rating) {

    };
}

export default {
    name: 'UserRatingController',
    fn: UserRatingController
};
