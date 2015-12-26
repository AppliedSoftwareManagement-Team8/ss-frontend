'use strict';

function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, flowFactoryProvider) {

    $locationProvider.html5Mode(true);
    flowFactoryProvider.factory = function (opts) {
        var Flow = require('@flowjs/flow.js');
        return new Flow(opts);
    };
    $stateProvider
        .state('Home', {
            url: '/',
            views: {
                "header": {templateUrl: 'main.header.html'},
                "main": {templateUrl: 'maincontent.html'}
            },
            title: 'Home'
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
        views: {
            "header": {templateUrl: 'user.header.html'},
            "main": {
                templateUrl: 'user.main.html',
                controller: 'UserHomeController as userHomeCtrl'
        },
             "list@UserMain": {
                    templateUrl: 'user.list.html'
                }         
        },
        title: 'Shop'
    }).state('UserProduct', {
            url: '/UserProduct',

            views: {
                "header": {templateUrl: 'user.header.html'},
                "main": {
                    templateUrl: 'user.Products.html',
                    controller: 'UserHomeController as userHomeCtrl'
                },
                  "list@UserProduct": {
                    templateUrl: 'user.list.html'
                } 
            },
            title: 'Product'
        })

        .state('UserSellProduct', {
            url: '/UserSellProduct',
            controller: 'SellProductController as sellProductCtrl',
            views: {
                "header": {templateUrl: 'user.header.html'},
                "main": {templateUrl: 'user.sellProduct.html'
            },
             "list@UserSellProduct": {
                    templateUrl: 'user.list.html'
                } 
            },
            title: 'UserSellProduct'
        }).state('Useractivationconfirm', {
        url: '/Useractivationconfirm',
        controller: 'SellProductController as sellProductCtrl',
        views: {
            "header": {templateUrl: 'main.header.html'},
            "main": {templateUrl: 'User.activation.confirm.html'}
        },
        title: 'Useractivationconfirm'
    }).state('UserProductSell', {
        url: '/UserProductSell',
        views: {
            "header": {templateUrl: 'user.header.html'},
            "main": {
                templateUrl: 'User.Product.Sell.html',
                controller: 'ProductController as productCtrl'
            },
                  "list@UserProductSell": {
                    templateUrl: 'user.list.html'
                } 
        },

        title: 'UserProductSell'
    })
        .state('UserProfile', {
            url: '/UserProfile',

            views: {
                "header": {templateUrl: 'user.header.html'},
                "main": {
                    templateUrl: 'user.profile.html',
                    controller: 'UserProfileController as userProfileCtrl'
                },
                "rating@UserProfile": {
                    templateUrl: 'user.rating.html',
                    controller: 'UserRatingController as ratingCtrl'
                },
                 "list@UserProfile": {
                    templateUrl: 'user.list.html'
                } 
            },
            title: 'UserProfile'
      
    });


    $urlRouterProvider.otherwise('/');

}

export default OnConfig;
