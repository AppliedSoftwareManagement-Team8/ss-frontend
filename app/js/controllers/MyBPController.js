'use strict';

function MyBPController(myProducts, myBids, ProductService, $state, $scope, socket, $rootScope) {

    var search = (key, arr) =>  {
        for (var i=0; i < arr.length; i++) {
            if (arr[i].itemID === key) {
                return arr[i].currentBid;
            }
        }
    };

    // ViewModel
    const vm = this;
    var products = JSON.parse(myProducts);
    var myBP = JSON.parse(myBids);

    vm.myProducts = [];
    products.forEach((product) => {
        var currBid = search(product._id, myBP.myProducts);
        product['currentBid'] = (currBid) ? currBid : "No bids yet!";
        vm.myProducts.push(product);
        socket.emit('watch', product.itemID);
    });

    vm.myBids = [];
    myBP.myBids.forEach((bid) => {
        ProductService.getOneById(bid.itemID).then((data) => {
            bid['product'] = data;
            vm.myBids.push(bid);
            socket.emit('watch', bid.itemID);
        }, (reason) => {
            vm.error = true;
            vm.errorMsg = reason;
        });
    });

    socket.on('watchUpdate', function (data) {
        for (var i=0; i < vm.myProducts.length; i++) {
            if (vm.myProducts[i]._id === data.itemID) {
                vm.myProducts[i].currentBid = data.currentBid;
                return;
            }
            for (var j=0; j < vm.myBids.length; j++) {
                if (vm.myBids[j].itemID === data.itemID) {
                    vm.myBids[j].currentBid = data.currentBid;
                    if ($rootScope.currentUser.id === data.bidder.bidderID) {
                        vm.myBids[j].bid = data.currentBid;
                    }
                }
            }
        }

    });

    for (var i = 0; i < vm.myProducts.length; i++) {
        $scope.$watch('vm.myProducts[' + i + ']', (newValue, oldValue) => {}, true);
    }

    vm.getExp = (date) => {
        return ProductService.getTimeRemaining(date);
    };

    vm.viewItem  = (id) => {
        $state.go('user.l.ProductSell', {"id": id});
    };

    vm.deleteItem = (id) => {
        for (var i = 0; i<vm.myProducts.length; i++) {
            if (vm.myProducts[i]._id === id) {
                vm.myProducts.splice(i,1);
            }
        }
    };

}

export default {
    name: 'MyBPController',
    fn: MyBPController
};
