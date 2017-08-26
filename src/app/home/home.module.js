//require('./home.scss');

import HomeComponent from './home.controller';

const HomeModule = angular
    .module('webDev.home', [])
    .component(HomeComponent.name, HomeComponent.config);

export default HomeModule;
