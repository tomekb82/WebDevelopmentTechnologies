class HomeCtrl {

    constructor(SearchService) {
        this.test = 'Hello World';

        this.model = '';
        this.year = '';
        this.indicator = 'Saved.';

        angular.extend(this,{ 
            SearchService,
            itemList: [],
            teams:[]
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
            });
    }

    onItemClick(item){
        this.SearchService.searchTeamById(item)
            .then( response => {
                this.teams = response.teams;
            });
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
