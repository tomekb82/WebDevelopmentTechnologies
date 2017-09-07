
import GreetingCtrl from './greeting.controller.js';

class GreetingDirective{

  constructor() {
    angular.extend(this, {
      template: require('./greeting.html'),
      restrict: 'E',
      scope: {
          name: '='
      },  
      controllerAs: 'vm',
      controller: GreetingCtrl,
      link: function (scope, element) {
        element.find('input').on('keydown', function (ev) {
          if (ev.which === 13) {
            scope.vm.sayHello();
          }
        });
      }
    });
  }

}

export default GreetingDirective;

/*
angular.module('greeting-app', [])
    .directive('greeting', function () {
      return {
        template: ['<form ng-submit="vm.sayHello()">',
          '<input class="name" type=text ng-model="name">',
          '<button id="hello" type="submit">Say Hello</button>',
          '<button id="goodbye" ng-click="vm.sayGoodbye()">Say Goodbye</button>',
          '<button id="publisher" ng-click="vm.publish()">Publish</button>',
          '<span class="greeting">{{message}}</span>',
          '<span id="tickle-me" ng-mouseover="tickled = true" ng-mouseleave="tickled = false">{{tickled}}</span>',
          '</form>'].join(),
        scope: {
          name: '='
        },
        controllerAs: 'vm',
        controller: function ($http, $scope, $timeout) {
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
        },
        link: function (scope, element) {
          element.find('input').on('keydown', function (ev) {
            if (ev.which === 13) {
              scope.vm.sayHello();
            }
          });
        }
      };
    });*/