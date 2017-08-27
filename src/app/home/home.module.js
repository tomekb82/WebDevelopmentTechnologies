require('./home.scss');

import uiRouter from 'angular-ui-router';

import HomeComponent from './home.controller';
import SearchTeamInput from './search-team-input/search-team-input.js';

const HomeModule = angular
    .module('webDev.home', [uiRouter, 'webDev.home.services'])
    .directive('searchTeamInput',() => new SearchTeamInput())
    .controller('HomeCtrl', HomeComponent.config.controller)
    //.service('SearchService', SearchService)
    .component(HomeComponent.name, HomeComponent.config)
    .config( /*@ngInject*/ ($stateProvider) => {
    
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'home/home.html',
          controller: HomeComponent.config.controller,
          controllerAs: 'ctrl'
        });   
    });

export default HomeModule;
