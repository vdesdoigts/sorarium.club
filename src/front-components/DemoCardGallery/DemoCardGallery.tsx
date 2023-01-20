import CardDnd, { ItemTypes } from '@/back-components/CardGallery/CardDnd';
import type { NbaSorareCardWithPlayer } from '@/utils/types';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import { useDrop } from 'react-dnd';

interface CardGalleryProps {
  cards: NbaSorareCardWithPlayer[];
  hasNextPage?: boolean;
  isLoading?: boolean;
  findCard: (id: string) => { index: number };
  moveCard: (id: string, to: number) => void;
  removeCard?: (id: string) => void;
  onPaginationChange?: () => void;
}

export default function DemoCardGallery({
  cards,
  hasNextPage,
  isLoading,
  findCard,
  moveCard,
  removeCard,
  onPaginationChange
}: CardGalleryProps) {
  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));

  return (
    <>
      <Box pb={1}>
        <Box
          ref={drop}
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(auto-fill, minmax(100px, 1fr))',
              sm: 'repeat(auto-fill, minmax(190px, 1fr))'
            },
            gridGap: '20px',
            height: '100%'
          }}
          py={2}
          px={2}
          m={0}
        >
          {cards.map((card) => (
            <CardDnd
              key={card.id}
              id={`${card.id}`}
              card={card}
              findCard={findCard}
              moveCard={moveCard}
              removeCard={removeCard}
            />
          ))}
        </Box>
      </Box>
      {hasNextPage && (
        <Box textAlign="center" pb={3}>
          <LoadingButton
            variant="contained"
            loading={isLoading}
            onClick={onPaginationChange}
          >
            Load More
          </LoadingButton>
        </Box>
      )}
    </>
  );
}
