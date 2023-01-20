import { NbaSorareCardWithPlayer } from '@/utils/types';
import Box from '@mui/material/Box';
import Image from 'next/image';
import type { FC } from 'react';
import { memo } from 'react';

export interface CardProps {
  id: string;
  card: NbaSorareCardWithPlayer;
}

const CardDnd: FC<CardProps> = memo(function Card({ card }) {
  return (
    <Box
      sx={{
        flex: '1 0 220px',
        overflow: 'hidden',
        position: 'relative',
        borderRadius: '22px',
        img: { width: '100%', display: 'block' },
        cursor: 'pointer',
        '&:hover:after': {
          transform: 'rotate( 25deg )',
          top: '-40%',
          opacity: '.15'
        },
        '&:after': {
          position: 'absolute',
          content: '""',
          zIndex: 10,
          width: '200%',
          height: '100%',
          top: '-90%',
          left: '-20px',
          opacity: '.1',
          transform: 'rotate( 45deg )',
          background:
            'linear-gradient(to top, transparent, #fff 15%, rgba(255, 255, 255, .5))',
          transition: '.3s',
          pointerEvents: 'none'
        },
        '&:hover .card-menu': {
          opacity: 1
        }
      }}
    >
      <Box position="relative">
        <Image
          priority
          src={card.imageUrl}
          width={257}
          height={416}
          style={{
            maxWidth: '100%',
            height: 'auto'
          }}
          alt={card.id}
        />
      </Box>
    </Box>
  );
});

export default CardDnd;
