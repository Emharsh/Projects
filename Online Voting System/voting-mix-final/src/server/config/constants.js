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
};
