'use strict';

function PostProductController(categories, ProductService, ImageService, $rootScope, $state, BidService) {

    var time = new Date();
    time.setHours(12);
    time.setMinutes(0);

    var maxTime = new Date();
    maxTime.setHours(23);
    maxTime.setMinutes(45);

    var minTime = new Date();
    minTime.setHours(7);
    minTime.setMinutes(0);

    // ViewModel
    const vm = this;
    vm.categories = categories.categories;
    vm.expirationTime = time;
    vm.minTime = minTime;
    vm.maxTime = maxTime;

    var getExpDate = (date, time) => {
        date.setHours(time.getHours());
        date.setMinutes(time.getMinutes());
        return date;
    };

    vm.postProduct = () => {
        var dataP = {
            name: vm.name,
            categoryID: vm.categoryID,
            ownerID: $rootScope.currentUser.id,
            expirationDate: getExpDate(vm.expirationDate, vm.expirationTime),
            quantity: vm.quantity,
            basePrice: vm.basePrice,
            description: vm.description,
            specifications: []
        };

        ProductService.postNewProduct(dataP).then((data1) => {

            BidService.postNewProductBid({ownerID: $rootScope.currentUser.id , itemID: data1._id});
            ImageService.uploadImages(vm.image, { product_id: data1._id }).then((data2) => {
                $state.go('user.l.ProductSell', {"id": data1._id});
            });
        }, (reason) => {
            vm.singUpError = true;
            vm.singUpErrorText = reason;
        });
    };

}

export default {
    name: 'PostProductController',
    fn: PostProductController
};
