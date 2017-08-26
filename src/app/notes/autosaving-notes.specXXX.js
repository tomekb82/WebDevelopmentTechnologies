import NotesModule from './autosaving-notes.component';

fdescribe('autosaving notes', () => {
    let server, app;
    const {expectElement, type} = testRunner.actions;

    beforeEach(() => {
        app = testRunner.app([NotesModule.name]);
        server = testRunner.http();
    });

    afterEach(() => {
        server.stop();
    });

    it('show "Not saved" indicator when saving on server failed', () => {
        server = testRunner.http({respondImmediately: true});
        const html = app.runHtml('<autosaving-notes></autosaving-notes>');
        server.put('/my/endpoint', req => req.sendStatus(500));

        html.perform(
            type('My notes').in('.autosaving-notes__textarea'),
            server.respond
        );

        html.verify(
            expectElement('.autosaving-notes-header__indicator').toHaveText('Not saved.')
        );
    });

    it('show Saving indicator while saving on server in progress', () => {
        server = testRunner.http({respondImmediately: false});
        const html = app.runHtml('<autosaving-notes></autosaving-notes>');
        server.put('/my/endpoint', req => req.sendStatus(200));

        html.perform(
            type('My notes').in('.autosaving-notes__textarea')
        );

        html.verify(
            expectElement('.autosaving-notes-header__indicator').toHaveText('Saving...')
        );
    });

    it('show saved indicator after saving on server', () => {
        const html = app.runHtml('<autosaving-notes></autosaving-notes>');
        server.put('/my/endpoint', req => req.sendStatus(200));

        html.perform(
            type('My notes').in('.autosaving-notes__textarea')
        );

        html.verify(
            expectElement('.autosaving-notes-header__indicator').toHaveText('Saved.')
        );
    });

    it('save on server after typing', () => {
        const html = app.runHtml('<autosaving-notes></autosaving-notes>');
        let body;
        server.put('/my/endpoint', req => {
            body = req.body();
            req.sendStatus(200);
        });

        html.perform(
            type('Moja notatka').in('.autosaving-notes__textarea')
        );

        expect(body).toEqual({notes: 'Moja notatka'});
    });

    it('decrease number of chars < 0', () => {
        const html = app.runHtml('<autosaving-notes></autosaving-notes>');

        html.perform(
            type('01234567890123456789012345678901234567890123456789XXXXX').in('.autosaving-notes__textarea')
        );

        html.verify(
            expectElement('.autosaving-notes__textarea').toHaveValue('01234567890123456789012345678901234567890123456789'),
            expectElement('.autosaving-notes-header__counter').toHaveText('0')
        );
    });

    it('decrease number of chars while typing', () => {
        const html = app.runHtml('<autosaving-notes></autosaving-notes>');

        html.perform(
            type('Moja notatka').in('.autosaving-notes__textarea')
        );

        html.verify(
            expectElement('.autosaving-notes__textarea').toHaveValue('Moja notatka'),
            expectElement('.autosaving-notes-header__counter').toHaveText('38')
        );
    });


    it('initially we have 1000 characters', () => {
        const html = app.runHtml('<autosaving-notes></autosaving-notes>');

        html.verify(
            expectElement('.autosaving-notes-header__counter').toHaveText('50')
        );

    });


});