
fdescribe('Search service', () => {
  let SearchService;

  beforeEach(() => {
    angular.mock.module('webDev.home.services');

    angular.mock.inject((_SearchService_) => {
      SearchService = _SearchService_;
    });
  });

  // TODO TB: dostaje blad 'Error: [$injector:unpr] Unknown provider: apiUrlProvider <- apiUrl <- SearchService'
  // i nie wiem po co mam wstrzykiwac cos co jest tylko parametrem konstruktora a nie providerem;)
  it('should exist', () => {
    expect(SearchService).toBeDefined();
  });

  it('should expose search method', () => {
    expect(angular.isFunction(SearchService.search)).toBe(true);
  });

  it('should throw exception if year arg is empty', () => {
    const methodWithoutParams = SearchService.search.bind(SearchService);

    expect(methodWithoutParams).toThrowError('year argument is required');
  });

  it('should expose searchTeamById method', () => {
    expect(angular.isFunction(SearchService.searchTeamById)).toBe(true);
  });

  it('should throw exception if team arg is empty', () => {
    const methodWithoutParams = SearchService.searchTeamById.bind(SearchService);

    expect(methodWithoutParams).toThrowError('team argument is required');
  });
});

