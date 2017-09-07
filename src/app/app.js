import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import lodash from 'lodash';

import HomeComponent from './home/home.controller';

function getModuleName(module) { return module.name || module.default.name; }

const appDependencies = [
  'ui.router',
  'ngMaterial'
];

const appModules = [
  //Directives
  require('./navbar/navbar.module.js'),
  require('./greeting/greeting.module.js'),
  
  //Views
  require('./home/home.module.js'), 
  //require('./show-details/show-details.module.js'),

  //Services
  require('./home/services/search.service.js'),
  require('./services/notifications.service.js'),

  require('./constants/constants.js')
];

angular
  .module('webDev', appDependencies.concat(appModules.map(getModuleName)))
  .constant('apiUrl', '//api.football-data.org/v1') 
  .config( /*@ngInject*/ ($stateProvider, $urlRouterProvider, $mdThemingProvider) => {
    $urlRouterProvider.otherwise('/home');  

    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('orange');

  });
