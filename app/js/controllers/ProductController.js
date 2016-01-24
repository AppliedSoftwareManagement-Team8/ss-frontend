'use strict';

function ProductController(product, currentBidder, ProductService, $interval, $state, socket, $rootScope, image) {
    const vm = this;
    vm.product = product;
    vm.expDate = ProductService.getTimeRemaining(vm.product.expirationDate);
    vm.bidder = JSON.parse(currentBidder);

    socket.emit('watch', product._id);
    socket.on('watchUpdate', function (data) {
        if (data.itemID === product._id) {
            vm.bidder.currentBid = data.currentBid;
            vm.bidder.bidder = data.bidder;
        }
    });

    $interval(() => {
        vm.expDate = ProductService.getTimeRemaining(vm.product.expirationDate);
    }, 1000);

    vm.checkProfile = (id) => {
        $state.go('user.l.ViewProfile', {"id": id});
    };

    vm.placeBid = () => {
        var data = {
            productID: product._id,
            bid: {
                bidderID: $rootScope.currentUser.id,
                value: vm.newBid
            }
        };
        socket.emit('bid', data);
    };

    vm.myInterval = 5000;
    vm.noWrapSlides = false;
    var imageObj = JSON.parse(image);
    var imgObj = ( image !== 'null') ? 'data:image/' + imageObj.ext + ';base64,' + imageObj.image : 'http://www.placehold.it/200x150/EFEFEF/AAAAAA&text=no+image';
    var slides = vm.slides = [];
    vm.addSlide = function () {
        slides.push({
            image: imgObj
        });
    };
    for (var i = 0; i < 4; i++) {
        vm.addSlide();
    }
}

export default {
    name: 'ProductController',
    fn: ProductController
};
