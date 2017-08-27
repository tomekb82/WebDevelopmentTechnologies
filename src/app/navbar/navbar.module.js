import NavbarDirective from './navbar.directive.js';

const navbarModule = angular
    .module('eduwebApp.navbar',[])
    .directive('navbar', () => new NavbarDirective());

export default navbarModule;