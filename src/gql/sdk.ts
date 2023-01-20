import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BaseballISO8601DateTime: any;
  Internal: any;
  NBAISO8601DateTime: any;
  Time: any;
  UUID: any;
};

export type BaseballCard = CardInterface & Node & {
  __typename?: 'BaseballCard';
  assetId: Scalars['ID'];
  avatarImageUrl: Scalars['String'];
  bonusLossAfterTransfer: Scalars['Float'];
  cardLevel: Scalars['Int'];
  fullImageUrl: Scalars['String'];
  id: Scalars['UUID'];
  owner?: Maybe<User>;
  player: BaseballPlayer;
  positions: Array<BaseballPlayerPosition>;
  rarity: CardRarity;
  rarityBonus: Scalars['Float'];
  season: Scalars['String'];
  seasonBonus: Scalars['Float'];
  serialNumber: Scalars['Int'];
  slug: Scalars['String'];
  team?: Maybe<BaseballTeam>;
  totalBonus: Scalars['Float'];
  xp: Scalars['Int'];
  xpBonus: Scalars['Float'];
  xpThresholdForCurrentCardLevel: Scalars['Int'];
  xpThresholdForNextCardLevel?: Maybe<Scalars['Int']>;
};

export type BaseballCardConnection = {
  __typename?: 'BaseballCardConnection';
  nodes: Array<BaseballCard>;
  pageInfo: PageInfo;
};

export type BaseballCardForComposeLineup = {
  __typename?: 'BaseballCardForComposeLineup';
  card: BaseballCard;
  usedInOtherLineup?: Maybe<BaseballLineup>;
};

export type BaseballCardForComposeLineupConnection = {
  __typename?: 'BaseballCardForComposeLineupConnection';
  nodes: Array<BaseballCardForComposeLineup>;
  pageInfo: PageInfo;
};

export type BaseballCardInLineup = CardInLineupInterface & {
  __typename?: 'BaseballCardInLineup';
  card: BaseballCard;
  gameScores?: Maybe<Array<BaseballCardInLineupGameScore>>;
  indexInLineup: Scalars['Int'];
  lineup: BaseballLineup;
  playerInFixture: BaseballPlayerInFixture;
  score: Scalars['Float'];
  totalBonus: Scalars['Float'];
};

export type BaseballCardInLineupGameScore = CardInLineupGameScoreInterface & {
  __typename?: 'BaseballCardInLineupGameScore';
  detailedBattingGameScore: BaseballPlayerGameDetailedBattingScores;
  detailedPitchingGameScore: BaseballPlayerGameDetailedPitchingScores;
  gameStats: BaseballPlayerGameStats;
  score: BaseballScore;
};

export enum BaseballCardRarity {
  Common = 'common',
  Limited = 'limited',
  Rare = 'rare',
  SuperRare = 'super_rare',
  Unique = 'unique'
}

export type BaseballCardsInput = {
  assetIds?: InputMaybe<Array<Scalars['ID']>>;
  ids?: InputMaybe<Array<Scalars['UUID']>>;
};

export type BaseballCardsPaginated = {
  __typename?: 'BaseballCardsPaginated';
  cards: Array<BaseballCard>;
  currentPage: Scalars['Int'];
  pages: Scalars['Int'];
};

export type BaseballCompleteOnboardingTaskInput = {
  selectedCardPlayerId?: InputMaybe<Scalars['UUID']>;
  task: BaseballOnboardingTask;
};

export type BaseballCompleteOnboardingTaskResponse = {
  __typename?: 'BaseballCompleteOnboardingTaskResponse';
  currentSportsUser?: Maybe<CurrentSportsUser>;
  /** @deprecated use currentSportsUser */
  currentUser?: Maybe<CurrentBaseballUser>;
};

export type BaseballCreateOrUpdateLineupInput = {
  cardSlugs: Array<Scalars['String']>;
  leaderboardSlug: Scalars['String'];
  lineupId?: InputMaybe<Scalars['UUID']>;
};

export type BaseballCreateOrUpdateLineupResponse = {
  __typename?: 'BaseballCreateOrUpdateLineupResponse';
  createdLineup?: Maybe<BaseballLineup>;
  lineupValidationErrors: Array<BaseballCreateOrUpdateLineupValidationError>;
};

export enum BaseballCreateOrUpdateLineupValidationError {
  AllowedRaritiesViolation = 'ALLOWED_RARITIES_VIOLATION',
  MinRarityViolation = 'MIN_RARITY_VIOLATION',
  MissingPitcherAtRequiredRarity = 'MISSING_PITCHER_AT_REQUIRED_RARITY'
}

export type BaseballCurrentUserData = {
  __typename?: 'BaseballCurrentUserData';
  onboardingState: BaseballOnboarding;
};

export type BaseballDeleteLineupInput = {
  lineupId: Scalars['UUID'];
};

export type BaseballFixture = FixtureInterface & Node & {
  __typename?: 'BaseballFixture';
  endDate: Scalars['Time'];
  fixtureState: FixtureState;
  gameWeek: Scalars['Int'];
  games: Array<BaseballGame>;
  id: Scalars['UUID'];
  leaderboards: Array<BaseballLeaderboard>;
  myEligibleGames: Array<BaseballGame>;
  myLineups: Array<BaseballLineup>;
  myLiveLineupGames: Array<BaseballGameWithCardInLineup>;
  nextFixture?: Maybe<BaseballFixture>;
  playerFixtureStats: BaseballPlayerFixtureStatsConnection;
  previousFixture?: Maybe<BaseballFixture>;
  rewardPool: Array<BaseballPlayer>;
  slug: Scalars['String'];
  startDate: Scalars['Time'];
};


export type BaseballFixturePlayerFixtureStatsArgs = {
  input: BaseballPlayerFixtureStatsInput;
};


export type BaseballFixtureRewardPoolArgs = {
  cardRarity?: InputMaybe<CardRarity>;
  rarity?: InputMaybe<BaseballCardRarity>;
  tier: Scalars['Int'];
};

export type BaseballFixtureConnection = {
  __typename?: 'BaseballFixtureConnection';
  nodes: Array<BaseballFixture>;
  pageInfo: PageInfo;
};

export type BaseballGame = GameInterface & Node & {
  __typename?: 'BaseballGame';
  awayProbableStartingPitcher?: Maybe<BaseballPlayer>;
  awayScore: Scalars['Int'];
  awayTeam: BaseballTeam;
  homeProbableStartingPitcher?: Maybe<BaseballPlayer>;
  homeScore: Scalars['Int'];
  homeTeam: BaseballTeam;
  id: Scalars['UUID'];
  inning?: Maybe<BaseballInning>;
  pastPlayerPerformance: Array<BaseballPlayerGameStats>;
  startDate: Scalars['Time'];
  status: GameStatus;
};


export type BaseballGamePastPlayerPerformanceArgs = {
  last?: InputMaybe<Scalars['Int']>;
  playerSlug: Scalars['String'];
};

export type BaseballGameWithCardInLineup = GameWithCardInLineupInterface & {
  __typename?: 'BaseballGameWithCardInLineup';
  awayCardsInLineups: Array<BaseballCardInLineup>;
  game: BaseballGame;
  homeCardsInLineups: Array<BaseballCardInLineup>;
};

