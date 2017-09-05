
fdescribe('search team input', () => {

  let $scope, searchTeamInputElement, directiveScope, $timeout, app;
  const {expectElement, type} = testRunner.actions;

  beforeEach(() => {

    app = testRunner.app(['webDev', 'templates']);

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
  
  it('TODO', () => {
    const html = app.runHtml('<search-team-input></search-team-input>');
  
    html.perform(
      type('2017').in('.year')
    );

    $timeout.flush(350);
    //spyOn(directiveScope, 'onSearchChange');

    //$timeout.flush();
    
    html.verify(
      expectElement('.year').toHaveText('2017')
      //expect(directiveScope.onSearchChange).toHaveBeenCalledWith(expectedResult)
      //expectElement('.autosaving-notes__textarea').toHaveValue('01234567890123456789012345678901234567890123456789')
    );

  });

  it('should expose onSearchChange method', () => {
    expect(angular.isFunction(directiveScope.onSearchChange)).toBe(true);
  });

  describe('actions', () => {
    let input;
    
    beforeEach(() => {
      input = searchTeamInputElement.find('input');
      spyOn(directiveScope, 'onSearchChange');
    });

    it('should fire onSearchChange for text longer than four chars', () => {
      const expectedResult = {
        $text: '2017'
      };

      input.val('2017').triggerHandler('input');

      $timeout.flush();

      expect(directiveScope.onSearchChange).toHaveBeenCalledWith(expectedResult);
    });

    it('should not fire onSearchChange when search text is shorter than 4 chars', () => {
      input.val('201').triggerHandler('input');

      $timeout.flush();
      expect(directiveScope.onSearchChange).not.toHaveBeenCalled();
    });

    it('should not fire onSearchChange until pass 300ms', () => {
      input.val('2017').triggerHandler('input');

      $timeout.flush(100);

      expect(directiveScope.onSearchChange).not.toHaveBeenCalled();
    });

    it('should fire onSearchChange after 350ms delay', () => {
      input.val('2017').triggerHandler('input');

      $timeout.flush(350);

      expect(directiveScope.onSearchChange).toHaveBeenCalled();
    });

    it('should fire onSearchChange only for distinct value', () => {
      const expectedResult = {
        $text: '2017'
      };

      input.val('2017').triggerHandler('input');
      $timeout.flush(200);
      input.val('2015').triggerHandler('input');
      $timeout.flush(400);
      input.val('2017').triggerHandler('input');

      $timeout.flush(400);

      expect(directiveScope.onSearchChange).toHaveBeenCalledWith(expectedResult);
      expect(directiveScope.onSearchChange.calls.count()).toBe(2);
    });

  });

});