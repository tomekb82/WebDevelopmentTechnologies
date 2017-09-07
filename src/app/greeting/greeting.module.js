import GreetingDirective from './greeting.directive.js';

const greetingModule = angular
    .module('webDev.greeting',[])
    .directive('greeting', () => new GreetingDirective());

export default greetingModule;