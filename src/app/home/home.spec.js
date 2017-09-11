import HomeModule from './home.module';

fdescribe('home', () => {
    let server, app, $scope, $q, $state, Notifications, homeCtrl;
    let searchService
    const {expectElement, type, click} = testRunner.actions;

    beforeEach(() => {

        let module = HomeModule.name;

        // wtrzyknięcie zależności jezeli będą potrzebne
        angular.module(module)
            .run((_$rootScope_, _$state_, _SearchService_,_Notifications_, _$controller_, _$q_) => {
                $scope = _$rootScope_.$new();
                $state = _$state_;
                searchService = _SearchService_;
                Notifications = _Notifications_;
                $q = _$q_;

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
      return [{
        show: {
          id: 443,
          title: 'garfield'
        }  
      }];
    }

    // TODO TB: nie wiem jak podpiac sie pod zdarzenie ng-click na liscie elementow li
    // Error: Could not find li:first.items element for click action
    it('err1', () => {
        
        const html = app.runHtml('<home-component></home-component>');
        
        spyOn(searchService, 'search').and.callFake(() => {
            return $q.when(getFakeSearchResult());
        });

        homeCtrl.searchCompetitions('2017');

        expect(searchService.search).toHaveBeenCalledWith('2017');
        expect(searchService.search.calls.count()).toBe(1); 

        let expectedResults = getFakeSearchResult();
    
        console.log("test expected: " + expectedResults[0].show.title);
        console.log('--------------');

        //TODO TB: dlaczego pusta tablica skoro w kontrolerze jest ok?
        console.log(homeCtrl.getItems());
        expect(homeCtrl.itemList[0].show.title).toHaveText(expectedResults[0].show.title);
 
    });

 
    // TODO TB: jak sprawdzic ze zostaly w html utworzone 2 elementy li - czy to jest ok ?
    it('err2', () => {
        
        const html = app.runHtml('<home-component></home-component>');
        
        spyOn(searchService, 'search').and.callFake(() => {
            return $q.when(getFakeSearchResult());
        });
        spyOn(Notifications, 'showToastNotification');

        homeCtrl.searchCompetitions('2017');

        html.perform(
            click.in('li')
        );

        expect(Notifications.showToastNotification)
            .toHaveBeenCalledWith('Something goes wrong, try again later');  
    });

    it('err3', () => {
        
        const html = app.runHtml('<home-component></home-component>');
    
        // TODO TB: jak utworzyc spy z przekazaniem obiektu do onItemClick(item) w liscie
        spyOn(homeCtrl, 'onItemClick');
        //homeCtrl.onItemClick({});
        spyOn($state, 'go');
        //$state()

        homeCtrl.searchCompetitions('2017');

        html.perform(
            click.in('li')
        );

        expect($state.go)
            .toHaveBeenCalled();  
    });





});
