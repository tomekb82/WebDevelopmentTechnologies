import HomeModule from './home.module';

fdescribe('home', () => {
    let server, app, $scope, $state, Notifications, homeCtrl;
    let searchService
    const {expectElement, type, click} = testRunner.actions;

    beforeEach(() => {

        let module = HomeModule.name;

        // wtrzyknięcie zależności jezeli będą potrzebne
        angular.module(module)
            .run((_$rootScope_, _$state_, _SearchService_,_Notifications_, _$controller_) => {
                $scope = _$rootScope_.$new();
                $state = _$state_;
                searchService = _SearchService_;
                Notifications = _Notifications_;

                homeCtrl = _$controller_('HomeCtrl', {
                    $state,
                    $scope,
                    searchService,
                    Notifications
                });
        });

        app = testRunner.app([module, 'templates']);
        server = testRunner.http();
    });

    afterEach(() => {
        server.stop();
    });

    it('text in home component should have default value:"Search" ', () => {
        
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

    function getFakeSearchResult() {
      return [
      {
        league: 443,
        caption: 'garfield'
      },
      {
        league: 444,
        caption: 'garfield'
      }];
    }

    // TODO TB: nie wiem jak podpiac sie pod zdarzenie ng-click na liscie elementow li
    // Error: Could not find li:first.items element for click action
    it('err1', () => {
        
        const html = app.runHtml('<home-component></home-component>');
        
        spyOn(Notifications, 'showToastNotification');

        homeCtrl.itemList = getFakeSearchResult();

        html.perform(
            click.in('li:first.items')
        );

        expect(Notifications.showToastNotification)
            .toHaveBeenCalledWith('Something goes wrong, try again later');   
    });

    // TODO TB: jak sprawdzic ze zostaly w html utworzone 2 elementy li
    it('err2', () => {
        
        const html = app.runHtml('<home-component></home-component>');
        
        homeCtrl.itemList = getFakeSearchResult();

        html.verify(
            expectElement('ul li.items').toHaveText('garfield')
        )

    });





});
