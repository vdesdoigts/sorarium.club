import HomeButton from '@/front-components/HomeButton';
import Title from '@/front-components/Title';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { User } from '@prisma/client';
import Link from 'next/link';

const bg = '#000'; // feddb2
const textColor = '#fff';

const getRarityLabel = (rarity: string) => {
  switch (rarity) {
    case 'limited':
      return 'Limited cards';
    case 'rare':
      return 'Rare cards';
    case 'super_rare':
      return 'Rare cards';
    default:
      return 'Common cards';
  }
};

interface ProfileProps {
  galleryId: string;
  userUsername: User['sorareUsername'];
  userCards: { _count: { _all: number }; rarity: string }[];
}

export default function GalleryCall({ galleryId, userCards }: ProfileProps) {
  return (
    <Box position="sticky" top={0}>
      <Box pt={2}>
        <Box
          display="flex"
          flexDirection="column"
          p={3}
          bgcolor={bg}
          borderRadius="8px"
          boxShadow="0 1px 3px rgb(25 25 25 / 10%)"
        >
          <Title
            title="Cards"
            sx={{ color: textColor, fontSize: '3rem', lineHeight: 1 }}
          />
          <Box mt={4}>
            <Typography
              component="ul"
              color={textColor}
              sx={{
                listStyle: 'none',
                pl: 0,
                '& li + li': {
                  mt: 0.5
                }
              }}
            >
              {userCards.map(({ _count: { _all }, rarity }) => (
                <Typography
                  key={rarity}
                  component="li"
                  fontSize="1rem"
                  display="flex"
                  justifyContent="space-between"
                >
                  <Box component="span" fontSize="0.875rem">
                    {getRarityLabel(rarity)}
                  </Box>
                  <Box component="span">
                    <Box fontSize="0.875rem">{_all}</Box>
                  </Box>
                </Typography>
              ))}
            </Typography>
          </Box>
          <Box mt={6}>
            <Link href={`/galleries/${galleryId}`} passHref>
              <HomeButton title="Explore" />
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
