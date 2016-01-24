'use strict';

function LoginController($auth, $state, $rootScope) {

    // ViewModel
    const vm = this;
    vm.loginError = false;
    vm.loginErrorText = '';

    vm.login = function () {

        var credentials = {
            primaryEmail: vm.emailID + "@student.bth.se",
            password: vm.password
        };

        $auth.login(credentials).then(function (data) {

            var user = JSON.stringify(data.data);

            // Save user in local storage
            localStorage.setItem('user', user);

            // Set authenticated ( used for authorization )
            $rootScope.authenticated = true;

            // Save the user in the root scope in order to
            // get its detail throughout the app
            $rootScope.currentUser = data.data;

            // Redirect to user main page
            $state.transitionTo('user.l.Home');
        }, function (error) {
            vm.loginError = true;
            vm.loginErrorText = error.data.error;
        });
    };
}

export default {
    name: 'LoginController',
    fn: LoginController
};
