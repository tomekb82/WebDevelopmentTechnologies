import HomeModule from './home.module';

fdescribe('home', () => {
    let server, app, $scope, $state, Notifications;
    let searchService
    const {expectElement, type} = testRunner.actions;

    beforeEach(() => {

        let module = HomeModule.name;

        // wtrzyknięcie zależności jezeli będą potrzebne
        angular.module(module)
            .run((_$rootScope_, _$state_, _SearchService_,_Notifications_) => {
                $scope = _$rootScope_.$new();
                $state = _$state_;
                searchService = _SearchService_;
                Notifications = _Notifications_;
        });

        app = testRunner.app([module, 'templates']);
        server = testRunner.http();
    });

    afterEach(() => {
        server.stop();
    });

    // TODO TB: prosty test ale nie wiem dlaczego (po refaktoringu) przestal mi dzialac
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
