global.$ = require('jquery');
import mountTemplateForm from 'ui/mount_template_form';

const APP_PROMPT = 'Enter an application name';

describe('template form', () => {
  let $appName, $output, $pluginName, $typeSelect;
  beforeEach(() => {
    document.body.innerHTML = '<form>' +
                                '<div class="application show-a"></div>' +
                                '<div class="application mountable show-a-m"></div>' +
                                '<div class="mountable show-m"></div>' +
                                '<div class="mountable plugin show-m-p"/></div>' +
                                '<div class="plugin show-p"></div>' +
                                '<select id="type">' +
                                  '<option selected="selected" value="application" />' +
                                  '<option value="mountable" />' +
                                  '<option value="plugin" />' +
                                '</select>' + 
                                '<input id="app_name" />' +
                                '<input id="plugin_name" />' +
                                '<input id="display_name" />' +
                                '<input id="cc_test_reporter_id" />' +
                                '<input id="db" name="db" type="checkbox" value="postgresql" checked="checked" />' +
                                '<input id="ui" name="ui" type="checkbox" value="webpacker" checked="checked" />' +
                                '<input id="mailer" name="mailer" type="checkbox" value="action mailer" checked="checked" />' +
                                '<input id="action_cable" name="action_cable" type="checkbox" value="action cable" />' +
                                '<div>' +
                                  '<input checked="checked" id="show-more" class="has-options" name="show-more" type="checkbox" />' +
                                  '<div class="nested-options"></div>' +
                                '</div>' +
                                '<output id="rails-new" data-url="http://example.com/:attrs" />' +
                              '</form>';

    $appName = $('input#app_name');
    $output = $('output#rails-new');
    $pluginName= $('input#plugin_name');
    $typeSelect = $('select#type');

    mountTemplateForm();
  });

  const decodedAttrs = () => JSON.parse(atob($output.text().match(/example\.com\/[a-zA-Z0-9\+\/\=]+/)[0].replace(/^example\.com\//, '')));
  const inputText = ($inp, text) => $inp.val(text).trigger('change');

  const sharedExamples = {
    noAppName: () => {
      expect($output.text()).toBe(APP_PROMPT);
      expect($output.attr('class')).toContain('is-invalid');
    },
    synchNames: () => expect($appName.val()).toBe($pluginName.val()),
  };

  describe('application', () => {
    test('initial app name not entered', sharedExamples.noAppName);

    test('enter blank app name', () => {
      inputText($appName, '    ');
      sharedExamples.noAppName();
    });

    test('delete app name', () => {
      inputText($appName, 'test-app');
      expect($output.text()).not.toBe(APP_PROMPT);

      inputText($appName, '');
      sharedExamples.noAppName();
    });

    test('derived display name', () => {
      inputText($appName, 'test-app');
      expect(decodedAttrs().displayName).toBe('Test App');
      sharedExamples.synchNames();
    });

    test('explicit display name', () => {
      const customName = 'A Custom App Name';
      const $displayName = $('input#display_name');
      inputText($appName, 'test-app');
      inputText($displayName, customName);

      expect(decodedAttrs().displayName).toBe(customName);
      sharedExamples.synchNames();
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

  describe('conditional section rendering', () => {
    let $application, $applicationMountable, $mountable, $mountablePlugin, $plugin;
    beforeEach(() => {
      $application = $('.show-a');
      $applicationMountable = $('.show-a-m');
      $mountable = $('.show-m');
      $mountablePlugin = $('.show-m-p');
      $plugin = $('.show-p');
    });

    test('default show application', () => {
      [$application, $applicationMountable].forEach($node => expect($node.hasClass('d-none')).toBeFalsy());
      [$mountable, $mountablePlugin, $plugin].forEach($node => expect($node.hasClass('d-none')).toBeTruthy());
    });

    test('select mountable', () => {
      $typeSelect.val('mountable').trigger('change');
      [$applicationMountable, $mountable, $mountablePlugin].forEach($node => expect($node.hasClass('d-none')).toBeFalsy());
      [$application, $plugin].forEach($node => expect($node.hasClass('d-none')).toBeTruthy());
    });

    test('select plugin', () => {
      $typeSelect.val('plugin').trigger('change');
      [$mountablePlugin, $plugin].forEach($node => expect($node.hasClass('d-none')).toBeFalsy());
      [$application, $applicationMountable, $mountable].forEach($node => expect($node.hasClass('d-none')).toBeTruthy());
    });

    test('toggles nested options section', () => {
      const $showMore = $('#show-more');
      const $nestedOptions = $('.nested-options');
      
      $showMore.trigger('click');
      expect($nestedOptions.hasClass('d-none')).toBeTruthy();
      
      $showMore.trigger('click');
      expect($nestedOptions.hasClass('d-none')).toBeFalsy();
    });
  });

  describe('mountable', () => {
    beforeEach(() => {
      $typeSelect.val('mountable').trigger('change');
      inputText($pluginName, 'test-plugin');
    });

    test('select mountable plugin', () => {
      const command = $output.val();

      sharedExamples.synchNames();
      expect(command).toContain('rails plugin new');
      expect(command).toContain('--mountable');
    });

    test('toggle options', () => {
      $('input#action_cable').trigger('click');
      $('input#mailer').trigger('click');

      const command = $output.val();
      expect(command).not.toContain(' --skip-action-cable ');
      expect(command).toContain(' -M ');
    });
  });

  describe('plugin', () => {
    test('select plugin', () => {
      $typeSelect.val('plugin').trigger('change');
      inputText($pluginName, 'test-plugin');
      const command = $output.val();

      sharedExamples.synchNames();
      expect(command).toContain('rails plugin new');
      expect(command).not.toContain('--mountable');
    });
  });
});
