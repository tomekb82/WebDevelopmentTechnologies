fdescribe('greeting directive', () => {

	let server, app;
  	const type = testRunner.actions.type;
  	const click = testRunner.actions.click;
  	const expectElement = testRunner.actions.expectElement;
  	const keydown = testRunner.actions.keydown;
  	const wait = testRunner.actions.wait;
  	const mouseover = testRunner.actions.mouseover;
  	const mouseleave = testRunner.actions.mouseleave;
  	const listenTo = testRunner.actions.listenTo;
  	const publishEvent = testRunner.actions.publishEvent;


	beforeEach(function () {
    	app = testRunner.app(['webDev.greeting']);
    	server = testRunner.http();
  	});

  	afterEach(function () {
    	server.stop();
  	});

  	beforeEach(function () {
    	server.post('/greeting', function (req) {

      		var body = req.body();

      		req.sendJson({
        		greeting: 'Hello ' + body.name + '!'
      		});
    	});
  	});

  	it('populates name with default value', function () {

    	// given:
    	var html = app.runHtml('<greeting name="defaultName"/>', {defaultName: 'Tomek'});

    	// then:
    	html.verify(
      		expectElement('input.name').toHaveValue('Tomek')
    	);
  	});

  	it('greets person', function () {

    	// given:
    	var html = app.runHtml('<greeting name="defaultName"/>', {defaultName: 'John'});

    	// when:
    	html.perform(
      		type('Jane').in('input.name'),
      		click.in('button#hello')
    	);

    	// then:
    	html.verify(
      		expectElement('.greeting').toContainText('Hello Jane!')
    	);

  	});


 	it('greets person on enter', function () {
    	// given:
    	var html = app.runHtml('<greeting name="defaultName"/>', {defaultName: 'John'});

    	// when:
    	html.perform(
      		type('Jane').in('input.name'),
      		keydown(13).in('input.name')
    	);

    	// then:
    	html.verify(
      		expectElement('.greeting').toContainText('Hello Jane!')
    	);

  	});

  	it('says goodbye async', function (done) {

    	// given:
    	var html = app.runHtml('<greeting name="defaultName"/>', {defaultName: 'John'});

    	// when:
    	html.perform(
      		click.in('button#goodbye')
    	);

    	// then:
    	html.verify(
      		wait(200),
      		expectElement('.greeting').toContainText('Goodbye John!'),
      		done
    	);

  	});


  	it('says goodbye async (fluent version)', function (done) {

    	// given:
    	var html = app.runHtml('<greeting name="defaultName"/>', {defaultName: 'John'});

    	// when:
    	html.perform(
      		click.in('button#goodbye'),
      		click.in('button#hello').after(200)
    	);

    	// then:
    	html.verify(
      		expectElement('.greeting').toContainText('Hello John!'),
      		done
    	);

  	});


  	it('triggers mouseover and mouseleave', function () {

    	var html = app.runHtml('<greeting/>', {});

    	html.perform(mouseover.in('#tickle-me'));
    	html.verify(expectElement('#tickle-me').toContainText('true'));

    	html.perform(mouseleave.in('#tickle-me'));
    	html.verify(expectElement('#tickle-me').toContainText('false'));

  	});


  	it('listens for events', function () {
    	var greeted;
    	
    	// given:
    	var html = app.runHtml('<greeting name="defaultName"/>', {defaultName: 'John'});

    	// when:
    	html.perform(
      		listenTo('greeting', function (data) {
        		greeted = data;
      		}),
      		click.in('#publisher')
    	);

    	// then:
    	expect(greeted).toEqual('John');
    	html.verify(
    		expectElement('.name2').toHaveText('John')
    	);
  	});

  	it('allows event publishing', function () {

    	// given:
    	var html = app.runHtml('<greeting/>', {});

    	// when:
   	 	html.perform(
      		publishEvent('externalGreeting', 'Hello, Jimmy!')
    	);

    	// then:
    	html.verify(
      		expectElement('.greeting').toContainText('Hello, Jimmy!')
    	);
  	});



});