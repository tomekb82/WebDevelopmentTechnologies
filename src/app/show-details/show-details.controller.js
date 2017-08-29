class ShowDetailsCtrl {
  //@ngInject
  constructor($q, $stateParams, ShowDetailsService) {
    angular.extend(this, {
      $stateParams,
      $q,
      ShowDetailsService,
      teamId: $stateParams.id
    });
    this.getShow();
  }

  getShow() { 
    let promise = !!this.$stateParams.item 
      ? this.$q.when(this.$stateParams.item)
      : this.ShowDetailsService.getShowDetailsById(this.teamId);

    promise
      .then( (team) => this.team = team);

  }
}

export default ShowDetailsCtrl;