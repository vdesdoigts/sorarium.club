import { NbaSorareCardWithPlayer } from '@/utils/types';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import type { FC } from 'react';
import { memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import CardDndPreview from './CardDndPreview';

export const ItemTypes = {
  CARD: 'card'
};

export interface CardProps {
  id: string;
  card: NbaSorareCardWithPlayer;
  findCard: (id: string) => { index: number };
  moveCard: (id: string, to: number) => void;
  removeCard?: (id: string) => void;
}

interface Item {
  id: string;
  originalIndex: number;
  item: any;
}

const CardDnd: FC<CardProps> = memo(function Card({
  id,
  card,
  moveCard,
  findCard,
  removeCard
}) {
  const originalIndex = findCard(id).index;
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCard(droppedId, originalIndex);
        }
      }
    }),
    [id, originalIndex, moveCard]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      hover({ id: draggedId }: Item) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(draggedId, overIndex);
        }
      }
    }),
    [findCard, moveCard]
  );

  console.log('card: ', card);

  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
        opacity: isDragging ? 0 : 1,
        img: { width: '100%', display: 'block' },
        cursor: 'grab',
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
      <CardDndPreview connect={preview} src={card.imageUrl} />
      <Box position="relative">
        <Box
          ref={(node: any) => drag(drop(node))}
          sx={{
            '& > span': { width: '100% !important' },
            img: { width: '100% !important' }
          }}
        >
          <Image
            priority
            src={card.imageUrl}
            width={257}
            height={416}
            style={{
              width: '100%',
              maxWidth: '100%',
              height: 'auto'
            }}
            alt={card.id}
          />
        </Box>
        {typeof removeCard === 'function' && (
          <Box
            className="card-menu"
            position="absolute"
            bottom="9%"
            left="3%"
            display="flex"
            alignItems="flex-end"
            justifyContent="center"
            width="94%"
            height="200px"
            bgcolor="#000"
            borderRadius="0 0 8px 8px"
            color="#fff"
            sx={{
              opacity: 0,
              transition: 'all .3s ease',
              background:
                'linear-gradient(180deg, transparent 0%, rgba(0,0,0,1) 100%)',
              pointerEvents: 'none',
              '&:hover button': {
                transform: 'scale(1.2)'
              }
            }}
          >
            <IconButton
              onClick={() => removeCard(id)}
              color="inherit"
              size="large"
              sx={{ pointerEvents: 'initial', transition: 'all .3s ease' }}
            >
              <HighlightOffOutlinedIcon fontSize="inherit" />
            </IconButton>
          </Box>
        )}
      </Box>
      {card.serialNumber === 0 && (
        <Box
          position="absolute"
          right="4%"
          bottom="9.1%"
          width="80px"
          height="26px"
          borderRadius="8px"
          bgcolor="#000"
          fontSize="12px"
        />
      )}
    </Box>
  );
});

export default CardDnd;
