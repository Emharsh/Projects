const debug = true;
const type = ['General Election', 'Local Election'];

const navMenu = {
  'Home': ['/', 'Home'],
  'Parties': ['/parties/', 'Parties'],
  'About': ['/about/', 'About'],
  'Results': ['/results/', 'Results'],
};

const footerMenu = {
  'Main': ['/', 'Main'],
  'Admin': ['/admin/', 'Admin'],
};

const adminMenu = {
  'Elections':{
    'View': ['/admin/elections/', 'Elections'],
    'New': ['/admin/elections/new/', 'New'],
    'Populate': ['/admin/elections/pop/', 'Populate'],
  },'Voters':{
    'self': ['/admin/voters/', 'Voters'],
  },'Candidates':{
    'Candidates': ['/admin/candidates/', 'Candidates'],
    'New': ['/admin/candidates/new/', 'New'],
  },'Parties':{
    'Parties': ['/admin/parties/', 'Parties'],
    'New': ['/admin/parties/new/', 'New'],
  },'Results': {
    'self': ['/admin/results/', 'Results'],
  },'Statistics':{
    'self': ['/admin/statistics/', 'Statistics'],
  },'Management':{
    'Admins': ['/admin/management/', 'Admins'],
    'New': ['/admin/management/new/', 'New'],
  },
};

const responses = {
  'err-login-pass': 'Error - Wrong password or invalid online ID',
  'err-login-ni':
    'Error - No account found with that National Insurance Number',
  'err-login-ni-multi': 'Error - too many results',
  'suc-login': 'Correct login',
  'err-sess-none': 'Error - Session Expired',
  'suc-vote': 'Vote submitted and accepted',
};

const pageLoads =
{
  head: {
    css: {
      deploy: {
        // bootstrap: 'rel="stylesheet" href="/static/libs/bootstrap/3.3.7/bootstrap.min.css" type="text/css"',
        bootstrap: 'rel="stylesheet" href="/static/libs/bootstrap/4.3.1/dist/css/bootstrap.min.css" type="text/css"',
        fontawesome: 'rel="stylesheet" href="/static/libs/fontawesome/5.8.1/css/all.min.css"',
      },
      dev: {
        // bootstrap: 'rel="stylesheet" href="/static/libs/bootstrap/3.3.7/bootstrap.css" type="text/css"',
        bootstrap: 'rel="stylesheet" href="/static/libs/bootstrap/4.3.1/dist/css/bootstrap.css" type="text/css"',
        fontawesome: 'rel="stylesheet" href="/static/libs/fontawesome/5.8.1/css/all.css"',
      },
      all: {
        govuk: 'rel="stylesheet" href="/static/css/govuk-template.css" type="text/css"',
        main: 'rel="stylesheet" href="/static/css/main.css" type="text/css"',
        blox: 'rel="stylesheet" href="/static/css/blox.css" type="text/css"',

      },
    },
    link: {
      all: {
        favicon: 'rel="shortcut icon" type="image/png" href="/static/images/favicon.png"',
        faviconSVG: 'rel="shortcut icon" type="image/png" href="/static/images/favicon.svg"',
      },
    },
    script: {
      all: {
        main: 'src="/static/js/main.js" defer',
      },
    },
  },
  footer: {
    script: {
      deploy: {
        jquery: 'src="/static/libs/jquery/3.4.1/jquery.min.js"',
        popper: 'src="/static/libs/popper/1.15.0/umd/dist/popper.min.js"',
        // bootstrap: 'src="/static/libs/bootstrap/3.3.7/bootstrap.min.js"',
        bootstrap: 'src="/static/libs/bootstrap/4.3.1/dist/js/bootstrap.min.js"',
        fontawesome: 'src="/static/libs/fontawesome/5.8.1/js/all.min.js" defer',

      },
      dev: {
        jquery: 'src="/static/libs/jquery/3.4.1/jquery.js"',
        popper: 'src="/static/libs/popper/1.15.0/dist/umd/popper.js"',
        // bootstrap: 'src="/static/libs/bootstrap/3.3.7/bootstrap.js"',
        bootstrap: 'src="/static/libs/bootstrap/4.3.1/dist/js/bootstrap.js"',
        fontawesome: 'src="/static/libs/fontawesome/5.8.1/js/all.js" defer',
      },
      all: {
        jqueryExtensions: 'src="/static/js/jquery-extensions.js"',
        postcodes: 'crossorigin="anonymous" src="/static/js/postcodes.js"',
      },
    }, 
  },
};

const locations = {
  logs: '/logs/',
};

