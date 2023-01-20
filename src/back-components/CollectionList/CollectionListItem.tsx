import { NbaCollectionCardWithCard } from '@/utils/types';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import {
  Avatar,
  AvatarGroup,
  Box,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import { NbaCollection } from '@prisma/client';
import Link from 'next/link';
import { useDrag, useDrop } from 'react-dnd';

export const ItemTypes = {
  COLLECTION: 'collection'
};

interface Item {
  id: string;
  originalIndex: number;
  item: any;
}
interface CollectionListItemProps {
  id: NbaCollection['id'];
  title: NbaCollection['title'];
  description: NbaCollection['description'];
  cards: NbaCollectionCardWithCard[];
  cardsCount: number;
  moveCollection: (id: string, to: number) => void;
  findCollection: (id: string) => { index: number };
  submitCollections: () => void;
}

function CollectionListItem({
  id,
  title,
  description,
  cards,
  cardsCount,
  moveCollection,
  findCollection,
  submitCollections
}: CollectionListItemProps) {
  const originalIndex = findCollection(id).index;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.COLLECTION,
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      }),
      end: () => {
        submitCollections();
      }
    }),
    [id, originalIndex, moveCollection]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.COLLECTION,
      hover({ id: draggedId }: Item) {
        if (draggedId !== id) {
          const { index: overIndex } = findCollection(id);
          moveCollection(draggedId, overIndex);
        }
      }
    }),
    [findCollection, moveCollection]
  );

  return (
    <Stack
      ref={(node: any) => drag(drop(node))}
      direction="row"
      alignItems="center"
      spacing={3}
      px={3}
      py={2}
      sx={{
        opacity: isDragging ? 0 : 1
      }}
    >
      <Box
        sx={{
          cursor: 'grab',
          alignSelf: 'stretch',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <DragIndicatorOutlinedIcon />
      </Box>
      <Box
        sx={(theme) => ({
          [theme.breakpoints.down('md')]: {
            display: 'none'
          }
        })}
      >
        <AvatarGroup
          total={cardsCount}
          variant="rounded"
          sx={{
            '& .MuiAvatar-root': {
              width: '44px',
              height: '71px'
            }
          }}
        >
          {cards.map((card) => (
            <Avatar key={card.id} src={card.card.imageUrl} />
          ))}
        </AvatarGroup>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="subtitle2">{description}</Typography>
      </Box>
      <Box>
        <Link href={`dashboard/collections/${id}`} passHref>
          <IconButton color="primary">
            <ModeEditOutlinedIcon />
          </IconButton>
        </Link>
      </Box>
    </Stack>
  );
}

export default CollectionListItem;
