class ShowDetailsCtrl {
  //@ngInject
  constructor($scope, $q, $stateParams, ShowDetailsService, Notifications) {
    angular.extend(this, {
      $scope,
      $stateParams,
      $q,
      ShowDetailsService,
      Notifications,
      leagueId: $stateParams.id,
      teams:[]
    });
    this.getShow();
  }

  getShow() { 
    
    let promise = !!this.$stateParams.item 
      ? this.$q.when(this.$stateParams.item)
      : this.ShowDetailsService.getTeamsInLeague(this.leagueId);

    promise
      .then( (teams) => { 
        this.teams = teams.teams;
      })
      .catch((error) => {
        this.Notifications.showToastNotification("Status: " + error.status + ", error message: " + error.data.error);
      });
  }
}

//export default ShowDetailsCtrl;

export default {
    name: 'showDetailsComponent',
    config: {
        controller: ShowDetailsCtrl,
        controllerAs: 'showDetails',
        template: require('./show-details.html')
    }
};