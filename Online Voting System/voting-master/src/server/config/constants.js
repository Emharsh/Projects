const ADMIN_ROLES = {
  NATIONAL: 'national',
  LOCAL: 'local',
  REGISTRAR: 'registrar',
  POLLING_STATION: 'polling_station',
};

ADMIN_ROLES.getRanksLowerThan = function(role) {
  let lowerRanks = [];

  switch (role) {
    case ADMIN_ROLES.NATIONAL:
      lowerRanks.push(ADMIN_ROLES.LOCAL);
      // FALLTHROUGH
    case ADMIN_ROLES.LOCAL:
      lowerRanks.push(ADMIN_ROLES.POLLING_STATION);
      lowerRanks.push(ADMIN_ROLES.REGISTRAR);
      break;
    default:
      lowerRanks = [];
  }

  return lowerRanks;
};

// TODO: Define VOTER_AGE_GROUPS as enum; use change getAgeGroup(dob) to
// getAgeGroup(age), removing the logic for calculating age from here
const VOTER_AGE_GROUPS = {
  getAgeGroup(dob) {
    // Calculate age by DoB
    // Taken from https://stackoverflow.com/a/21984136
    const ageDifMs = Date.now() - dob.getTime();
    const ageDate = new Date(ageDifMs);
    const age = parseInt(Math.abs(ageDate.getUTCFullYear() - 1970));
    // End reference

    // Age groups taken from
    // https://yougov.co.uk/topics/politics/articles-reports/2017/06/13/how-britain-voted-2017-general-election
    if (age >= 18 && age <= 19) {
      return '18-19';
    } else if (age >= 20 && age <= 24) {
      return '20-24';
    } else if (age >= 25 && age <= 29) {
      return '25-29';
    } else if (age >= 30 && age <= 39) {
      return '30-39';
    } else if (age >= 40 && age <= 49) {
      return '40-49';
    } else if (age >= 50 && age <= 59) {
      return '50-59';
    } else if (age >= 60 && age <= 69) {
      return '60-69';
    } else if (age >= 70) {
      return '70+';
    } else {
      return undefined;
    }
  },
};

const MAP_IT_API_MAIN_URL = 'https://mapit.mysociety.org';

module.exports = {
  SERVICE_TYPE: {
    VOTING: 'voting',
    AUTH: 'auth',
    ADMIN: 'admin',
    DEV: 'development',
  },
  ELECTION_TYPE: {
    FPP: 0,
  },
  ADMIN_ROLES,
  AUTH_API: {
    TOKEN_INFO_URL: '/voting-token-info',
    MARK_TOKEN_USED_IN_ELECTION_URL: '/mark-voting-token-used-in-election',
  },
  MAP_IT_API: {
    URL: MAP_IT_API_MAIN_URL,
    getPostcodeInfoUrl(postcode) {
      return `${MAP_IT_API_MAIN_URL}/postcode/${postcode}?api_key=IrypMT6ioG9QtdaCjFpUP9H24luw6b2A1nM6tXjs`;
    },
  },
  VOTER_AGE_GROUPS,
};
