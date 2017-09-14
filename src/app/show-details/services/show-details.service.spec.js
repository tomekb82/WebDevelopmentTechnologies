
fdescribe('Search-details service', () => {
  let ShowDetailsService;

  beforeEach(() => {
  
    angular.mock.module('webDev.showDetails.services');

    angular.mock.inject((_ShowDetailsService_) => {
      ShowDetailsService = _ShowDetailsService_;
    });

  });

  it('should exist', () => {
    expect(ShowDetailsService).toBeDefined();
  });

  it('should expose getTeamsInLeague method', () => {
    expect(angular.isFunction(ShowDetailsService.getTeamsInLeague)).toBe(true);
  });

  it('should throw exception if team id arg is empty', () => {
    const methodWithoutParams = ShowDetailsService.getTeamsInLeague.bind(ShowDetailsService);

    expect(methodWithoutParams).toThrowError('league id is required');
  });

});

