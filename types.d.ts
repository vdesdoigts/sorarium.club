namespace NbaApi {
  export interface TeamSitesOnly {
    playerCode: string;
    posFull: string;
    displayAffiliation: string;
    freeAgentCode: string;
  }

  export interface Team {
    teamId: string;
    seasonStart: string;
    seasonEnd: string;
  }

  export interface Draft {
    teamId: string;
    pickNum: string;
    roundNum: string;
    seasonYear: string;
  }

  export interface NbaPlayer {
    firstName: string;
    lastName: string;
    temporaryDisplayName: string;
    personId: string;
    teamId: string;
    jersey: string;
    isActive: boolean;
    pos: string;
    heightFeet: string;
    heightInches: string;
    heightMeters: string;
    weightPounds: string;
    weightKilograms: string;
    dateOfBirthUTC: string;
    teamSitesOnly: TeamSitesOnly;
    teams: Team[];
    draft: Draft;
    nbaDebutYear: string;
    yearsPro: string;
    collegeName: string;
    lastAffiliation: string;
    country: string;
  }

  export interface NbaPlayersResult {
    league: {
      standard: NbaPlayer[];
    };
  }

  export interface NbaTeam {
    isNBAFranchise: boolean;
    fullName: string;
    tricode: string;
    teamId: string;
  }

  export interface NbaTeamsResult {
    league: {
      standard: NbaTeam[];
    };
  }
}

namespace Sorare {
  export interface OauthToken {
    access_token: string;
    refresh_token: string;
  }
}
