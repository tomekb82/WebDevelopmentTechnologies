import ShowDetails from './show-details.module';

fdescribe('Search-details service', () => {
  let server, app, $scope, $q, $state, stateparams, Notifications, showDetailsCtrl;
  let ShowDetailsService;
  let item = {id:'123', name: 'test'};

  const {expectElement, type, click} = testRunner.actions;

  beforeEach(() => {
  
    let module = ShowDetails.name;

    // wtrzyknięcie zależności jezeli będą potrzebne
    angular.module(module)
      .run((_$rootScope_, _$state_, _ShowDetailsService_,_Notifications_, _$controller_, _$q_) => {
        $scope = _$rootScope_.$new();
        $state = _$state_;
        stateparams = { id: item.id };
        ShowDetailsService = _ShowDetailsService_;
        Notifications = _Notifications_;
        $q = _$q_;

        showDetailsCtrl = _$controller_('ShowDetailsCtrl', {
          $scope,
          $q,
          $stateParams:stateparams,
          ShowDetailsService,
          Notifications
        });
    });

    app = testRunner.app([module, 'templates']);
    server = testRunner.http();

  });

  afterEach(() => {
    server.stop();
  });

  function getFakeSearchResult() {
      return {
         teams: [{
          crestUrl: 'ddd',
          name: 'polska liga',
          code: 'PL'
          },
          {crestUrl: 'ee',
          name: 'and liga',
          code: 'ANG'
          }
         ]

      };
    }

  it('err4', () => {

    const html = app.runHtml('<showDetails-component></showDetails-component>');

    spyOn(ShowDetailsService, 'getTeamsInLeague').and.callFake(() => {
          return $q.when(getFakeSearchResult());
    });

    let expectedResults = getFakeSearchResult();

    showDetailsCtrl.getShow();
    // TODO TB: czy da sie bez apply(), aby nie trzeba bylo pamietac ?
    //$scope.$apply(); 

    expect(ShowDetailsService.getTeamsInLeague).toHaveBeenCalledWith(stateparams.id); 
    expect(ShowDetailsService.getTeamsInLeague.calls.count()).toBe(1); 
    // TODO TB: dlaczego tablica teams nie zawiera fakeowych danych skoro w kontrolerze sa ustawiane 
    expect(showDetailsCtrl.teams).toEqual(expectedResults.teams);
    
  });

 

});

