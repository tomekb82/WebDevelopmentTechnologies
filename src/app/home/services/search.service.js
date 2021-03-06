
 class SearchService {
  
 	constructor(footlballApiUrl, $http) {
    angular
 	    .extend(this, {
 	      $http,
        footlballApiUrl
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
 	  		url: this.footlballApiUrl,
 	  		params: {
 	  			season: year
 	  		}
 	  	};
           
 	  	return this.$http(promiseObject)
 	  	  .then((response) => {
 	  	  	return response.data;
 	  	  });
 	}
 }

export default angular.module('webDev.home.services', ['webDev.constants'])
   .service('SearchService', SearchService);