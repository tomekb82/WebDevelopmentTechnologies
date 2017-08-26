//import uiRouter from 'angular-ui-router';

import HomeComponent from './home/home.controller';

function getModuleName(module) { return module.name || module.default.name; }

const appDependencies = [
  'ui.router'
];

const appModules = [
  require('./home/home.module.js'), 
];

angular
  .module('webDev', appDependencies.concat(appModules.map(getModuleName)))
  
   .config( /*@ngInject*/ ($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/home');

       $stateProvider
         .state('home', {
               url: '/home',
               template: require('./home/home.html'),
               controller: HomeComponent.config.controller,
               controllerAs: 'ctrl'
         });


  });
