'use strict';

function OnRun($rootScope, AppSettings, $state) {

    // change page title based on state
    $rootScope.$on('$stateChangeSuccess', (event, toState) => {
        $rootScope.pageTitle = '';

        if (toState.title) {
            $rootScope.pageTitle += toState.title;
            $rootScope.pageTitle += ' \u2014 ';
        }

        $rootScope.isLoading = false;

        $rootScope.pageTitle += AppSettings.appTitle;
    });

    $rootScope.$on('$stateChangeStart', (event, toState) => {

        $rootScope.isLoading = true;

        // Get user from local storage
        var user = JSON.parse(localStorage.getItem('user'));
        var token = localStorage.getItem('satellizer_token');

        // Check if user is still persisted in local storage
        // (i.e. token has not expired)
        if (user && token) {

            $rootScope.authenticated = true;

            $rootScope.currentUser = user;

            if (toState.name === "root.Home" || toState.name === "root.Login" || toState.name === "root.Signup") {

                event.preventDefault();

                // go to the user main page
                $state.go('user.l.Home');
            }
        }
    });

}

export default OnRun;
