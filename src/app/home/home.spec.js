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
          caption: 'polska liga',
          league: 'PL'
      }];
    }

    it('err1', () => {
            
        const html = app.runHtml('<home-component></home-component>');
        
        spyOn(searchService, 'search').and.callFake(() => {
            return $q.when(getFakeSearchResult());
        });

        let expectedResults = getFakeSearchResult();

        homeCtrl.searchCompetitions('2017');
        // TODO TB: czy da sie bez apply(), aby nie trzeba bylo pamietac ?
        //$scope.$apply(); 

        expect(searchService.search).toHaveBeenCalledWith('2017');
        expect(searchService.search.calls.count()).toBe(1); 
        expect(homeCtrl.itemList).toEqual(expectedResults);
    });

    it('err2', () => {
        
        const html = app.runHtml('<home-component></home-component>');
        
        spyOn(Notifications, 'showToastNotification');

        spyOn(searchService, 'search').and.callFake(() => {
            return $q.when(getFakeSearchResult());
        });

        let expectedResults = getFakeSearchResult();

        homeCtrl.searchCompetitions('2017');
        $scope.$apply(); // TODO TB: czy potrzebne ? 

        expect(homeCtrl.itemList).toEqual(expectedResults);

        // TODO TB: nie znajduje elementow li ?
        html.perform(
            click.in('li')
        );

        expect(Notifications.showToastNotification)
            .toHaveBeenCalledWith('Something goes wrong, try again later');  
    });

    it('err3', () => {
        
        const html = app.runHtml('<home-component></home-component>');
    
        spyOn(searchService, 'search').and.callFake(() => {
            return $q.when(getFakeSearchResult());
        });

        let expectedResults = getFakeSearchResult();

        homeCtrl.searchCompetitions('2017');
        $scope.$apply(); // TODO TB: czy potrzebne ? 

        expect(homeCtrl.itemList).toEqual(expectedResults);

        console.log(homeCtrl.itemList);
    
        html.verify(
            // TODO TB: jak sprawdzic ze obiekty zostaly dodane do htmla
            expectElement('.items').toHaveText('PL') 
        );

        // TODO TB: jak sprawdzic ze na stronie zostalo utworzonych 
        // n-elementow li (tyle ile obiektow w liscie) ?

        // TODO TB: jak przetestowac ze po kliknieciu zostala zawolana metoda homeCtrl.onImteClick() a nastepnie $state.go()
        html.perform(
            click.in('li')
        );
        expect($state.go).toHaveBeenCalled(); 

    });

});
