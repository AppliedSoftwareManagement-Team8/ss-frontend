'use strict';

function UserHomeController($auth, $rootScope, categories, $state) {

    // ViewModel
    const vm = this;
    vm.categories = categories.categories;
    vm.categoryClick = function(categoryID) {
        $state.go('user.l.CategoryProducts', {"category": categoryID, "page": 0, "sort": "createdDate"});
    };
    vm.logout = function () {

        $auth.logout().then(function () {

            // Delete user from local storage
            localStorage.removeItem('user');

            // Delete the currently logged in user
            $rootScope.currentUser = null;

            // User shall be no longer authorized
            $rootScope.authenticated = false;

        });
    };
 }

export default {
    name: 'UserHomeController',
    fn: UserHomeController
};