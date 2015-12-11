'use strict';

function starRating() {
    return {
        restrict: 'EA',
        templateUrl: 'directives/rating.html',
        scope: {
            ratingValue: '=ngModel',
            max: '=?',
            onRatingSelected: '&?',
            readonly: '=?'
        }, link: function (scope, element, attrs) {
            if (scope.max === undefined) {
                scope.max = 5;
            }
            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };

            scope.hoverStars = function (index) {
              if (scope.readonly === undefined || scope.readonly === false){
                for (var i = 0; i < scope.max; i++) {
                    if (i <= (index)) {
                        scope.stars[i].hovered = true;
                        scope.stars[i].filled = false;
                    } else {
                        scope.stars[i].hovered = false;
                        scope.stars[i].filled = i < scope.ratingValue;
                    }
                }
              }
            };
            scope.removeHover = function () {
                for (var i = 0; i < scope.max; i++) {
                    scope.stars[i].hovered = false;
                    scope.stars[i].filled = i < scope.ratingValue;
                }
            };

            scope.toggle = function (index) {
              if (scope.readonly === undefined || scope.readonly === false){
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
              }
            };

            scope.$watch('ratingValue',
                function (oldVal, newVal) {
                    if (newVal) {
                        updateStars();
                    }
                }
            );
        }
    };
}

export default {
    name: 'starRating',
    fn: starRating
};
