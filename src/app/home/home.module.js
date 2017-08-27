require('./home.scss');

import HomeComponent from './home.controller';
import SearchTeamInput from './search-team-input/search-team-input.js';

const HomeModule = angular
    .module('webDev.home', ['webDev.home.services'])
    .directive('searchTeamInput',() => new SearchTeamInput())
    .controller('HomeCtrl', HomeComponent.config.controller)
    //.service('SearchService', SearchService)
    .component(HomeComponent.name, HomeComponent.config);

// TODO TB: jak skonfigurowac routing aby testy atr nie wywalaly sie
//.config( /*@ngInject*/ ($stateProvider, ) => {
/*    $urlRouterProvider.otherwise('/home');

       $stateProvider
         .state('home', {
               url: '/home',
               template: require('./home/home.html'),
               controller: HomeComponent.config.controller,
               controllerAs: 'ctrl'
         });
         
});*/

export default HomeModule;
