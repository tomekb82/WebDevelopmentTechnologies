 import FootballAPI from './../../helpers/footballAPI.js';

 class SearchService /*extends FootballAPI*/ {
 	constructor(/*apiUrl,*/ $http) {
 	  //super(apiUrl);
      angular
 	    .extend(this, {
 	    	$http
 	    });
 	}

    showMe(){
    	console.log("test");
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
 	  	  .then((response) => {
 	  	  	return response.data;
 	  	  });
 	}

 	searchTeamById(teamId) {
 	  	if (!teamId) {
      		throw Error('team argument is required');
    	}

 	  	let promiseObject = {
 	  		method: 'GET',
 	  		url: this.searchTeam(teamId)
 	  	};
           
 	  	return this.$http(promiseObject)
 	  	  .then((response) => {
 	  	  	return response.data;
 	  	  });
 	}
 }

//export SearchService; 
export default angular
  .module('webDev.home.services', [])
   .service('SearchService', SearchService);