export type BaseballInning = {
  __typename?: 'BaseballInning';
  half: BaseballInningHalf;
  number: Scalars['Int'];
};

export enum BaseballInningHalf {
  Bottom = 'BOTTOM',
  Top = 'TOP'
}

export type BaseballLeaderboard = LeaderboardInterface & Node & {
  __typename?: 'BaseballLeaderboard';
  displayName: Scalars['String'];
  displayNameWithoutRarity: Scalars['String'];
  fixture: BaseballFixture;
  iconImageUrl: Scalars['String'];
  id: Scalars['UUID'];
  isTraining: Scalars['Boolean'];
  isUserEligible: Scalars['Boolean'];
  leaderboardRarity: LeaderboardRarity;
  lineups: BaseballLineupConnection;
  lineupsCount: Scalars['Int'];
  monochromeIconImageUrl: Scalars['String'];
  myComposeLineupCards: BaseballCardForComposeLineupConnection;
  myLineups: Array<BaseballLineup>;
  prizePool: LeaderboardPrizePool;
  requirements: BaseballLeaderboardRequirements;
  scoringStrategy: Scalars['String'];
  slug: Scalars['String'];
};


export type BaseballLeaderboardLineupsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};


export type BaseballLeaderboardMyComposeLineupCardsArgs = {
  after?: InputMaybe<Scalars['String']>;
  cardsInLineupPartial: Array<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  includeUsed: Scalars['Boolean'];
  indexInLineup: Scalars['Int'];
  lineupId?: InputMaybe<Scalars['UUID']>;
  query?: InputMaybe<Scalars['String']>;
};

export type BaseballLeaderboardRequirements = LeaderboardRequirementsInterface & {
  __typename?: 'BaseballLeaderboardRequirements';
  allowedRarities: Array<CardRarity>;
  minRarity?: Maybe<LeaderboardRulesMinimumRarityRequirement>;
  minRookieCount: Scalars['Int'];
  playerAgeRequirements?: Maybe<PlayerAgeRequirements>;
};

export type BaseballLineup = LineupInterface & Node & {
  __typename?: 'BaseballLineup';
  cards: Array<BaseballCardInLineup>;
  games: Array<BaseballGameWithCardInLineup>;
  id: Scalars['UUID'];
  leaderboard: BaseballLeaderboard;
  projectedReward?: Maybe<ProjectedReward>;
  rank: Scalars['Int'];
  reward?: Maybe<BaseballReward>;
  score: Scalars['Float'];
  user: User;
  xpScore: Scalars['Float'];
};

export type BaseballLineupConnection = {
  __typename?: 'BaseballLineupConnection';
  nodes: Array<BaseballLineup>;
  pageInfo: PageInfo;
};

export type BaseballOnboarding = {
  __typename?: 'BaseballOnboarding';
  leaderboard?: Maybe<BaseballLeaderboard>;
  nextTask: BaseballOnboardingTask;
  selectCardOptions: Array<BaseballOnboardingCardOption>;
};

export type BaseballOnboardingCardOption = {
  __typename?: 'BaseballOnboardingCardOption';
  commonCardImageUrl: Scalars['String'];
  player: BaseballPlayer;
};

export enum BaseballOnboardingTask {
  NoTask = 'NO_TASK',
  SelectStarterCard = 'SELECT_STARTER_CARD'
}

export type BaseballPlayer = Node & PlayerInterface & {
  __typename?: 'BaseballPlayer';
  age: Scalars['Int'];
  avatarImageUrl: Scalars['String'];
  birthDate: Scalars['Time'];
  birthPlaceCountry: Scalars['String'];
  currentSeasonAverageScore: BaseballScore;
  displayName: Scalars['String'];
  firstName: Scalars['String'];
  /** @deprecated use PlayerInFixture.upcomingGames */
  fixtureGames: Array<BaseballGame>;
  id: Scalars['UUID'];
  inFixture?: Maybe<BaseballPlayerInFixture>;
  isActive: Scalars['Boolean'];
  last15AverageScore: BaseballScore;
  lastName: Scalars['String'];
  latestFinalGameStats: Array<BaseballPlayerGameStats>;
  positions: Array<BaseballPlayerPosition>;
  shirtNumber: Scalars['Int'];
  slug: Scalars['String'];
  team?: Maybe<BaseballTeam>;
  upcomingGames: Array<BaseballGame>;
};


export type BaseballPlayerFixtureGamesArgs = {
  fixtureSlug: Scalars['String'];
};


export type BaseballPlayerInFixtureArgs = {
  fixtureSlug: Scalars['String'];
};


export type BaseballPlayerLatestFinalGameStatsArgs = {
  last: Scalars['Int'];
};


export type BaseballPlayerUpcomingGamesArgs = {
  next: Scalars['Int'];
};

export type BaseballPlayerFixtureStatsConnection = {
  __typename?: 'BaseballPlayerFixtureStatsConnection';
  nodes: Array<BaseballPlayerInFixture>;
  pageInfo: PageInfo;
};

export type BaseballPlayerFixtureStatsInput = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  position: BaseballPlayerFixtureStatsPosition;
};

export enum BaseballPlayerFixtureStatsPosition {
  CornerInfielder = 'CORNER_INFIELDER',
  MiddleInfielder = 'MIDDLE_INFIELDER',
  Outfielder = 'OUTFIELDER',
  ReliefPitcher = 'RELIEF_PITCHER',
  StartingPitcher = 'STARTING_PITCHER'
}

export type BaseballPlayerGameBattingStats = {
  __typename?: 'BaseballPlayerGameBattingStats';
  doubles?: Maybe<Scalars['Int']>;
  hitByPitch?: Maybe<Scalars['Int']>;
  homeRuns?: Maybe<Scalars['Int']>;
  rbi?: Maybe<Scalars['Int']>;
  runs?: Maybe<Scalars['Int']>;
  singles?: Maybe<Scalars['Int']>;
  stolenBases?: Maybe<Scalars['Int']>;
  strikeouts?: Maybe<Scalars['Int']>;
  triples?: Maybe<Scalars['Int']>;
  walks?: Maybe<Scalars['Int']>;
};

export type BaseballPlayerGameDetailedBattingScores = {
  __typename?: 'BaseballPlayerGameDetailedBattingScores';
  doubles?: Maybe<Scalars['Float']>;
  hitByPitch?: Maybe<Scalars['Float']>;
  homeRuns?: Maybe<Scalars['Float']>;
  rbi?: Maybe<Scalars['Float']>;
  runs?: Maybe<Scalars['Float']>;
  singles?: Maybe<Scalars['Float']>;
  stolenBases?: Maybe<Scalars['Float']>;
  strikeouts?: Maybe<Scalars['Float']>;
  triples?: Maybe<Scalars['Float']>;
  walks?: Maybe<Scalars['Float']>;
};

