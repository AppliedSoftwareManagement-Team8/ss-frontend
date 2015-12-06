'use strict';

import angular from 'angular';
window.$ = window.jQuery = require('jquery');
require('bootstrap');

// angular modules
import 'angular-ui-router';
import 'angular-messages';
import './templates';
import './filters';
import './controllers';
import './services';
import './directives';
import 'angular-animate';
import 'angular-ui-bootstrap';

// create and bootstrap application
const requires = [
  'ui.router',
  'ngMessages',
  'templates',
  'app.filters',
  'app.controllers',
  'app.services',
  'app.directives'
  'ngAnimate',
   'ui.bootstrap',
];

// mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppSettings', require('./constants'));

angular.module('app').config(require('./on_config'));

angular.module('app').run(require('./on_run'));

angular.bootstrap(document, ['app']);
