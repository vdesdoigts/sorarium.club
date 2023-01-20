import type { NbaSorareCardWithPlayer } from '@/utils/types';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Card from './Card';

interface CollectionsProps {
  cards: NbaSorareCardWithPlayer[];
  hasNextPage?: boolean;
  isLoading?: boolean;
  onPaginationChange?: () => void;
}

export default function Gallery({
  cards,
  hasNextPage,
  isLoading,
  onPaginationChange
}: CollectionsProps) {
  return (
    <Box mx="auto">
      <Box
        overflow="hidden"
        position="relative"
        p={3}
        bgcolor="#fff"
        borderRadius="8px"
        boxShadow="0 1px 3px rgb(25 25 25 / 10%)"
      >
        {cards.length === 0 ? (
          <Box textAlign="center" py={2}>
            No cards
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: 'grid',
                gap: '1.5rem',
                gridTemplateColumns: {
                  xs: 'repeat(auto-fill, minmax(100px, 1fr))',
                  sm: 'repeat(auto-fill, minmax(190px, 1fr))'
                }
              }}
            >
              {cards.map((card) => (
                <Link
                  key={card.id}
                  passHref
                  href={`https://sorare.com/nba/cards/${card.slug}`}
                >
                  <Box
                    component="a"
                    target="_blank"
                    sx={{ textDecoration: 'none' }}
                  >
                    <Card id={`${card.id}`} card={card} />
                  </Box>
                </Link>
              ))}
            </Box>
            {hasNextPage && (
              <Box textAlign="center" pt={3}>
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
        )}
      </Box>
    </Box>
  );
}
