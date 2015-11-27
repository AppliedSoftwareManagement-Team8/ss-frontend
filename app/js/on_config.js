'use strict';

function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('Home', {
            url: '/',
            views: {
                "header": {templateUrl: 'main.header.html'},
                "main": {templateUrl: 'maincontent.html'}
            },
            title: 'Home',
        }).state('Signup', {
            url: '/Signup',
            controller: 'SignupController as signupCtrl',
            views: {
                "header": {templateUrl: 'main.header.html'},
                "main": {templateUrl: 'signup.html'}
            },
            title: 'Signup'
        }).state('Login', {
            url: '/Login',
            controller: 'LoginController as loginCtrl',
            views: {
                "header": {templateUrl: 'main.header.html'},
                "main": {templateUrl: 'login.html'}
            },
            title: 'Login'
        }).state('UserMain', {
            url: '/UserMain',
            controller: 'UserHomeController as userHomeCtrl',
            views: {
                "header": {templateUrl: 'user.header.html'},
                "main": {templateUrl: 'user.main.html'}
            },
            title: 'Shop'
        });


    $urlRouterProvider.otherwise('/');

}

export default OnConfig;
