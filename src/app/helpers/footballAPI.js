
class FootballAPI {

	constructor(apiUrl) {
		let _apiUrl = apiUrl;
		this.createApiSearchUrl = function() {
			return `${_apiUrl}/competitions`;
		};
		this.getApiUrl = function() {
			return _apiUrl;
		};
	}

	searchCompetitions() {
		return this.createApiSearchUrl();
	}

	searchTeam(teamId) {
		return this.getApiUrl() + `/competitions/${teamId}/teams`;
	}

}

export default FootballAPI;