export type BaseballPlayerGameDetailedPitchingScores = {
  __typename?: 'BaseballPlayerGameDetailedPitchingScores';
  earnedRuns?: Maybe<Scalars['Float']>;
  hitBatsmen?: Maybe<Scalars['Float']>;
  hitsAllowed?: Maybe<Scalars['Float']>;
  hold?: Maybe<Scalars['Float']>;
  loss?: Maybe<Scalars['Float']>;
  outs?: Maybe<Scalars['Float']>;
  save?: Maybe<Scalars['Float']>;
  strikeouts?: Maybe<Scalars['Float']>;
  walks?: Maybe<Scalars['Float']>;
  win?: Maybe<Scalars['Float']>;
};

export type BaseballPlayerGamePitchingStats = {
  __typename?: 'BaseballPlayerGamePitchingStats';
  earnedRuns?: Maybe<Scalars['Int']>;
  hitBatsmen?: Maybe<Scalars['Int']>;
  hitsAllowed?: Maybe<Scalars['Int']>;
  hold?: Maybe<Scalars['Int']>;
  loss?: Maybe<Scalars['Int']>;
  outs?: Maybe<Scalars['Int']>;
  save?: Maybe<Scalars['Int']>;
  strikeouts?: Maybe<Scalars['Int']>;
  walks?: Maybe<Scalars['Int']>;
  win?: Maybe<Scalars['Int']>;
};

export type BaseballPlayerGameStats = PlayerGameStatsInterface & {
  __typename?: 'BaseballPlayerGameStats';
  batting?: Maybe<BaseballPlayerGameBattingStats>;
  detailedBattingScores?: Maybe<BaseballPlayerGameDetailedBattingScores>;
  detailedPitchingScores?: Maybe<BaseballPlayerGameDetailedPitchingScores>;
  game: BaseballGame;
  pitching?: Maybe<BaseballPlayerGamePitchingStats>;
  playedInGame: Scalars['Boolean'];
  score: BaseballScore;
  team: BaseballTeam;
};

export type BaseballPlayerInFixture = PlayerInFixtureInterface & {
  __typename?: 'BaseballPlayerInFixture';
  fixture: BaseballFixture;
  player: BaseballPlayer;
  score: BaseballScore;
  status: BaseballPlayerInFixtureStatus;
};

export type BaseballPlayerInFixtureStatus = PlayerInFixtureStatusInterface & {
  __typename?: 'BaseballPlayerInFixtureStatus';
  gameStats: Array<BaseballPlayerGameStats>;
  inGame: Scalars['Boolean'];
  isScoreFinal: Scalars['Boolean'];
  probablePitcherGames: Array<BaseballGame>;
  statusIconType: PlayerInFixtureStatusIconType;
  upcomingGames: Array<BaseballGame>;
};

export enum BaseballPlayerPosition {
  Catcher = 'CATCHER',
  DesignatedHitter = 'DESIGNATED_HITTER',
  FirstBase = 'FIRST_BASE',
  Outfield = 'OUTFIELD',
  ReliefPitcher = 'RELIEF_PITCHER',
  SecondBase = 'SECOND_BASE',
  Shortstop = 'SHORTSTOP',
  StartingPitcher = 'STARTING_PITCHER',
  ThirdBase = 'THIRD_BASE'
}

export type BaseballReferralReward = Node & ReferralRewardInterface & {
  __typename?: 'BaseballReferralReward';
  card: BaseballCard;
  id: Scalars['UUID'];
  state: RewardState;
};

export type BaseballReward = Node & RewardInterface & {
  __typename?: 'BaseballReward';
  card: BaseballCard;
  id: Scalars['UUID'];
  lineup: BaseballLineup;
  state: RewardState;
  tier: Scalars['Int'];
};

export type BaseballScore = {
  __typename?: 'BaseballScore';
  batting: Scalars['Float'];
  pitching: Scalars['Float'];
};

export type BaseballScoutingMissionSlot = {
  __typename?: 'BaseballScoutingMissionSlot';
  ownedCard?: Maybe<BaseballCard>;
  requiredPlayer: BaseballPlayer;
};

export type BaseballTeam = TeamInterface & {
  __typename?: 'BaseballTeam';
  abbreviation: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['UUID'];
  market: Scalars['String'];
  name: Scalars['String'];
  players: Array<BaseballPlayer>;
  slug: Scalars['String'];
  svgUrl: Scalars['String'];
};

export type BeginnerLeaderboardDetails = {
  __typename?: 'BeginnerLeaderboardDetails';
  isCompleted: Scalars['Boolean'];
  isVisible: Scalars['Boolean'];
  progressionRankPercentageThreshold: Scalars['Int'];
};

export type CardCountsByRarity = {
  __typename?: 'CardCountsByRarity';
  commonCount: Scalars['Int'];
  limitedCount: Scalars['Int'];
  rareCount: Scalars['Int'];
  superRareCount: Scalars['Int'];
  uniqueCount: Scalars['Int'];
};

export type CardInLineupGameScoreInterface = {
  gameStats: PlayerGameStatsInterface;
};

export type CardInLineupInterface = {
  card: CardInterface;
  gameScores?: Maybe<Array<CardInLineupGameScoreInterface>>;
  lineup: LineupInterface;
  playerInFixture: PlayerInFixtureInterface;
  score: Scalars['Float'];
  totalBonus: Scalars['Float'];
};

export type CardInterface = {
  assetId: Scalars['ID'];
  avatarImageUrl: Scalars['String'];
  bonusLossAfterTransfer: Scalars['Float'];
  cardLevel: Scalars['Int'];
  fullImageUrl: Scalars['String'];
  id: Scalars['UUID'];
  owner?: Maybe<User>;
  player: PlayerInterface;
  rarity: CardRarity;
  rarityBonus: Scalars['Float'];
  season: Scalars['String'];
  seasonBonus: Scalars['Float'];
  serialNumber: Scalars['Int'];
  slug: Scalars['String'];
  totalBonus: Scalars['Float'];
  xp: Scalars['Int'];
  xpBonus: Scalars['Float'];
  xpThresholdForCurrentCardLevel: Scalars['Int'];
  xpThresholdForNextCardLevel?: Maybe<Scalars['Int']>;
};

export enum CardRarity {
  Common = 'common',
  Limited = 'limited',
  Rare = 'rare',
  SuperRare = 'super_rare',
  Unique = 'unique'
}

export type CardTradeInterface = {
  expiresAfter?: Maybe<Scalars['Time']>;
  id: Scalars['UUID'];
  isComplete: Scalars['Boolean'];
  userGiveCard: CardInterface;
  userGiveCardUsedInLineup?: Maybe<LineupInterface>;
  userReceiveCard?: Maybe<CardInterface>;
  userReceiveCardChoices: Array<CommonCardSampleInterface>;
};

export type CommonCardSampleInterface = {
  commonCardImageUrl: Scalars['String'];
  id: Scalars['UUID'];
  player: PlayerInterface;
};

export type CurrentBaseballUser = {
  __typename?: 'CurrentBaseballUser';
  cards: BaseballCardConnection;
  currentUserData: BaseballCurrentUserData;
  id: Scalars['UUID'];
  nickname: Scalars['String'];
  slug: Scalars['String'];
  unclaimedRewards?: Maybe<Array<BaseballReward>>;
};


export type CurrentBaseballUserCardsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type CurrentNbaUser = {
  __typename?: 'CurrentNBAUser';
  id: Scalars['UUID'];
  nbaCards: NbaCardConnection;
  nbaCurrentUserData: NbaCurrentUserData;
  unclaimedRewards?: Maybe<Array<NbaReward>>;
};


export type CurrentNbaUserNbaCardsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type CurrentSportsUser = UserInterface & {
  __typename?: 'CurrentSportsUser';
  baseballCardCounts: CardCountsByRarity;
  baseballCards: BaseballCardConnection;
  baseballCurrentUserData: BaseballCurrentUserData;
  baseballUnclaimedLineupRewards: Array<BaseballReward>;
  id: Scalars['UUID'];
  nbaCardCounts: CardCountsByRarity;
  nbaCards: NbaCardConnection;
  nbaCurrentUserData: NbaCurrentUserData;
  nbaLeagues: Array<NbaLeague>;
  nbaUnclaimedLineupRewards: Array<NbaReward>;
  nickname: Scalars['String'];
  slug: Scalars['String'];
};


export type CurrentSportsUserBaseballCardsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  positions?: InputMaybe<Array<BaseballPlayerPosition>>;
  rarities?: InputMaybe<Array<CardRarity>>;
};


export type CurrentSportsUserNbaCardsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  positions?: InputMaybe<Array<NbaPlayerPosition>>;
  rarities?: InputMaybe<Array<CardRarity>>;
};

export type FixtureInterface = {
  endDate: Scalars['Time'];
  fixtureState: FixtureState;
  gameWeek: Scalars['Int'];
  games: Array<GameInterface>;
  id: Scalars['UUID'];
  leaderboards: Array<LeaderboardInterface>;
  myEligibleGames: Array<GameInterface>;
  myLineups: Array<LineupInterface>;
  myLiveLineupGames: Array<GameWithCardInLineupInterface>;
  nextFixture?: Maybe<FixtureInterface>;
  previousFixture?: Maybe<FixtureInterface>;
  rewardPool: Array<PlayerInterface>;
  slug: Scalars['String'];
  startDate: Scalars['Time'];
};


export type FixtureInterfaceRewardPoolArgs = {
  cardRarity?: InputMaybe<CardRarity>;
  rarity?: InputMaybe<BaseballCardRarity>;
  tier: Scalars['Int'];
};

export enum FixtureState {
  Closed = 'closed',
  Opened = 'opened',
  Started = 'started'
}

export type GameInterface = {
  awayScore: Scalars['Int'];
  awayTeam: TeamInterface;
  homeScore: Scalars['Int'];
  homeTeam: TeamInterface;
  id: Scalars['UUID'];
  startDate: Scalars['Time'];
  status: GameStatus;
};

export enum GameStatus {
  Canceled = 'canceled',
  Delayed = 'delayed',
  Played = 'played',
  Playing = 'playing',
  Postponed = 'postponed',
  Scheduled = 'scheduled',
  Suspended = 'suspended'
}

export type GameWithCardInLineupInterface = {
  awayCardsInLineups: Array<CardInLineupInterface>;
  game: GameInterface;
  homeCardsInLineups: Array<CardInLineupInterface>;
};

export type LeaderboardInterface = {
  displayName: Scalars['String'];
  displayNameWithoutRarity: Scalars['String'];
  fixture: FixtureInterface;
  iconImageUrl: Scalars['String'];
  id: Scalars['UUID'];
  isTraining: Scalars['Boolean'];
  isUserEligible: Scalars['Boolean'];
  leaderboardRarity: LeaderboardRarity;
  lineupsCount: Scalars['Int'];
  monochromeIconImageUrl: Scalars['String'];
  prizePool: LeaderboardPrizePool;
  requirements: LeaderboardRequirementsInterface;
  scoringStrategy: Scalars['String'];
  slug: Scalars['String'];
};

export type LeaderboardPrizePool = {
  __typename?: 'LeaderboardPrizePool';
  commonCardsCount: Scalars['Int'];
  commonCardsMaxThreshold?: Maybe<Scalars['Int']>;
  limitedCardsCount: Scalars['Int'];
  participation: Array<PrizeLevel>;
  podium: Array<PrizePoolPodiumPrize>;
  rareCardsCount: Scalars['Int'];
  superRareCardsCount: Scalars['Int'];
  uniqueCardsCount: Scalars['Int'];
};

export enum LeaderboardRarity {
  Common = 'COMMON',
  Limited = 'LIMITED',
  Mixed = 'MIXED',
  Rare = 'RARE',
  SuperRare = 'SUPER_RARE',
  Unique = 'UNIQUE'
}

export type LeaderboardRequirementsInterface = {
  allowedRarities: Array<CardRarity>;
  minRarity?: Maybe<LeaderboardRulesMinimumRarityRequirement>;
  minRookieCount: Scalars['Int'];
  playerAgeRequirements?: Maybe<PlayerAgeRequirements>;
};

export type LeaderboardRulesMinimumRarityRequirement = {
  __typename?: 'LeaderboardRulesMinimumRarityRequirement';
  minCount: Scalars['Int'];
  rarity: CardRarity;
};

export type LineupInterface = {
  cards: Array<CardInLineupInterface>;
  games: Array<GameWithCardInLineupInterface>;
  id: Scalars['UUID'];
  leaderboard: LeaderboardInterface;
  projectedReward?: Maybe<ProjectedReward>;
  rank: Scalars['Int'];
  reward?: Maybe<RewardInterface>;
  score: Scalars['Float'];
  user: User;
  xpScore: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  claimBaseballReferralRewards?: Maybe<Array<BaseballReferralReward>>;
  claimBaseballRewards?: Maybe<Array<BaseballReward>>;
  claimNBAReferralRewards: Array<NbaReferralReward>;
  claimNBARewards?: Maybe<Array<NbaReward>>;
  completeNBAOnboardingTask: NbaCompleteOnboardingTaskResponse;
  completeOnboardingTask: BaseballCompleteOnboardingTaskResponse;
  createOrUpdateLineup: BaseballCreateOrUpdateLineupResponse;
  createOrUpdateNBALineup: NbaCreateOrUpdateLineupResponse;
  deleteLineup?: Maybe<Scalars['Boolean']>;
};


export type MutationClaimBaseballReferralRewardsArgs = {
  referralIDs: Array<Scalars['UUID']>;
};


export type MutationClaimBaseballRewardsArgs = {
  ids: Array<Scalars['UUID']>;
};


export type MutationClaimNbaReferralRewardsArgs = {
  referralIDs: Array<Scalars['UUID']>;
};


export type MutationClaimNbaRewardsArgs = {
  ids: Array<Scalars['UUID']>;
};


export type MutationCompleteNbaOnboardingTaskArgs = {
  input: NbaCompleteOnboardingTaskInput;
};


export type MutationCompleteOnboardingTaskArgs = {
  input: BaseballCompleteOnboardingTaskInput;
};


export type MutationCreateOrUpdateLineupArgs = {
  input: BaseballCreateOrUpdateLineupInput;
};


export type MutationCreateOrUpdateNbaLineupArgs = {
  input: NbaCreateOrUpdateLineupInput;
};


