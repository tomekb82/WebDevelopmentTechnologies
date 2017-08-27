// TODO TB: pominiete testy nie wiem dlaczego ?
describe('search team input', () => {

  let $scope, searchTeamInputElement, directiveScope, $timeout;

  beforeEach(() => {
    angular.mock.module('webDev');
    angular.mock.module('templates');

    angular.mock.inject((_$compile_, _$rootScope_, _$timeout_) => {
      $scope = _$rootScope_.$new();
      $timeout = _$timeout_;

      const element = `<search-team-input></search-team-input>`;

      searchTeamInputElement = _$compile_(element)($scope);
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

  describe('actions', () => {
    let input;
    
    beforeEach(() => {
      input = searchTeamInputElement.find('input');
      spyOn(directiveScope, 'searchCompetitions');
    });

    it('should fire searchCompetitions for text longer than four chars', () => {
      const expectedResult = {
        $text: '2017'
      };

      input.val('2017').triggerHandler('input');

      $timeout.flush();

      expect(directiveScope.searchCompetitions).toHaveBeenCalledWith(expectedResult);
    });

    it('should not fire searchCompetitions when search text is shorter than 4 chars', () => {
      input.val('201').triggerHandler('input');

      $timeout.flush();
      expect(directiveScope.searchCompetitions).not.toHaveBeenCalled();
    });

    it('should not fire searchCompetitions until pass 300ms', () => {
      input.val('2017').triggerHandler('input');

      $timeout.flush(100);

      expect(directiveScope.searchCompetitions).not.toHaveBeenCalled();
    });

    it('should fire searchCompetitions after 350ms delay', () => {
      input.val('2017').triggerHandler('input');

      $timeout.flush(350);

      expect(directiveScope.searchCompetitions).toHaveBeenCalled();
    });

    it('should fire searchCompetitions only for distinct value', () => {
      const expectedResult = {
        $text: '2017'
      };

      input.val('2017').triggerHandler('input');
      $timeout.flush(200);
      input.val('2015').triggerHandler('input');
      $timeout.flush(400);
      input.val('2017').triggerHandler('input');

      $timeout.flush(400);

      expect(directiveScope.searchCompetitions).toHaveBeenCalledWith(expectedResult);
      expect(directiveScope.searchCompetitions.calls.count()).toBe(2);
    });

  });

});