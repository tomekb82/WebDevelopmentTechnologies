import HomeModule from './home.module';

fdescribe('home', () => {
    let server, app, $scope, $state;
    let searchService
    const {expectElement, type} = testRunner.actions;

    beforeEach(() => {

        let module = HomeModule.name;

        angular.module(module)
            .run((_SearchService_) => {
                searchService = _SearchService_;
        });

        app = testRunner.app([module, 'templates']);
        server = testRunner.http();
    });

    afterEach(() => {
        server.stop();
    });

    it('initially we have 1000 characters', () => {
        
        const html = app.runHtml('<home-component></home-component>');

        html.verify(
            expectElement('.test-subject').toHaveText('Search')
        )

    });

    it('service should expose showMe method', () => {
        
        const html = app.runHtml('<home-component></home-component>');

        expect(angular.isFunction(searchService.showMe)).toBe(true);

    });

     it('serviceshould be extecuted once', () => {
        
        const html = app.runHtml('<home-component></home-component>');

        spyOn(searchService, 'showMe');  // wymaganay jezeli chcemy uzywac calls()
        searchService.showMe();

        expect(searchService.showMe.calls.count()).toBe(1); 
       
    });


});