export type MutationDeleteLineupArgs = {
  id?: InputMaybe<Scalars['UUID']>;
  input?: InputMaybe<BaseballDeleteLineupInput>;
};

export type NbaCard = CardInterface & {
  __typename?: 'NBACard';
  assetId: Scalars['ID'];
  avatarImageUrl: Scalars['String'];
  bonusLossAfterTransfer: Scalars['Float'];
  cardLevel: Scalars['Int'];
  fullImageUrl: Scalars['String'];
  id: Scalars['UUID'];
  owner?: Maybe<User>;
  player: NbaPlayer;
  positions: Array<NbaPlayerPosition>;
  rarity: CardRarity;
  rarityBonus: Scalars['Float'];
  season: Scalars['String'];
  seasonBonus: Scalars['Float'];
  serialNumber: Scalars['Int'];
  slug: Scalars['String'];
  team?: Maybe<NbaTeam>;
  totalBonus: Scalars['Float'];
  xp: Scalars['Int'];
  xpBonus: Scalars['Float'];
  xpThresholdForCurrentCardLevel: Scalars['Int'];
  xpThresholdForNextCardLevel?: Maybe<Scalars['Int']>;
};

export type NbaCardBundleOffer = {
  __typename?: 'NBACardBundleOffer';
  cards: Array<NbaCard>;
  expiresAt: Scalars['Time'];
  id: Scalars['String'];
  leaderboard?: Maybe<NbaLeaderboard>;
  priceUSDCents: Scalars['Int'];
  rank: Scalars['Int'];
  rewardPlayerName: Scalars['String'];
};

export type NbaCardConnection = {
  __typename?: 'NBACardConnection';
  nodes: Array<NbaCard>;
  pageInfo: PageInfo;
};

export type NbaCardForComposeLineup = {
  __typename?: 'NBACardForComposeLineup';
  card: NbaCard;
  tenGameAverageForComposeLineup: Scalars['Int'];
  usedInOtherLineup?: Maybe<NbaLineup>;
};

export type NbaCardForComposeLineupConnection = {
  __typename?: 'NBACardForComposeLineupConnection';
  nodes: Array<NbaCardForComposeLineup>;
  pageInfo: PageInfo;
};

export type NbaCardInLineup = CardInLineupInterface & {
  __typename?: 'NBACardInLineup';
  card: NbaCard;
  gameScores?: Maybe<Array<NbaCardInLineupGameScore>>;
  isMvp: Scalars['Boolean'];
  lineup: NbaLineup;
  playerInFixture: NbaPlayerInFixture;
  score: Scalars['Float'];
  totalBonus: Scalars['Float'];
};

export type NbaCardInLineupGameScore = CardInLineupGameScoreInterface & {
  __typename?: 'NBACardInLineupGameScore';
  detailedGameScores: NbaPlayerGameDetailedScores;
  gameStats: NbaPlayerGameStats;
  score: Scalars['Float'];
};

export type NbaCardTrade = CardTradeInterface & {
  __typename?: 'NBACardTrade';
  expiresAfter?: Maybe<Scalars['Time']>;
  id: Scalars['UUID'];
  isComplete: Scalars['Boolean'];
  userGiveCard: NbaCard;
  userGiveCardUsedInLineup?: Maybe<NbaLineup>;
  userReceiveCard?: Maybe<NbaCard>;
  userReceiveCardChoices: Array<NbaCommonCardSample>;
};

export type NbaCardsInput = {
  assetIds?: InputMaybe<Array<Scalars['ID']>>;
  ids?: InputMaybe<Array<Scalars['UUID']>>;
};

export type NbaCardsPaginated = {
  __typename?: 'NBACardsPaginated';
  cards: Array<NbaCard>;
  currentPage: Scalars['Int'];
  pages: Scalars['Int'];
};

export type NbaCommonCardDrop = {
  __typename?: 'NBACommonCardDrop';
  cardChoices: Array<NbaCommonCardSample>;
  claimedCard?: Maybe<NbaCard>;
  id: Scalars['UUID'];
};

export type NbaCommonCardSample = CommonCardSampleInterface & {
  __typename?: 'NBACommonCardSample';
  commonCardImageUrl: Scalars['String'];
  id: Scalars['UUID'];
  player: NbaPlayer;
};

export type NbaCompleteOnboardingTaskInput = {
  selectedCardPlayerId?: InputMaybe<Scalars['UUID']>;
  task: NbaOnboardingTask;
};

export type NbaCompleteOnboardingTaskResponse = {
  __typename?: 'NBACompleteOnboardingTaskResponse';
  currentSportsUser?: Maybe<CurrentSportsUser>;
  /** @deprecated use currentSportsUser */
  currentUser?: Maybe<CurrentNbaUser>;
};

export enum NbaConference {
  Eastern = 'EASTERN',
  Western = 'WESTERN'
}

export type NbaCreateOrUpdateLineupInput = {
  cardSlugs: Array<Scalars['String']>;
  leaderboardSlug: Scalars['String'];
  lineupId?: InputMaybe<Scalars['UUID']>;
};

export type NbaCreateOrUpdateLineupResponse = {
  __typename?: 'NBACreateOrUpdateLineupResponse';
  createdLineup?: Maybe<NbaLineup>;
  lineupValidationErrors: Array<NbaCreateOrUpdateLineupValidationError>;
};

export enum NbaCreateOrUpdateLineupValidationError {
  AllowedRaritiesViolation = 'ALLOWED_RARITIES_VIOLATION',
  MinRarityViolation = 'MIN_RARITY_VIOLATION'
}

export type NbaCurrentUserData = {
  __typename?: 'NBACurrentUserData';
  onboardingState: NbaOnboarding;
};

export type NbaDeleteLineupInput = {
  lineupId: Scalars['UUID'];
};

export type NbaFixture = FixtureInterface & {
  __typename?: 'NBAFixture';
  endDate: Scalars['Time'];
  fixtureState: FixtureState;
  gameWeek: Scalars['Int'];
  games: Array<NbaGame>;
  id: Scalars['UUID'];
  leaderboards: Array<NbaLeaderboard>;
  myEligibleGames: Array<NbaGame>;
  myLineups: Array<NbaLineup>;
  myLiveLineupGames: Array<NbaGameWithCardInLineup>;
  nextFixture?: Maybe<NbaFixture>;
  playerFixtureStats: NbaPlayerFixtureStatsConnection;
  previousFixture?: Maybe<NbaFixture>;
  rewardPool: Array<NbaPlayer>;
  slug: Scalars['String'];
  startDate: Scalars['Time'];
};


export type NbaFixturePlayerFixtureStatsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  hideUnownedPlayers?: InputMaybe<Scalars['Boolean']>;
  order?: InputMaybe<PlayerFixtureStatsSortOrder>;
};


export type NbaFixtureRewardPoolArgs = {
  cardRarity?: InputMaybe<CardRarity>;
  rarity?: InputMaybe<BaseballCardRarity>;
  tier: Scalars['Int'];
};

export type NbaFixtureConnection = {
  __typename?: 'NBAFixtureConnection';
  nodes: Array<NbaFixture>;
  pageInfo: PageInfo;
};

