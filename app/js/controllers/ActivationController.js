'use strict';

function ActivationController($state, UserService) {

    // ViewModel
    const vm = this;
    vm.activationError = false;
    vm.activationErrorText = '';

    vm.activateUser = function () {

        var credentials = {
            primaryEmail: vm.emailID + "@student.bth.se",
            activationCode: vm.activationCode
        };
        var data = UserService.activateUser(JSON.stringify(credentials));
        data.then((data) => {
            $state.go('root.Login');
        }, (reason) => {
            vm.activationError = true;
            vm.activationErrorText = reason;
        });
    };

}

export default {
    name: 'ActivationController',
    fn: ActivationController
};
