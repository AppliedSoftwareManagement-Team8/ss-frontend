'use strict';

function starRating() {
return {
			restrict : 'EA',
			template : '<ul class="rating">'+ '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' + '\u2605'+ '</li>' + '</ul>',
			scope : {
				ratingValue : '=',
				max : '=',
				onRatingSelected : '&'
			},
				
		};
	}




	export default {
  name: 'starRating',
  fn: starRating
};
