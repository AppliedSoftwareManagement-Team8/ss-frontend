'use strict';

function UserProfileController($rootScope, ImageService, image, $scope) {

    // ViewModel
    const vm = this;
    vm.updateProfile = false;
    vm.user = $rootScope.currentUser;
    vm.rating = (vm.user.rating !== 0) ? vm.user.rating : 1;

    var imageObj = JSON.parse(image);
    vm.uploadImage = () => {
        if (image !== 'null' || !image) {
            ImageService.delete(imageObj._id.$id).then((data)=> {
                ImageService.uploadImages(vm.imageUp, {
                    user_id: $rootScope.currentUser.id,
                    profile: true
                }).then((data) => {
                    ImageService.getProfileImage($rootScope.currentUser.id).then((data) => {
                        var imgObj = JSON.parse(data);
                        $scope.$apply(() => {
                            vm.image = 'data:image/' + imgObj.ext + ';base64,' + imgObj.image;
                        });
                    });
                }, (reason) => {
                    console.log(reason);
                });
            }, (reason) => {
                console.log(reason);
            });
        } else {
            ImageService.uploadImages(vm.imageUp, {user_id: $rootScope.currentUser.id, profile: true}).then((data) => {
                ImageService.getProfileImage($rootScope.currentUser.id).then((data) => {
                    var imgObj = JSON.parse(data);
                    $scope.$apply(() => {
                        vm.image = 'data:image/' + imgObj.ext + ';base64,' + imgObj.image;
                    });
                });
            }, (reason) => {
                console.log(reason);
            });
        }

    };

    vm.imageUp = null;

    vm.cancel = () => {
        vm.imageUp = null;
    };
    vm.image = ( image !== 'null') ? 'data:image/' + imageObj.ext + ';base64,' + imageObj.image : 'http://www.placehold.it/200x150/EFEFEF/AAAAAA&text=no+image';
}

export default {
    name: 'UserProfileController',
    fn: UserProfileController
};
