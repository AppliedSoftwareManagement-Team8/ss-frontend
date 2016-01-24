'use strict';

function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, flowFactoryProvider, $authProvider, $httpProvider, $provide, AppSettings) {


    function redirectWhenLoggedOut($q, $injector) {

        return {
            responseError: function (rejection) {
                // Current state
                var $state = $injector.get('$state');
                // Error cases
                var errorCases = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];

                angular.forEach(errorCases, function (value, key) {

                    if (rejection.data.error === value) {

                        //remove user from local storage
                        localStorage.removeItem('user');

                        // Redirect back to login
                        $state.go('root.Login');
                    }
                });

                return $q.reject(rejection);
            }
        };
    }

    function SocketIoFactory(socketFactory) {
        return socketFactory({
            prefix: '',
            ioSocket: io.connect('http://localhost:4000/', {
                query: 'token=' + localStorage.getItem('satellizer_token')
            })
        });
    }

    // Set the new logged out interceptor
    $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);

    $provide.factory('socket', SocketIoFactory);

    // Push the new interceptor to the array
    $httpProvider.interceptors.push('redirectWhenLoggedOut');

    $authProvider.loginUrl = AppSettings.apiUrl + '/users/authenticate';

    flowFactoryProvider.factory = function (opts) {
        var Flow = require('@flowjs/flow.js');
        return new Flow(opts);
    };

    $locationProvider.html5Mode(true);
    $stateProvider.state('root', {
        templateUrl: 'main.header.html'
    }).state('root.Home', {
        url: '/',
        templateUrl: 'maincontent.html',
        resolve: {
            categories: function (CategoryService) {
                return CategoryService.get();
            }
        },
        controller: function (categories) {
            const vm = this;
            vm.categories = categories.categories;
        },
        controllerAs: 'mainPageCtrl',
        title: 'Home'

    }).state('root.Signup', {
        url: '/Signup',
        templateUrl: 'signup.html',
        controller: 'SignUpController as signUpCtrl',
        title: 'Signup'

    }).state('root.Login', {
        url: '/Login',
        templateUrl: 'login.html',
        controller: 'LoginController as loginCtrl',
        title: 'Login'

    }).state('root.Activation', {
        url: '/Activation',
        templateUrl: 'activation.html',
        controller: 'ActivationController as activateCtrl',
        title: 'Activation'

    }).state('root.ActivationConfirm', {
        url: '/ActivationConfirm',
        controller: 'SellProductController as sellProductCtrl',
        templateUrl: 'user.activation.confirm.html',
        title: 'Activation Confirm'

    }).state('user', {
        templateUrl: 'user.header.html',
        controller: function ($auth, $rootScope, $state) {
            const vm = this;
            vm.logout = () => {

                $auth.logout().then(function () {

                    // Delete user from local storage
                    localStorage.removeItem('user');

                    // Delete the currently logged in user
                    $rootScope.currentUser = null;

                    // User shall be no longer authorized
                    $rootScope.authenticated = false;
                    $state.transitionTo('root.Home');
                });
            };
            vm.search = () => {
                console.log(vm.searchQuery);
                var query = vm.searchQuery;
                $state.go('user.l.SearchProducts', {"query": query, "page": 0, "sort": "createdDate"});
            };
        },
        controllerAs: 'headerCtrl'
    }).state('user.l', {
        templateUrl: 'user.list.html',
        controller: 'MyBPController as myBPCtrl',
        resolve: {
            myProducts: function (ProductService, $rootScope) {
                return ProductService.getAllByOwner($rootScope.currentUser.id);
            },
            myBids: (BidService, $rootScope) => {
                return BidService.getAllByBidder($rootScope.currentUser.id);
            }
        }
    }).state('user.l.Home', {
        url: '/Home',
        templateUrl: 'user.main.html',
        controller: 'UserHomeController as userHomeCtrl',
        resolve: {
            categories: function (CategoryService) {
                return CategoryService.get();
            }
        },
        title: 'Shop'

    }).state('user.l.Profile', {
        url: '/MyProfile',
        templateUrl: 'user.profile.html',
        controller: 'UserProfileController as userProfileCtrl',
        resolve: {
            image: (ImageService, $rootScope) => {
                return ImageService.getProfileImage($rootScope.currentUser.id)
            }
        },
        title: 'Profile'

    }).state('user.l.ViewProfile', {
        url: '/users/{id}',
        templateUrl: 'user.profile.view.html',
        controller: 'UserProfileViewController as userProfileViewCtrl',
        resolve: {
            user: function (UserService, $stateParams) {
                return UserService.getUser($stateParams.id);
            },
            image: (ImageService, $stateParams) => {
                return ImageService.getProfileImage($stateParams.id)
            }
        },
        title: 'Profile'

    }).state('user.l.SellProduct', {
        url: '/SellProduct',
        templateUrl: 'user.sell.product.html',
        controller: 'PostProductController as postProductCtrl',
        resolve: {
            categories: function (CategoryService) {
                return CategoryService.get();
            }
        },
        title: 'SellProduct'

    }).state('user.l.CategoryProducts', {
        url: '/products/category/{category}/{page}/?sort',
        templateUrl: 'user.products.html',
        controller: 'UserBrowseController as browseProductsCtrl',
        resolve: {
            categories: function (CategoryService) {
                return CategoryService.get();
            },
            products: function (ProductService, $stateParams) {
                return ProductService.getAllByCategorySorted($stateParams.category, $stateParams.page, $stateParams.sort);
            }
        },
        title: 'Products'

    }).state('user.l.SearchProducts', {
        url: '/products/search/{query}/{page}/?sort',
        templateUrl: 'user.products.html',
        controller: 'UserBrowseController as browseProductsCtrl',
        resolve: {
            categories: function (CategoryService) {
                return CategoryService.get();
            },
            products: function (ProductService, $stateParams) {
                return ProductService.getAllByQuerySorted($stateParams.query, $stateParams.page, $stateParams.sort);
            }
        },
        title: 'Products'

    }).state('user.l.ProductSell', {
        url: '/products/{id}',
        templateUrl: 'user.product.sell.html',
        controller: 'ProductController as productCtrl',
        resolve: {
            product: function (ProductService, $stateParams) {
                return ProductService.getOneById($stateParams.id);
            },
            currentBidder: (BidService, $stateParams) => {
                return BidService.getSingle($stateParams.id);
            },
            image: (ImageService, $stateParams) => {
                return ImageService.getProductImage($stateParams.id)
            }
        },
        title: 'Product'

    });


    $urlRouterProvider.otherwise('/');

}

export default OnConfig;
