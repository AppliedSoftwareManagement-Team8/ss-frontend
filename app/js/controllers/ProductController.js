'use strict';

function ProductController() {
    const vm = this;
    vm.sellerid = 'Martin';
    vm.myInterval = 5000;
    vm.noWrapSlides = false;
    var slides = vm.slides = [];
    vm.addSlide = function() {
        var newWidth = 600 + slides.length + 1;
        slides.push({
            image: '//placekitten.com/' + newWidth + '/300',
            text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
            ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
        });
    };
    for (var i=0; i<4; i++) {
        vm.addSlide();
    }
}

export default {
    name: 'ProductController',
    fn: ProductController
};
