 import FootballAPI from './../../helpers/footballAPI.js';

 class SearchService extends FootballAPI {
 	constructor(apiUrl, $http) {
 	  super(apiUrl);
      angular
 	    .extend(this, {
 	    	$http
 	    });
 	}

 	  search(year) {
 	  	if (!year) {
      		throw Error('year argument is required');
    	}
    	
 	  	let promiseObject = {
 	  		method: 'GET',
 	  		url: this.searchCompetitions(),
 	  		params: {
 	  			season: year
 	  		}
 	  	};
           
 	  	return this.$http(promiseObject)
 	  	  .then((response) => response.data);
 	  }
 }

 export default angular
   .module('webDev.home.service', [])
   .service('SearchService', SearchService);