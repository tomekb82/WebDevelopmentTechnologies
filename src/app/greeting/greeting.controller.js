class GreetingCtrl {
	/*@ngInject*/
	constructor($http, $scope, $timeout) {
		angular.extend(this, {
			$http, 
			$scope, 
			$timeout
		});

		this.$scope.$on('externalGreeting', (event, greeting) => {
    		this.$scope.message = greeting;
   		});

   		this.$scope.$on('greeting', (event, greetName) => {
    		this.$scope.name2 = greetName;
   		});
	}

	sayHello() {
    	this.$http.post('/greeting', {name: this.$scope.name})
        	.then((response) => {
            	var json = response.data;
                this.$scope.message = json.greeting;
    		});
    };
     
    sayGoodbye() {
    	this.$timeout(() => {
        	this.$scope.message = 'Goodbye ' + this.$scope.name + '!';
        }, 100);
    };
    
    publish(){
    	this.$scope.$emit('greeting', this.$scope.name);
    };

}

export default GreetingCtrl;

/*
function ($http, $scope, $timeout) {
          this.sayHello = function () {
            $http.post('/greeting', {name: $scope.name})
              .then(function (response) {
                var json = response.data;
                $scope.message = json.greeting;
              });
          };
          this.sayGoodbye = function () {
            $timeout(function () {
              $scope.message = 'Goodbye ' + $scope.name + '!';
            }, 100);
          };
          this.publish = function() {
            $scope.$emit('greeting', $scope.name);
          };

          $scope.$on('externalGreeting', function(event, greeting) {
            $scope.message = greeting;
          })
        }
        */