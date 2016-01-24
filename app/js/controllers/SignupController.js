'use strict';

function SignUpController($state, UserService) {

    // ViewModel
    const vm = this;
    vm.singUpError = false;
    vm.singUpErrorText = '';

    vm.signUp = function () {

        var credentials = {
            firstName: vm.firstName,
            lastName: vm.lastName,
            primaryEmail: vm.emailID + "@student.bth.se",
            password: vm.password
        };

        var data = UserService.register(JSON.stringify(credentials));
        data.then((data) => {
            $state.go('root.Activation');
        }, (reason) => {
            vm.singUpError = true;
            vm.singUpErrorText = reason;
        });
    };

}

export default {
    name: 'SignUpController',
    fn: SignUpController
};
