import FootballAPI from './../helpers/footballAPI';

class ShowDetailsService extends FootballAPI {
  //@ngInject
  constructor(apiUrl, $http) {
  	super(apiUrl);
  	angular
  	  .extend(this, {
  	  	$http
  	  });
  }

  getShowDetailsById(teamId) {
  	return this.$http({
  		method: 'GET',
  		url: this.searchTeam(teamId)
  	})
  	  .then((response) => response.data);
  }
}

export default ShowDetailsService;