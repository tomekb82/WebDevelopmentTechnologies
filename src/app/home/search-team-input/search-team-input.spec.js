// TODO TB: pominiete testy nie wiem dlaczego ?
describe('search teamt input', () => {

  let $scope, searchTeamInputElement, directiveScope, $timeout;

  beforeEach(() => {
    angular.mock.module('webDev');
    angular.mock.module('webDev.templates');

    angular.mock.inject((_$compile_, _$rootScope_, _$timeout_) => {
      $scope = _$rootScope_.$new();
      $timeout = _$timeout_;

      const element = `<search-team-input></search-team-input>`;

      searchMovieInputElement = _$compile_(element)($scope);
      $scope.$apply();

      directiveScope = searchTeamInputElement.isolateScope();
    });
  });

  it('should exist', () => {
    expect(searchTeamInputElement).toBeDefined();
  });

  it('should expose searchCompetitions method', () => {
    expect(angular.isFunction(directiveScope.searchCompetitions)).toBe(true);
  });
});