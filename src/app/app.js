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
  //Views
  require('./home/home.module.js'), 

  //Services
  require('./home/services/search.service.js')
];

angular
  .module('webDev', appDependencies.concat(appModules.map(getModuleName)))
  .constant('apiUrl', '//api.football-data.org/v1') 
  .config( /*@ngInject*/ ($stateProvider, $urlRouterProvider, $mdThemingProvider) => {
    $urlRouterProvider.otherwise('/home');

    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('orange');

       $stateProvider
         .state('home', {
               url: '/home',
               template: require('./home/home.html'),
               controller: HomeComponent.config.controller,
               controllerAs: 'ctrl'
         });


  });
