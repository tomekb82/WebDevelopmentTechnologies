require('./home.scss');

import uiRouter from 'angular-ui-router';

import HomeComponent from './home.controller';
import SearchTeamInput from './search-team-input/search-team-input.js';

const HomeModule = angular
    .module('webDev.home', [uiRouter, 'webDev.home.services', 'webDev.services'])
    .controller('HomeCtrl', HomeComponent.config.controller)
    .directive('searchTeamInput',() => new SearchTeamInput())
    .component(HomeComponent.name, HomeComponent.config)
    .config( /*@ngInject*/ ($stateProvider) => {
      $stateProvider
  	   .state('home', {
  	  	  url: '/home',
  	  		template: HomeComponent.config.template,
  	  		controller: HomeComponent.config.controller,
  	  		controllerAs: HomeComponent.config.controllerAs
  	  });
    });

export default HomeModule;
