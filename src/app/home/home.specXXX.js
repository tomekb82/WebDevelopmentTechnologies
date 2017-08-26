import HomeModule from './home.module';

fdescribe('home', () => {
    let server, app;
    const {expectElement, type} = testRunner.actions;

    beforeEach(() => {
        app = testRunner.app([HomeModule.name, 'templates']);
        server = testRunner.http();
    });

    afterEach(() => {
        server.stop();
    });


    it('initially we have 1000 characters', () => {
        const html = app.runHtml('<home-component></home-component>');

        html.verify(
            expectElement('.test-subject').toHaveText('Hello World')
        )

    });


});
