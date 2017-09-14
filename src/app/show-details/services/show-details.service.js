
class ShowDetailsService {
  //@ngInject
  constructor(footlballApiUrl, $http) {
  	angular
  	  .extend(this, {
  	  	$http,
        footlballApiUrl
  	  });
  }

  getTeamsInLeague(leagueId) {

    if (!leagueId) {
          throw Error('league id is required');
      }

    let promiseObject = {
      method: 'GET',
      url: `${this.footlballApiUrl}/${leagueId}/teams`  
    };
           
    return this.$http(promiseObject)
      .then((response) => {
        return response.data;
    });
  }

}

//export default ShowDetailsService;

export default angular.module('webDev.showDetails.services', ['webDev.constants']).service('ShowDetailsService', ShowDetailsService);