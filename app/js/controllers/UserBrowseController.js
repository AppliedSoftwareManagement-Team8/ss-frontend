'use strict';

function UserBrowseController(categories, products, $interval, $state, $stateParams, ProductService, BidService, socket, ImageService) {

    // ViewModel
    const vm = this;

    vm.categories = categories.categories;
    var rem = products.count % 12;
    if (rem === 0) {
        vm.pages = new Array(products.count / 12);
    }
    else {
        vm.pages = new Array(((products.count - rem) / 12) + 1);
    }

    vm.products = [];

    var prods = products.products;
    prods.forEach((product) => {
        BidService.getSingle(product._id).then((data) => {
            var obj = JSON.parse(data);
            product['currentBid'] = (obj.currentBid !== 1) ? obj.currentBid + " SEK" : "No bids yet!";
        });
        ImageService.getProductImage(product._id).then((data) => {
            var imageObj = JSON.parse(data);
            product['image'] = ( data !== 'null') ? 'data:image/' + imageObj.ext + ';base64,' + imageObj.image : 'http://www.placehold.it/200x150/EFEFEF/AAAAAA&text=no+image';
        });
        vm.products.push(product);
        socket.emit('watch', product._id);
    });

    vm.getBy = (type) => {
        if ($stateParams.category) {
            $state.go('user.l.CategoryProducts', {"category": $stateParams.category, "page": $stateParams.page, "sort": type});
        } else if ($stateParams.query) {
            $state.go('user.l.SearchProducts', {"query": $stateParams.query, "page": $stateParams.page, "sort": type});
        }
    };

    vm.toPage = (pageNum) => {
        if ($stateParams.category) {
            $state.go('user.l.CategoryProducts', {"category": $stateParams.category, "page": pageNum, "sort": $stateParams.sort});
        } else if ($stateParams.query) {
            $state.go('user.l.SearchProducts', {"query": $stateParams.query, "page": pageNum, "sort": $stateParams.sort});
        }
    };

    vm.view = (id) => {
        $state.go('user.l.ProductSell', {"id": id});
    };

    vm.getExp = (date) => {
        return ProductService.getTimeRemaining(date);
    };

    vm.remainingTime = [];
    for (var i = 0; i<vm.products.length; i++) {
        vm.remainingTime.push({ expDate: vm.products[i].expirationDate, timeRem: ProductService.getTimeRemaining(vm.products[i].expirationDate) });
    }

    $interval(() => {
        for (var i = 0; i<vm.remainingTime.length; i++) {
            vm.remainingTime[i].timeRem = ProductService.getTimeRemaining(vm.remainingTime[i].expDate);
        }
    }, 1000);
}

export default {
    name: 'UserBrowseController',
    fn: UserBrowseController
};