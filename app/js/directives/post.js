'use strict';

function PostDirective() {

  return {
    restrict: 'EA',
    scope: {
      title: '@',
      message: '@postDirective'
    },
    link: (scope, element) => {
      element.on('click', () => {
        window.alert('Product Posted on StudentShopper !' + scope.message);
      });
    }
  };
}

export default {
  name: 'postDirective',
  fn: PostDirective
};
