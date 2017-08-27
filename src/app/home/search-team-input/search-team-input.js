class SearchTeamInput {
  constructor() {
    angular.extend(this, {
      template: require('./search-team-input.html'),
      restrict: 'E',
      scope: {
        searchCompetitions: '&'
      }
    });
  }

}

export default SearchTeamInput;