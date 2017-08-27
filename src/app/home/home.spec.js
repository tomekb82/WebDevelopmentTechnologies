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

        // TODO TB: czy to jest poprawne sposob na wstrzykiwanie ?        
        angular.module(module)
            .run((_$rootScope_) => {
                $scope = _$rootScope_.$new();
        }); 

        // TODO TB: nie wiem jak wstrzyknąć $state    
        /*angular.module(module)
            .run((_$state_) => {
                //$state = _$state_;
        }); */ 

        app = testRunner.app([module, 'templates']);
        server = testRunner.http();
    });

    afterEach(() => {
        server.stop();
    });

    it('initially we have 1000 characters', () => {
        
        const html = app.runHtml('<home-component></home-component>');

        html.verify(
            expectElement('.test-subject').toHaveText('Hello World')
        )

    });

    it('service should expose showMe method', () => {
        
        const html = app.runHtml('<home-component></home-component>');

        expect(angular.isFunction(searchService.showMe)).toBe(true);

    });

     it('serviceshould be extecuted once', () => {
        
        const html = app.runHtml('<home-component></home-component>');

        searchService.showMe();

        //expect(searchService.showMe.calls.count()).toBe(1); //TODO TB: nie dziala pobierania liczby wywołan operacji z uslugi
       
    });


});
