import {
  NbaCollection,
  NbaCollectionCard,
  NbaGallery,
  NbaGalleryCard,
  NbaPlayer,
  NbaPlayerTeam,
  NbaSorareCard,
  NbaTeam,
  NbaWishlist,
  NbaWishlistCard,
  User
} from '@prisma/client';

// menu
export type Menus = {
  collections: NbaCollection[];
};

export type NbaGalleryWithCards = NbaGallery & {
  cards: PartialNbaGalleryCardWithCard[];
};

export type PartialNbaGalleryWithCards = Partial<NbaGalleryWithCards>;

export type NbaGalleryWithCardsAndPlayers = NbaGallery & {
  cards: NbaGalleryCard[] & { players: NbaPlayer[] };
};

export type PartialNbaSorareCardWithPlayer = Partial<NbaSorareCard> & {
  player: NbaPlayer;
};

export type NbaGalleryCardWithCardAndPlayer = NbaGalleryCard & {
  card: PartialNbaSorareCardWithPlayer;
};

export type PartialNbaGalleryCardWithCardAndPlayer = Partial<NbaGalleryCard> & {
  card: PartialNbaSorareCardWithPlayer;
};

// NBA Player Team
export type NbaPlayerTeamWithTeamAndPlayer = NbaPlayerTeam & {
  player: NbaPlayer;
  team: NbaTeam;
};

// NBA Player
export type NbaPlayerWithTeam = NbaPlayer & {
  teams: NbaPlayerTeamWithTeamAndPlayer[];
};

// Sorare NBA Card
export type NbaSorareCardWithPlayer = NbaSorareCard & {
  player: NbaPlayer;
};

// Gallery
export type NbaGalleryCardWithCard = NbaGalleryCard & {
  card: NbaSorareCardWithPlayer;
};
export type NbaGalleryWithUser = NbaGallery & {
  user: User;
};
export type PartialNbaGalleryCardWithCard = Partial<NbaGalleryCardWithCard>;

// Wishlist
export type NbaWishlistWithCards = NbaWishlist & {
  cards: NbaWishlistCardWithCard[];
};
export type NbaWishlistCardWithCard = NbaWishlistCard & {
  card: NbaSorareCardWithPlayer;
};
export type PartialNbaWishlistCardWithCard = Partial<NbaWishlistCardWithCard>;

// Collection
export type NbaCollectionWithCards = NbaCollection & {
  cards: NbaCollectionCardWithCard[];
};
export type NbaCollectionCardWithCard = NbaCollectionCard & {
  card: NbaSorareCardWithPlayer;
};
export type PartialNbaCollectionCardWithCard =
  Partial<NbaCollectionCardWithCard>;
