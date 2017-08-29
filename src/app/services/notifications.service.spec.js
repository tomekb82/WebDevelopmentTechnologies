fdescribe('Notifications service', () => {
  let Notifications, $mdToast;

  beforeEach(() => {
    angular.mock.module('webDev');

    angular.mock.inject((_Notifications_, _$mdToast_) => {
      Notifications = _Notifications_;
      $mdToast = _$mdToast_;
    });
  });

  it('should exist', () => {
    expect(Notifications).toBeDefined();
  });

 it('should expose showToastNotification method', () => {
    expect(angular.isFunction(Notifications.showToastNotification)).toBe(true);
  });

  it('should throw exception if msg arg is empty', () => {
    const methodWithoutParams = Notifications.showToastNotification.bind(Notifications);

    expect(methodWithoutParams).toThrowError('msg argument is required');
  });

  it('should throw exception if msg is not string', () => {
    const methodWitInvalidParam = Notifications.showToastNotification
      .bind(Notifications, { msg: 'hello' });

    expect(methodWitInvalidParam).toThrowError('msg arg should be string');
  });

  it('should show simple mdMaterial toast with correct config', () => {

    const msg = 'Hello world!';
    const expectedConfig = {
      position: 'top right',
      content: msg
    };
    
    spyOn($mdToast, 'simple').and.returnValue(expectedConfig);
    spyOn($mdToast, 'show');

    Notifications.showToastNotification(msg);

    expect($mdToast.simple).toHaveBeenCalledWith(expectedConfig);

    expect($mdToast.show).toHaveBeenCalledWith(expectedConfig);
  });


});