const buildLink = () => {
  const { actionCable, appName, mailer, templateParams, $railsNew } = retrieveUI();
  $railsNew[!!appName ? 'removeClass' : 'addClass']('is-invalid');

  $railsNew.text(!!appName ? ['rails new', appName, '-T', db(templateParams.db), ui(templateParams.ui),
                              !!mailer ? null : '-M', !!actionCable ? null : '--skip-action-cable',
                              `--template "${templateUrl($railsNew, templateParams)}"`].filter(Boolean).join(' ')
                           : 'Enter an application name');
};

const enableSelect = () => {
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

  return {
    actionCable: $('input#action_cable').is(':checked'),
    appName,
    mailer: $('input#mailer').is(':checked'),
    templateParams: {
      ccTestReporterId: $('input#cc_test_reporter_id').val(),
      db: $('input#db').is(':checked') && $('input#db').val(),
      displayName: retrieveDisplayName(appName),
      ui: $('input#ui').is(':checked'),
    },
    $railsNew: $('output#rails-new'),
  };
};

const templateUrl = ($railsNew, templateParams) => $railsNew.data().url.replace(':attrs', window.btoa(JSON.stringify(templateParams)));

export default () => {
  $('body').on('change', 'input, select, textarea', buildLink);
  enableSelect();
  buildLink();
};
