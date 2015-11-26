'use strict';

function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('Home', {
            url: '/',
            views: {
              "header": { templateUrl: 'main.header.html' },
              "main": { templateUrl: 'maincontent.html' }
            },
            title: 'Home',
        }).state('Signup', {
            url: '/',
            controller: 'SignupController as signupCtrl',
            views: {
              "header": { templateUrl: 'main.header.html' },
              "main": { templateUrl: 'signup.html' }
            },
            title: 'Signup'
        }).state('Login', {
            url: '/',
            controller: 'LoginController as loginCtrl',
            views: {
              "header": { templateUrl: 'main.header.html' },
              "main": { templateUrl: 'login.html' }
            },
            title: 'Login'
        });


    $urlRouterProvider.otherwise('/');

}

export default OnConfig;
