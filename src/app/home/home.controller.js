class HomeCtrl {

    /*@ngInject*/
    constructor($state, $scope, SearchService) {
       
        angular.extend(this,{ 
            $state,
            $scope,
            SearchService,
            itemList: [],
            teams:[],
            test:'Hello World',
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

    searchCompetitions(){
        this.SearchService.search(this.year)
            .then( response => {
                this.itemList = response.map((item) => item/*.caption*/);
            })
            .catch(error => console.log(error));
    }

    onItemClick(item){
        /*this.SearchService.searchTeamById(item.id)
            .then( response => {
                this.teams = response.teams;
            })
            .catch(error => console.log(error));*/


        if(!angular.isObject(item) || !item.id) {
            console.log("blad");
            //this.Notifications.showToastNotification('Something goes wrong, try again later');
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
        templateUrl: 'home/home.html', // or:
        // template: '<div class="test-subject" ng-bind="ctrl.test"></div>'
    }
};