export type NbaGame = GameInterface & {
  __typename?: 'NBAGame';
  awayScore: Scalars['Int'];
  awayTeam: NbaTeam;
  homeScore: Scalars['Int'];
  homeTeam: NbaTeam;
  id: Scalars['UUID'];
  isHalftime: Scalars['Boolean'];
  pastPlayerPerformance: Array<NbaPlayerGameStats>;
  quarter: Scalars['Int'];
  startDate: Scalars['Time'];
  status: GameStatus;
};


export type NbaGamePastPlayerPerformanceArgs = {
  last?: InputMaybe<Scalars['Int']>;
  playerSlug: Scalars['String'];
};

export type NbaGameWithCardInLineup = GameWithCardInLineupInterface & {
  __typename?: 'NBAGameWithCardInLineup';
  awayCardsInLineups: Array<NbaCardInLineup>;
  game: NbaGame;
  homeCardsInLineups: Array<NbaCardInLineup>;
};

export type NbaLeaderboard = LeaderboardInterface & Node & {
  __typename?: 'NBALeaderboard';
  displayName: Scalars['String'];
  displayNameWithoutRarity: Scalars['String'];
  fixture: NbaFixture;
  iconImageUrl: Scalars['String'];
  id: Scalars['UUID'];
  isTraining: Scalars['Boolean'];
  isUserEligible: Scalars['Boolean'];
  leaderboardRarity: LeaderboardRarity;
  lineups: NbaLineupConnection;
  lineupsCount: Scalars['Int'];
  monochromeIconImageUrl: Scalars['String'];
  myComposeLineupCards: NbaCardForComposeLineupConnection;
  myLineups: Array<NbaLineup>;
  prizePool: LeaderboardPrizePool;
  requirements: NbaLeaderboardRequirements;
  scoringStrategy: Scalars['String'];
  slug: Scalars['String'];
};


export type NbaLeaderboardLineupsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};


export type NbaLeaderboardMyComposeLineupCardsArgs = {
  after?: InputMaybe<Scalars['String']>;
  cardsInLineupPartial: Array<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  includeOverTenGameAverageTotalLimit?: InputMaybe<Scalars['Boolean']>;
  includeUsed: Scalars['Boolean'];
  indexInLineup: Scalars['Int'];
  lineupId?: InputMaybe<Scalars['UUID']>;
  query?: InputMaybe<Scalars['String']>;
};

export type NbaLeaderboardRequirements = LeaderboardRequirementsInterface & {
  __typename?: 'NBALeaderboardRequirements';
  allowMVP: Scalars['Boolean'];
  allowedConference?: Maybe<NbaConference>;
  allowedRarities: Array<CardRarity>;
  minRarity?: Maybe<LeaderboardRulesMinimumRarityRequirement>;
  minRookieCount: Scalars['Int'];
  playerAgeRequirements?: Maybe<PlayerAgeRequirements>;
  tenGameAverageTotalLimit: Scalars['Int'];
};

export type NbaLeaderboardRuleRange = {
  __typename?: 'NBALeaderboardRuleRange';
  max: Scalars['Int'];
  min: Scalars['Int'];
};

export type NbaLeaderboardRulesRarityRange = {
  __typename?: 'NBALeaderboardRulesRarityRange';
  common?: Maybe<NbaLeaderboardRuleRange>;
  limited?: Maybe<NbaLeaderboardRuleRange>;
  rare?: Maybe<NbaLeaderboardRuleRange>;
  superRare?: Maybe<NbaLeaderboardRuleRange>;
  unique?: Maybe<NbaLeaderboardRuleRange>;
};

