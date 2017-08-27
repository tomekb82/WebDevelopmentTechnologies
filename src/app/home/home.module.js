require('./home.scss');

import HomeComponent from './home.controller';

const HomeModule = angular
    .module('webDev.home', [])
    .controller('HomeCtrl', HomeComponent.config.controller)
    .component(HomeComponent.name, HomeComponent.config);

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
