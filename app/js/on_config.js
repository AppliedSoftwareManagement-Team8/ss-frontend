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
        }).state('Activation', {
            url: '/Activation',
            controller: 'ActivationController as activationCtrl',
            views: {
                "header": {templateUrl: 'main.header.html'},
                "main": {templateUrl: 'activation.html'}
            },
            title: 'Activation'
        }).state('UserMain', {
            url: '/UserMain',
            controller: 'UserHomeController as userHomeCtrl',
            views: {
                "header": {templateUrl: 'user.header.html'},
                "main": {templateUrl: 'user.main.html'}
                },           
            title: 'Shop'
        }).state('UserProduct', {
            url: '/UserProduct',
            controller: 'UserHomeController as userHomeCtrl',
            views: {
                "header": {templateUrl: 'user.header.html'},
                "main": {templateUrl: 'user.Products.html'}
            },
            title: 'Product'
        })
      
        .state('UserProfile', {
            url: '/UserProfile',
            controller: 'UserProfileController as userProfileCtrl',
            views: {
                "header": {templateUrl: 'user.header.html'},
                "main": {templateUrl: 'user.profile.html'},
                "rating@UserProfile": {
                    templateUrl: 'user.profile.rating.html',
                    controller: 'UserRatingController as ratingCtrl'
                }
            },
            title: 'UserProfile'
        })
        .state('UserSellProduct', {
            url: '/UserSellProduct',
            controller: 'SellProductController as sellProductCtrl',
            views: {
                "header": {templateUrl: 'user.header.html'},
                "main": {templateUrl: 'user.sellProduct.html'}
            },
            title: 'UserSellProduct'
        });


    $urlRouterProvider.otherwise('/');

}

export default OnConfig;
