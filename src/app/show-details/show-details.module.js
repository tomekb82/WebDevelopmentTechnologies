//import ShowDetailsCtrl from './show-details.controller.js';
import ShowDetailsComponent from './show-details.controller';
import uiRouter from 'angular-ui-router';

const ShowDetails = angular
  .module('webDev.showDetails', [uiRouter, 'webDev.showDetails.services', 'webDev.services'])
  .controller('ShowDetailsCtrl', ShowDetailsComponent.config.controller)
  .component(ShowDetailsComponent.name, ShowDetailsComponent.config)
  .config(/*@ngInject*/($stateProvider) => {
  	$stateProvider
  	  .state('showDetails', {
  	  	url:'/showDetails/:id',
        //template: require('./show-details.html'),
  	  	//controller: ShowDetailsCtrl,
  	  	//controllerAs: 'showDetails',
        template: ShowDetailsComponent.config.template,
        controller: ShowDetailsComponent.config.controller,
        controllerAs: ShowDetailsComponent.config.controllerAs,
        params: {
          item: null
        }
  	  });
  });

  export default ShowDetails;