fdescribe('home ctrl', () => {

	let $state, $scope, $q, SearchService, homeCtrl, Notifications;

  	beforeEach(() => {
		
      angular.mock.module('webDev');

    	angular.mock.module(($provide) => {
      		$provide.service('$state', function () {
        		this.go = jasmine.createSpy('go');
      		});

      		$provide.service('SearchService', function () {
        		this.search = jasmine.createSpy('search').and.callFake(() => {
          			return $q.when(getFakeSearchResult());
        		});
        		//this.searchTeamById = jasmine.createSpy('searchTeamById').and.callFake(() => {
          		//	return $q.when(getFakeSearchResult());
        		//});
      		});

          $provide.service('Notifications', function () {
            this.showToastNotification = jasmine.createSpy('showToastNotification');
          });
    	});

    	angular.mock.inject((_$controller_, _$q_, _$rootScope_, _$state_, _SearchService_, _Notifications_) => {
    		  $scope =  _$rootScope_.$new();
      		$state = _$state_;
      		SearchService = _SearchService_;
          Notifications = _Notifications_;
      		$q = _$q_;

      		homeCtrl = _$controller_('HomeCtrl', {
        		$state,
        		$scope,
        		SearchService,
            Notifications
      		});
    	});
    });

    function getFakeSearchResult() {
      return [{
        show: {
          id: 443,
          title: 'garfield'
        }  
      }];
    }

    it('should exist', () => {
    	expect(homeCtrl).toBeDefined();
  	});

  	it('should expose year property', () => {
    	expect(homeCtrl.year).toBeDefined();
  	});

  	it('should expose itemList array', () => {
    	expect(angular.isArray(homeCtrl.itemList)).toBeDefined();
  	});

  	it('should expose teams array', () => {
    	expect(angular.isArray(homeCtrl.teams)).toBeDefined();
  	});

  	it('should expose searchCompetitions method', () => {
    	expect(angular.isFunction(homeCtrl.searchCompetitions)).toBe(true);
  	});

  	it('should expose onItemClick method', () => {
    	expect(angular.isFunction(homeCtrl.onItemClick)).toBe(true);
  	});

	  it('should navigate to showDetails on item click', () => {
    	const fakeItem = {
      		id: 34,
      		name: 'LEGIA'
    	};

    	const expectedParams = {
      		item: fakeItem,
      		id: fakeItem.id
    	};

    	homeCtrl.onItemClick(fakeItem);

    	expect($state.go).toHaveBeenCalledWith('showDetails', expectedParams);
  	});

    it('should get errrom from server on empty text', () => {
      homeCtrl.searchCompetitions();

      expect(SearchService.search).not.toHaveBeenCalledWith('2017');
    });

  	it('should get shows from server on search text change', () => {
    	homeCtrl.searchCompetitions('2017');

    	expect(SearchService.search).toHaveBeenCalledWith('2017');
  	});


    it('should display error notification when search year is not correct', () => {
      
      homeCtrl.searchCompetitions();

      expect(Notifications.showToastNotification)
        .toHaveBeenCalledWith('Something goes wrong, try again later');

    });
        
    it('should display error notification when navigation item is not correct', () => {
      
      homeCtrl.onItemClick();

      expect(Notifications.showToastNotification)
        .toHaveBeenCalledWith('Something goes wrong, try again later');

      Notifications.showToastNotification.calls.reset();

      homeCtrl.onItemClick({});

      expect(Notifications.showToastNotification)
        .toHaveBeenCalledWith('Something goes wrong, try again later');
    });

    it('should assign items to itemList on search', () => {
      homeCtrl.searchCompetitions('2017');
      $scope.$apply();

      const expectedResults = getFakeSearchResult().map(item => item);
    
      expect(homeCtrl.itemList).toEqual(expectedResults);
  
    });

    it('should show notification on server error', () => {
      SearchService.search.and.callFake(() => {
        return $q.reject();
      });

      homeCtrl.searchCompetitions('2017');
      $scope.$apply();

      expect(Notifications.showToastNotification)
        .toHaveBeenCalledWith('Server error occured, try again later');
    });

  it('should not modify itemList on server error', () => {
    SearchService.search.and.callFake(() => {
      return $q.reject();
    });

    const listBeforeSearch = angular.copy(homeCtrl.itemList);

    homeCtrl.searchCompetitions('2017');
    $scope.$apply();

    expect(homeCtrl.itemList).toEqual(listBeforeSearch);
  });

});