import GreetingDirective from './greeting.directive.js';
import GreetingCtrl from './greeting.controller.js';

const greetingModule = angular
    .module('webDev.greeting',['webDev.services'])
    .controller('GreetingCtrl', GreetingCtrl)
    .directive('greeting', () => new GreetingDirective());

export default greetingModule;