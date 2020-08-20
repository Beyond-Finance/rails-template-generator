global.$ = require('jquery');
import mountTemplateForm from 'ui/mount_template_form';

const PROMPT = 'Enter an application name';

describe('template form', () => {
  let $appName, $output;
  beforeEach(() => {
    document.body.innerHTML = '<form>' +
                                '<input id="app_name" />' +
                                '<input id="display_name" />' +
                                '<input id="cc_test_reporter_id" />' +
                                '<input id="db" type="checkbox" value="postgresql" checked="checked" />' +
                                '<input id="ui" type="checkbox" value="webpacker" checked="checked" />' +
                                '<input id="mailer" type="checkbox" value="action mailer" checked="checked" />' +
                                '<input id="action_cable" type="checkbox" value="action cable" />' +
                                '<output id="rails-new" data-url="http://example.com/:attrs" />' +
                              '</form>';

    $appName = $('input#app_name');
    $output = $('output#rails-new');

    mountTemplateForm();
  });

  const decodedAttrs = () => JSON.parse(atob($output.text().match(/example\.com\/[a-zA-Z0-9\+\/\=]+/)[0].replace(/^example\.com\//, '')));
  const inputText = ($inp, text) => $inp.val(text).trigger('change');

  const sharedExamples = {
    noAppName: () => {
      expect($output.text()).toBe(PROMPT);
      expect($output.attr('class')).toContain('is-invalid');
    },
  };

  test('initial app name not entered', sharedExamples.noAppName);

  test('enter blank app name', () => {
    inputText($appName, '    ');
    sharedExamples.noAppName();
  });

  test('delete app name', () => {
    inputText($appName, 'test-app');
    expect($output.text()).not.toBe(PROMPT);

    inputText($appName, '');
    sharedExamples.noAppName();
  });

  test('derived display name', () => {
    inputText($appName, 'test-app');
    expect(decodedAttrs().displayName).toBe('Test App');
  });

  test('explicit display name', () => {
    const customName = 'A Custom App Name';
    const $displayName = $('input#display_name');
    inputText($appName, 'test-app');
    inputText($displayName, customName);

    expect(decodedAttrs().displayName).toBe(customName);
  });

  test('add CC_TEST_REPORTER_ID', () => {
    const ccId = 'CIRCLECITESTID';
    const $ccTestReporterId = $('input#cc_test_reporter_id');
    inputText($appName, 'test-app');
    inputText($ccTestReporterId, ccId);

    expect(decodedAttrs().ccTestReporterId).toBe(ccId);
  });

  test('toggle db', () => {
    const $db = $('input#db');
    inputText($appName, 'test-app');

    expect($db.is(':checked')).toBeTruthy();
    expect($output.text()).toContain(' -d postgresql ');
    expect(decodedAttrs().db).toBe('postgresql');

    $db.trigger('click');
    expect($output.text()).not.toContain(' -d postgresql ');
    expect(decodedAttrs().db).toBeFalsy();
  });

  test('toggle ui', () => {
    const $ui = $('input#ui');
    inputText($appName, 'test-app');

    expect($ui.is(':checked')).toBeTruthy();
    expect($output.text()).toContain(' --webpacker --skip-turbolinks ');
    expect(decodedAttrs().ui).toBeTruthy();

    $ui.trigger('click');
    expect($output.text()).not.toContain(' --webpacker --skip-turbolinks ');
    expect(decodedAttrs().ui).toBeFalsy();
  });

  test('toggle action mailer', () => {
    const $mailer = $('input#mailer');
    inputText($appName, 'test-app');

    expect($mailer.is(':checked')).toBeTruthy();
    expect($output.text()).not.toContain(' -M ');

    $mailer.trigger('click');
    expect($output.text()).toContain(' -M ');
  });

  test('toggle action cable', () => {
    const $actionCable = $('input#action_cable');
    inputText($appName, 'test-app');

    expect($actionCable.is(':checked')).toBeFalsy();
    expect($output.text()).toContain(' --skip-action-cable ');

    $actionCable.trigger('click');
    expect($output.text()).not.toContain(' --skip-action-cable ');
  });

  test('click output to select', () => {
    inputText($appName, 'test-app');
    $output.trigger('click');

    expect(document.getSelection().toString()).toBe($output.text());
  });
});
