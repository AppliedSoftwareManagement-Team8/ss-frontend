'use strict';

function BidDirective() {

  return {
    restrict: 'EA',
    scope: {
      title: '@',
      message: '@BidDirective'
    },
    link: (scope, element) => {
      element.on('click', () => {
        window.alert('Value is accepted' + scope.message);
      });
    }
  };
}

export default {
  name: 'bidDirective',
  fn: BidDirective
};
