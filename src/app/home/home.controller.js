class HomeCtrl {

    /*@ngInject*/
    constructor($state, $scope, SearchService, Notifications) {
       
        angular.extend(this,{ 
            $state,
            $scope,
            SearchService,
            Notifications,
            
            itemList: [{test:'testowa wartosc'}],
            teams:[],
            title:'Search',
            model:'',
            year:'',
            indicator:'Saved.'
        });
    }

    counter() {
        return 1000 - this.model.length;
    }

    save() {
        this.indicator = 'Saving...';
        $http.put('/my/endpoint', {notes: this.model})
            .then(() => this.indicator = 'Saved.')
            .catch(() => this.indicator = 'Not saved.');
    };

    searchCompetitions(year){
        if(!year) {
            this.Notifications.showToastNotification('Something goes wrong, try again later');
        }
        this.SearchService.search(year)
            .then( response => {
                this.itemList =  response.map((item) => item);
            })
            .catch(() => {
                this.Notifications.showToastNotification('Server error occured, try again later');
            });
    }

    getItems(){
        return this.itemList;
    }

    onItemClick(item){
        console.log(item);
        //this.SearchService.searchTeamById(item.id)
         //   .then( response => {
          //      this.teams = response.teams;
          //  })
          //  .catch(error => console.log(error));

        if(!angular.isObject(item) || !item.id) {
            this.Notifications.showToastNotification('Something goes wrong, try again later');
        } else {
            this.$state.go('showDetails', {item, id: item.id});
        }    
    }
}


export default {
    name: 'homeComponent',
    config: {
        controller: HomeCtrl,
        controllerAs: 'ctrl',
        template: require('./home.html')
        //template: '<div ng-bind="ctrl.title" class="test-subject" ></div>'
    }
};
