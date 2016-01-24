'use strict';

import angular from 'angular';
window.$ = window.jQuery = require('jquery');
require('bootstrap');

// angular modules
import 'angular-ui-router';
import 'angular-messages';
import 'satellizer';
import './templates';
import './filters';
import './controllers';
import './services';
import './directives';
import 'angular-animate';
import 'angular-ui-bootstrap';
import 'ng-flow';
import 'angular-socket-io';

// create and bootstrap application
const requires = [
    'ui.router',
    'ngMessages',
    'satellizer',
    'templates',
    'app.filters',
    'app.controllers',
    'app.services',
    'app.directives',
    'ngAnimate',
    'ui.bootstrap',
    'flow',
    'btford.socket-io'
];

// mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppSettings', require('./constants'));

angular.module('app').config(require('./on_config'));

angular.module('app').run(require('./on_run'));

angular.bootstrap(document, ['app']);