const tables = {
  elections: {
    fields: {
      id: { header: 'ID', type: 'number', subtype: 'short', fake: false },
      type: { header: 'Type', type: 'string', subtype: 'short', fake: false },
      name: { header: 'Name', type: 'string', subtype: 'long', fake: false },
      start_date: { header: 'Start', type: 'date', subtype: 'datetime', fake: false },
      end_date: { header: 'End', type: 'date', subtype: 'datetime', fake: false },
      postcodes: { header: 'Postcodes', type: 'array', subtype: 'string', fake: false },
      main_election_id: { header: 'Main Election', type: 'string', subtype: 'mid', fake: false },
      master_key: { header: 'Key', type: 'string', subtype: 'vlong', fake: false },
      electoral_regions_id: { header: 'Region', type: 'string', subtype: 'short', fake: false },
    },
    key: 'id',
  },
  parties: {
    fields: {
      id: { header: 'ID', type: 'number', subtype: 'short', fake: false  },
      name: { header: 'Name', type: 'string', subtype: 'long', fake: false  },
      picture: { header: 'Picture', type: 'image', subtype: 'portrate', fake: false  },
    },
    key: 'id',
  },
  party: {
    fields: {
      id: { header: 'ID', type: 'number', subtype: 'short', fake: false },
      name: { header: 'Party Name', type: 'string', subtype: 'long', fake: false },
      picture: { header: 'Picture', type: 'image', subtype: 'portrate', fake: false },
    },
    key: 'id',
  },
  candidates: {
    fields: {
      id: { header: 'ID', type: 'number', subtype: 'short', fake:false },
      name: { header: 'Name', type: 'string', subtype: 'long', fake: false  },
      party_id: { header: 'Party ID', type: 'string', subtype: 'long', fake: false  },
      picture: { header: 'Picture', type: 'image', subtype: 'portrate', fake: false  },
      picture_url: { header: 'Picture URL', type: 'string', subtype: 'long', fake: false  },
      party_name: { header: 'Party Name', type: 'string', subtype: 'long', fake: true  },
    },
    key: 'id',
  },
  electoralRegions: {
    fields: {
      id_regions: { header: 'ID', type: 'number', subtype: 'short', fake: false },
      name: { header: 'Name', type: 'string', subtype: 'long', fake: false },
      type: { header: 'Party ID', type: 'number', subtype: 'long', fake: false },
      electorate: { header: 'Picture', type: 'number', subtype: 'long', fake: false },
      region: { header: 'Picture URL', type: 'string', subtype: 'long', fake: false },
      nation: { header: 'Party Name', type: 'string', subtype: 'long', fake: true },
    },
    key: 'id_regions',
  },
  electoralRegion: {
    fields: {
      id_regions: { header: 'ID', type: 'number', subtype: 'short', fake: false },
      name: { header: 'Electioral Region', type: 'string', subtype: 'long', fake: false },
      type: { header: 'Party ID', type: 'number', subtype: 'long', fake: false },
      electorate: { header: 'Picture', type: 'number', subtype: 'long', fake: false },
      region: { header: 'Picture URL', type: 'string', subtype: 'long', fake: false },
      nation: { header: 'Party Name', type: 'string', subtype: 'long', fake: true },
    },
    key: 'id_regions',
  },
  electionType: {
    fields: {
      id_election_types: { header: 'ID', type: 'number', subtype: 'short', fake: false },
      name: { header: 'Name', type: 'string', subtype: 'long', fake: false },
      voting_system: { header: 'Party ID', type: 'number', subtype: 'long', fake: false },
      info_url: { header: 'Picture', type: 'number', subtype: 'long', fake: false },
      region_name_singular: { header: 'Picture URL', type: 'string', subtype: 'long', fake: false },
      region_name_multiple: { header: 'Party Name', type: 'string', subtype: 'long', fake: true },
    },
    key: 'id_election_types',
  },
  electionTypes: {
    fields: {
      id_election_types: { header: 'ID', type: 'number', subtype: 'short', fake: false },
      name: { header: 'Election Type', type: 'string', subtype: 'long', fake: false },
      voting_system: { header: 'Party ID', type: 'number', subtype: 'long', fake: false },
      info_url: { header: 'Picture', type: 'number', subtype: 'long', fake: false },
      region_name_singular: { header: 'Picture URL', type: 'string', subtype: 'long', fake: false },
      region_name_multiple: { header: 'Party Name', type: 'string', subtype: 'long', fake: true },
    },
    key: 'id_election_types',
  },
};

const consoleFormat = {
  funct: {
    Reset: '\x1b[0m',
    Bright: '\x1b[1m',
    Dim: '\x1b[2m',
    Underscore: '\x1b[4m',
    Blink: '\x1b[5m',
    Reverse: '\x1b[7m',
    Hidden: '\x1b[8m',
  },
  fore: {
    Black: '\x1b[30m',
    Red: '\x1b[31m',
    Green: '\x1b[32m',
    Yellow: '\x1b[33m',
    Blue: '\x1b[34m',
    Magenta: '\x1b[35m',
    Cyan: '\x1b[36m',
    White: '\x1b[37m',
  },
  back: {
    Black: '\x1b[40m',
    Red: '\x1b[41m',
    Green: '\x1b[42m',
    Yellow: '\x1b[43m',
    Blue: '\x1b[44m',
    Magenta: '\x1b[45m',
    Cyan: '\x1b[46m',
    White: '\x1b[47m',
  }
};

const icons = {
  funct: {
    Logo: '<i class="fas fa-person-booth"></i>',
    True: '<i class="fas fa-check-circle"></i>',
    False: '<i class="fas fa-circle"></i>',
    Empty: '<i class="fas fa- empty - set"></i>',
  },
};

module.exports = {
  debug,
  type,
  navMenu,
  footerMenu,
  adminMenu,
  responses,
  pageLoads,
  locations,
  consoleFormat,
  icons,
  tables,
};
