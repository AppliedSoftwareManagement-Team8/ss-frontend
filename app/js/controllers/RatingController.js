'use strict';

function RatingController() {

    // ViewModel
    const vm = this;
  vm.rating = 5;
    vm.rateFunction = function(rating) {
      alert('Rating selected - ' + rating);
    
};
}

export default {
    name: 'RatingController',
    fn: RatingController
};
