

/*import SearchServiceModule from './search.service';

fdescribe('search service', () => {
    let server, app;

    beforeEach(() => {
        app = testRunner.app([SearchServiceModule.name]);

        console.log(app.scope);
        server = testRunner.http();
    });

    afterEach(() => {
        server.stop();
    });


    it('should exist', () => {
    	expect(app).toBeDefined();
  	});


});*/


describe('Search service', () => {
  let SearchService;

  beforeEach(() => {
    angular.mock.module('webDev');

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