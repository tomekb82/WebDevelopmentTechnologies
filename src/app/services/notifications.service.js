class Notifications {
  // @ngInject
  constructor($mdToast) {
    angular.extend(this, {
      $mdToast
    });
  }
  
  showToastNotification(msg) {
    if (!msg) {
      throw Error('msg argument is required');
    }

    if (!angular.isString(msg)) {
      throw Error('msg arg should be string');
    }
    
    const simpleToast = this.$mdToast.simple({
      position: 'top right',
      content: msg
    });

    this.$mdToast.show(simpleToast);
  }
}

export default angular.module('webDev.services', ['ngMaterial'])
  .service('Notifications', Notifications);