export type NbaLeague = {
  __typename?: 'NBALeague';
  id: Scalars['String'];
  members: Array<User>;
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type NbaLeagueLeaderboard = {
  __typename?: 'NBALeagueLeaderboard';
  leaderboard: NbaLeaderboard;
  league: NbaLeague;
  lineupCount: Scalars['Int'];
  lineups: Array<NbaLeagueLineup>;
  participants: Array<User>;
};

export type NbaLeagueLineup = {
  __typename?: 'NBALeagueLineup';
  leaderboard: NbaLeagueLeaderboard;
  lineup: NbaLineup;
  rank: Scalars['Int'];
};

export type NbaLineup = LineupInterface & {
  __typename?: 'NBALineup';
  cards: Array<NbaCardInLineup>;
  games: Array<NbaGameWithCardInLineup>;
  id: Scalars['UUID'];
  leaderboard: NbaLeaderboard;
  projectedReward?: Maybe<ProjectedReward>;
  rank: Scalars['Int'];
  reward?: Maybe<NbaReward>;
  score: Scalars['Float'];
  user: User;
  xpScore: Scalars['Float'];
};

export type NbaLineupConnection = {
  __typename?: 'NBALineupConnection';
  nodes: Array<NbaLineup>;
  pageInfo: PageInfo;
};

export type NbaOnboarding = {
  __typename?: 'NBAOnboarding';
  leaderboard?: Maybe<NbaLeaderboard>;
  nextTask: NbaOnboardingTask;
  selectCardOptions: Array<NbaOnboardingCardOption>;
};

export type NbaOnboardingCardOption = {
  __typename?: 'NBAOnboardingCardOption';
  commonCardImageUrl: Scalars['String'];
  player: NbaPlayer;
};

export enum NbaOnboardingTask {
  NoTask = 'NO_TASK',
  SelectStarterCard = 'SELECT_STARTER_CARD'
}

export type NbaPlayer = PlayerInterface & {
  __typename?: 'NBAPlayer';
  age: Scalars['Int'];
  avatarImageUrl: Scalars['String'];
  birthDate: Scalars['Time'];
  birthPlaceCountry: Scalars['String'];
  displayName: Scalars['String'];
  firstName: Scalars['String'];
  /** @deprecated use PlayerInFixture.upcomingGames */
  fixtureGames: Array<NbaGame>;
  id: Scalars['UUID'];
  inFixture?: Maybe<NbaPlayerInFixture>;
  isActive: Scalars['Boolean'];
  lastName: Scalars['String'];
  latestFinalFixtureStats: Array<NbaPlayerInFixture>;
  /** @deprecated use latestFixtureStats */
  latestFinalGameStats: Array<NbaPlayerGameStats>;
  latestFixtureStats: Array<NbaPlayerInFixture>;
  positions: Array<NbaPlayerPosition>;
  shirtNumber: Scalars['Int'];
  slug: Scalars['String'];
  team?: Maybe<NbaTeam>;
  tenGameAverage: Scalars['Int'];
  upcomingGames: Array<NbaGame>;
};


export type NbaPlayerFixtureGamesArgs = {
  fixtureSlug: Scalars['String'];
};


export type NbaPlayerInFixtureArgs = {
  fixtureSlug: Scalars['String'];
};


export type NbaPlayerLatestFinalFixtureStatsArgs = {
  last: Scalars['Int'];
};


export type NbaPlayerLatestFinalGameStatsArgs = {
  last: Scalars['Int'];
};


export type NbaPlayerLatestFixtureStatsArgs = {
  last: Scalars['Int'];
};


export type NbaPlayerUpcomingGamesArgs = {
  next: Scalars['Int'];
};

export type NbaPlayerFixtureStatsConnection = {
  __typename?: 'NBAPlayerFixtureStatsConnection';
  nodes: Array<NbaPlayerInFixture>;
  pageInfo: PageInfo;
};

export type NbaPlayerGameDetailedScores = {
  __typename?: 'NBAPlayerGameDetailedScores';
  assists: Scalars['Float'];
  blocks: Scalars['Float'];
  doubleDoubles: Scalars['Float'];
  fieldGoalAttempts: Scalars['Float'];
  freeThrowAttempts: Scalars['Float'];
  made3PointFGs: Scalars['Float'];
  points: Scalars['Float'];
  rebounds: Scalars['Float'];
  steals: Scalars['Float'];
  tripleDoubles: Scalars['Float'];
  turnovers: Scalars['Float'];
};

export type NbaPlayerGameDetailedStats = {
  __typename?: 'NBAPlayerGameDetailedStats';
  assists: Scalars['Int'];
  blocks: Scalars['Int'];
  doubleDoubles: Scalars['Int'];
  made3PointFGs: Scalars['Int'];
  minutes?: Maybe<Scalars['String']>;
  points: Scalars['Int'];
  rebounds: Scalars['Int'];
  steals: Scalars['Int'];
  tripleDoubles: Scalars['Int'];
  turnovers: Scalars['Int'];
};

export type NbaPlayerGameStats = PlayerGameStatsInterface & {
  __typename?: 'NBAPlayerGameStats';
  detailedScores?: Maybe<NbaPlayerGameDetailedScores>;
  detailedStats?: Maybe<NbaPlayerGameDetailedStats>;
  game: NbaGame;
  playedInGame: Scalars['Boolean'];
  score: Scalars['Float'];
  scoreForScoringStrategy: Scalars['Float'];
  team: NbaTeam;
};


export type NbaPlayerGameStatsScoreForScoringStrategyArgs = {
  strategy?: InputMaybe<Scalars['String']>;
};

export type NbaPlayerInFixture = PlayerInFixtureInterface & {
  __typename?: 'NBAPlayerInFixture';
  fixture: NbaFixture;
  player: NbaPlayer;
  score: Scalars['Float'];
  status: NbaPlayerInFixtureStatus;
  tenGameAverage: Scalars['Int'];
};

export type NbaPlayerInFixtureStatus = PlayerInFixtureStatusInterface & {
  __typename?: 'NBAPlayerInFixtureStatus';
  gameStats: Array<NbaPlayerGameStats>;
  inGame: Scalars['Boolean'];
  isScoreFinal: Scalars['Boolean'];
  statusIconType: PlayerInFixtureStatusIconType;
  upcomingGames: Array<NbaGame>;
};

export enum NbaPlayerPosition {
  NbaCenter = 'NBA_CENTER',
  NbaForward = 'NBA_FORWARD',
  NbaGuard = 'NBA_GUARD'
}

export type NbaPrizePoolPrizeLevelBoundary = {
  __typename?: 'NBAPrizePoolPrizeLevelBoundary';
  isPercent: Scalars['Boolean'];
  rank: Scalars['Int'];
};

export type NbaReferralReward = Node & ReferralRewardInterface & {
  __typename?: 'NBAReferralReward';
  card: NbaCard;
  id: Scalars['UUID'];
  state: RewardState;
};

export type NbaReward = RewardInterface & {
  __typename?: 'NBAReward';
  card: NbaCard;
  id: Scalars['UUID'];
  lineup: NbaLineup;
  state: RewardState;
  tier: Scalars['Int'];
};

export type NbaTeam = TeamInterface & {
  __typename?: 'NBATeam';
  abbreviation: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['UUID'];
  market: Scalars['String'];
  name: Scalars['String'];
  players: Array<NbaPlayer>;
  slug: Scalars['String'];
  svgUrl: Scalars['String'];
};

export type Node = {
  id: Scalars['UUID'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
};

export type PlayerAgeRequirements = {
  __typename?: 'PlayerAgeRequirements';
  maxAge?: Maybe<Scalars['Int']>;
  minAge?: Maybe<Scalars['Int']>;
};

export enum PlayerFixtureStatsSortOrder {
  Outperformance = 'OUTPERFORMANCE',
  Score = 'SCORE'
}

export type PlayerGameStatsInterface = {
  game: GameInterface;
  playedInGame: Scalars['Boolean'];
  team: TeamInterface;
};

export type PlayerInFixtureInterface = {
  fixture: FixtureInterface;
  player: PlayerInterface;
  status: PlayerInFixtureStatusInterface;
};

export enum PlayerInFixtureStatusIconType {
  DidNotPlay = 'DID_NOT_PLAY',
  FinalScore = 'FINAL_SCORE',
  Inactive = 'INACTIVE',
  InProgressScore = 'IN_PROGRESS_SCORE',
  NoGame = 'NO_GAME',
  Pending = 'PENDING'
}

export type PlayerInFixtureStatusInterface = {
  gameStats: Array<PlayerGameStatsInterface>;
  inGame: Scalars['Boolean'];
  isScoreFinal: Scalars['Boolean'];
  upcomingGames: Array<GameInterface>;
};

export type PlayerInterface = {
  age: Scalars['Int'];
  avatarImageUrl: Scalars['String'];
  birthDate: Scalars['Time'];
  birthPlaceCountry: Scalars['String'];
  displayName: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['UUID'];
  isActive: Scalars['Boolean'];
  lastName: Scalars['String'];
  shirtNumber: Scalars['Int'];
  slug: Scalars['String'];
  team?: Maybe<TeamInterface>;
};

export type PrizeLevel = {
  __typename?: 'PrizeLevel';
  from: PrizePoolPrizeLevelBoundary;
  rarity: CardRarity;
  tier: Scalars['Int'];
  to: PrizePoolPrizeLevelBoundary;
};

export type PrizePoolPodiumPrize = {
  __typename?: 'PrizePoolPodiumPrize';
  rank: Scalars['Int'];
  rarity: CardRarity;
  tier: Scalars['Int'];
};

export type PrizePoolPrizeLevelBoundary = {
  __typename?: 'PrizePoolPrizeLevelBoundary';
  isPercent: Scalars['Boolean'];
  rank: Scalars['Int'];
};

export type ProjectedReward = {
  __typename?: 'ProjectedReward';
  rarity: CardRarity;
  tier: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  baseballCards: Array<BaseballCard>;
  baseballFixture?: Maybe<BaseballFixture>;
  baseballLeaderboard?: Maybe<BaseballLeaderboard>;
  baseballLiveFixture?: Maybe<BaseballFixture>;
  baseballOpenFixture?: Maybe<BaseballFixture>;
  baseballPastFixtures: BaseballFixtureConnection;
  baseballPlayers: Array<BaseballPlayer>;
  baseballReferralRewards?: Maybe<Array<BaseballReferralReward>>;
  baseballTeam?: Maybe<BaseballTeam>;
  /** @deprecated use baseballCards */
  card?: Maybe<BaseballCard>;
  cards: Array<BaseballCard>;
  currentNBAUser?: Maybe<CurrentNbaUser>;
  currentSportsUser?: Maybe<CurrentSportsUser>;
  /** @deprecated use currentSportsUser */
  currentUser?: Maybe<CurrentBaseballUser>;
  /** @deprecated use baseballFixture */
  fixture?: Maybe<BaseballFixture>;
  /** @deprecated use baseballLeaderboard */
  leaderboard?: Maybe<BaseballLeaderboard>;
  lineup?: Maybe<BaseballLineup>;
  /** @deprecated use baseballLiveFixture */
  liveFixture?: Maybe<BaseballFixture>;
  nbaCard?: Maybe<NbaCard>;
  nbaCards: Array<NbaCard>;
  nbaFixture?: Maybe<NbaFixture>;
  nbaLeaderboard?: Maybe<NbaLeaderboard>;
  nbaLineup?: Maybe<NbaLineup>;
  nbaLiveFixture?: Maybe<NbaFixture>;
  nbaOpenFixture?: Maybe<NbaFixture>;
  nbaPastFixtures: NbaFixtureConnection;
  nbaPlayer?: Maybe<NbaPlayer>;
  nbaPlayers: Array<NbaPlayer>;
  nbaReferralRewards: Array<NbaReferralReward>;
  nbaTeam?: Maybe<NbaTeam>;
  /** @deprecated use baseballOpenFixture */
  openFixture?: Maybe<BaseballFixture>;
  /** @deprecated use baseballPastFixtures */
  pastFixtures: BaseballFixtureConnection;
  /** @deprecated use baseballPlayers */
  player?: Maybe<BaseballPlayer>;
  /** @deprecated use baseballTeam */
  team?: Maybe<BaseballTeam>;
  user?: Maybe<User>;
};


export type QueryBaseballCardsArgs = {
  slugs?: InputMaybe<Array<Scalars['String']>>;
};


export type QueryBaseballFixtureArgs = {
  slug: Scalars['String'];
};


export type QueryBaseballLeaderboardArgs = {
  slug: Scalars['String'];
};


export type QueryBaseballPastFixturesArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};


export type QueryBaseballPlayersArgs = {
  slugs?: InputMaybe<Array<Scalars['String']>>;
};


export type QueryBaseballReferralRewardsArgs = {
  referralIDs: Array<Scalars['UUID']>;
};


export type QueryBaseballTeamArgs = {
  slug: Scalars['String'];
};


export type QueryCardArgs = {
  slug: Scalars['String'];
};


export type QueryCardsArgs = {
  input: BaseballCardsInput;
};


export type QueryFixtureArgs = {
  slug: Scalars['String'];
};


export type QueryLeaderboardArgs = {
  slug: Scalars['String'];
};


export type QueryLineupArgs = {
  id: Scalars['UUID'];
};


export type QueryNbaCardArgs = {
  slug: Scalars['String'];
};


export type QueryNbaCardsArgs = {
  input?: InputMaybe<NbaCardsInput>;
  slugs?: InputMaybe<Array<Scalars['String']>>;
};


export type QueryNbaFixtureArgs = {
  slug: Scalars['String'];
};


export type QueryNbaLeaderboardArgs = {
  slug: Scalars['String'];
};


export type QueryNbaLineupArgs = {
  id: Scalars['UUID'];
};


export type QueryNbaPastFixturesArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};


