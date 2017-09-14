

fdescribe('Search service', () => {
  let SearchService, apiUrl;

  beforeEach(() => {
    angular.mock.module('webDev.home.services');

    angular.mock.inject((_SearchService_) => {
      SearchService = _SearchService_;
    });
  });

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

});

