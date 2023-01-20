import { NbaWishlistWithCards } from '@/utils/types';
import { Stack } from '@mui/material';
import PlayerCircularItem from '../PlayerCircularItem';

interface WishlistProps {
  wishlist: NbaWishlistWithCards;
}

export default function WishList({ wishlist }: WishlistProps) {
  return (
    <Stack direction="column" spacing={1.5} py={2}>
      {wishlist.cards.map(({ card }) => (
        <PlayerCircularItem
          rarity={card.rarity}
          src={card.imageUrl}
          title={card.player.fullName}
          cardNumber={card.serialNumber}
        />
      ))}
    </Stack>
  );
}
