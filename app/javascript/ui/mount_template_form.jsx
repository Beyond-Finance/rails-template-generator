const addTypeSelection = () => $('#type').on('change', () => {
  const newType = type();
  $(['application', 'mountable', 'plugin'].filter(t => t != newType).map(t => `.${t}`).join(', ')).addClass('d-none');
  $(`.${newType}`).removeClass('d-none');
  buildLink();
});

const buildApplicationLink = () => {
  const { actionCable, appName, mailer, templateParams, $railsNew } = retrieveUI();
  $railsNew[!!appName ? 'removeClass' : 'addClass']('is-invalid');

  $railsNew.text(!!appName ? ['rails new', appName, '-T', db(templateParams.db), ui(templateParams.ui),
                              !!mailer ? null : '-M', !!actionCable ? null : '--skip-action-cable',
                              `--template "${templateUrl($railsNew, templateParams)}"`].filter(Boolean).join(' ')
                           : 'Enter an application name');
};

const buildLink = () => ({ application: buildApplicationLink,
                           mountable: buildMountableLink,
                           plugin: buildPluginLink })[type()]();

const buildMountableLink = () => {
  const { actionCable, mailer, pluginName, templateParams, $railsNew } = retrieveUI();
  $railsNew[!!pluginName ? 'removeClass' : 'addClass']('is-invalid');

  $railsNew.text(!!pluginName ? ['rails plugin new', pluginName, '-T --mountable --dummy-path=spec/dummy',
                                 db(templateParams.db), ui(templateParams.ui),
                                 !!mailer ? null : '-M', !!actionCable ? null : '--skip-action-cable',
                                 `--template "${templateUrl($railsNew, templateParams)}"`].filter(Boolean).join(' ')
                              : 'Enter plugin name');
};

const buildPluginLink = () => {
  const { pluginName, templateParams: { ccTestReporterId, type }, $railsNew } = retrieveUI();
  $railsNew[!!pluginName ? 'removeClass' : 'addClass']('is-invalid');

  $railsNew.text(!!pluginName ? ['rails plugin new', pluginName, '-T',
                                 `--template "${templateUrl($railsNew, { ccTestReporterId, type })}"`].filter(Boolean).join(' ')
                              : 'Enter plugin name');
};

const enableOutputSelection = () => {
  const $railsNew = $('output#rails-new');
  $railsNew.on('click', () => window.getSelection().selectAllChildren($railsNew.get(0)));
};

const db = db => !!db ? `-d ${db}` : '-O';
const ui = ui => !!ui ? '--webpacker --skip-turbolinks' : '-J';

const retrieveDisplayName = appName => {
  const $displayName = $('input#display_name');
  const displayName = $displayName.val().trim() ||
                      appName.replace(/(-|_)/g, ' ')
                             .replace(/\w\S*/g, w => `${w.charAt(0).toUpperCase()}${w.substr(1).toLowerCase()}`);
  $displayName.attr('placeholder', displayName);

  return displayName;
};

const retrieveUI = () => {
  const appName = $('input#app_name').val().trim();
  const pluginName = $('input#plugin_name').val().trim();

  return {
    actionCable: $('input#action_cable').is(':checked'),
    appName,
    mailer: $('input#mailer').is(':checked'),
    pluginName,
    templateParams: {
      ccTestReporterId: $('input#cc_test_reporter_id').val(),
      db: $('input#db').is(':checked') && $('input#db').val(),
      displayName: retrieveDisplayName(appName),
      type: type(),
      ui: $('input#ui').is(':checked'),
    },
    $railsNew: $('output#rails-new'),
  };
};

const templateUrl = ($railsNew, templateParams) => $railsNew.data().url.replace(':attrs', window.btoa(JSON.stringify(templateParams)));

const type = () => $('#type').val();

export default () => {
  $('body').on('change', 'input, select, textarea', buildLink);
  $('body').on('change', '#app_name, #plugin_name', function () { $('#app_name, #plugin_name').val($(this).val()) });
  addTypeSelection();
  enableOutputSelection();
  $('#type').trigger('change');
};
