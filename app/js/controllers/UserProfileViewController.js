'use strict';

function UserProfileViewController(user, image, $rootScope, UserService) {

    // ViewModel
    const vm = this;
    vm.user = JSON.parse(user);
    vm.rating = (vm.user.rating !== 0) ? vm.user.rating : 1;

    var imageObj = JSON.parse(image);
    vm.image = ( image !== 'null') ? 'data:image/' + imageObj.ext + ';base64,' + imageObj.image : 'http://www.placehold.it/200x150/EFEFEF/AAAAAA&text=no+image';


    vm.rateUser = () => {
        var postRating = (data) => {
            return new Promise((resolve, reject) => {
                $http.post(AppSettings.apiUrl + '/ratings/create', data).success((data) => {
                    resolve(data);
                }).error((err, status) => {
                    reject(err, status);
                });
            });
        };
        var data = {
            publisher_id : $rootScope.id,
            recipient_id : vm.user.id,
            rating :vm.rating,
            comment :"message"
        };

        postRating(data).then((data) => {
            UserService.getUser(user.id).then((data) => {
                vm.user = JSON.parse(data);
            });
        });
    };

}

export default {
    name: 'UserProfileViewController',
    fn: UserProfileViewController
};