export type QueryNbaPlayerArgs = {
  slug: Scalars['String'];
};


export type QueryNbaPlayersArgs = {
  slugs?: InputMaybe<Array<Scalars['String']>>;
};


export type QueryNbaReferralRewardsArgs = {
  referralIDs: Array<Scalars['UUID']>;
};


export type QueryNbaTeamArgs = {
  slug: Scalars['String'];
};


export type QueryPastFixturesArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};


export type QueryPlayerArgs = {
  slug: Scalars['String'];
};


export type QueryTeamArgs = {
  slug: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['UUID'];
};

export type ReferralRewardInterface = {
  card: CardInterface;
  id: Scalars['UUID'];
  state: RewardState;
};

export type RewardInterface = {
  card: CardInterface;
  id: Scalars['UUID'];
  lineup: LineupInterface;
  state: RewardState;
  tier: Scalars['Int'];
};

export enum RewardState {
  Claimed = 'CLAIMED',
  Unclaimed = 'UNCLAIMED'
}

export type TeamInterface = {
  abbreviation: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['UUID'];
  market: Scalars['String'];
  name: Scalars['String'];
  players: Array<PlayerInterface>;
  slug: Scalars['String'];
  svgUrl: Scalars['String'];
};

export type User = UserInterface & {
  __typename?: 'User';
  avatarUrl: Scalars['String'];
  id: Scalars['UUID'];
  nickname: Scalars['String'];
  slug: Scalars['String'];
};

export type UserInterface = {
  id: Scalars['UUID'];
  nickname: Scalars['String'];
  slug: Scalars['String'];
};

export type CurrentUserQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQueryQuery = { __typename?: 'Query', currentSportsUser?: { __typename?: 'CurrentSportsUser', id: any, nickname: string } | null };

export type CurrentUserNbaCardsQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type CurrentUserNbaCardsQuery = { __typename?: 'Query', currentSportsUser?: { __typename?: 'CurrentSportsUser', nbaCards: { __typename?: 'NBACardConnection', nodes: Array<{ __typename?: 'NBACard', id: any, slug: string, fullImageUrl: string, rarity: CardRarity, serialNumber: number, season: string, player: { __typename?: 'NBAPlayer', slug: string }, team?: { __typename?: 'NBATeam', name: string, fullName: string } | null }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string } } } | null };

export type NbaCardQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type NbaCardQuery = { __typename?: 'Query', nbaCard?: { __typename?: 'NBACard', id: any, slug: string, fullImageUrl: string, avatarImageUrl: string, season: string, serialNumber: number, rarity: CardRarity, player: { __typename?: 'NBAPlayer', id: any, slug: string, displayName: string, shirtNumber: number } } | null };


export const CurrentUserQueryDocument = gql`
    query CurrentUserQuery {
  currentSportsUser {
    id
    nickname
  }
}
    `;
export const CurrentUserNbaCardsDocument = gql`
    query CurrentUserNBACards($first: Int!, $after: String) {
  currentSportsUser {
    nbaCards(first: $first, after: $after) {
      nodes {
        id
        slug
        fullImageUrl
        rarity
        serialNumber
        season
        player {
          slug
        }
        team {
          name
          fullName
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
    `;
export const NbaCardDocument = gql`
    query NBACard($slug: String!) {
  nbaCard(slug: $slug) {
    id
    slug
    fullImageUrl
    avatarImageUrl
    season
    serialNumber
    rarity
    player {
      id
      slug
      displayName
      shirtNumber
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CurrentUserQuery(variables?: CurrentUserQueryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CurrentUserQueryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CurrentUserQueryQuery>(CurrentUserQueryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CurrentUserQuery', 'query');
    },
    CurrentUserNBACards(variables: CurrentUserNbaCardsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CurrentUserNbaCardsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CurrentUserNbaCardsQuery>(CurrentUserNbaCardsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CurrentUserNBACards', 'query');
    },
    NBACard(variables: NbaCardQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<NbaCardQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<NbaCardQuery>(NbaCardDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'NBACard', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;