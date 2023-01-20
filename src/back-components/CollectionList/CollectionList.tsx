import { NbaCollectionWithCards } from '@/utils/types';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { NbaCollection } from '@prisma/client';
import axios from 'axios';
import update from 'immutability-helper';
import { useCallback, useState } from 'react';
import CollectionListItem from './CollectionListItem';

interface CollectionListProps {
  collections: NbaCollectionWithCards[];
}

function CollectionList(props: CollectionListProps) {
  // const [loading, setLoading] = useState<boolean>(false);
  const [collections, setCollections] = useState<NbaCollectionWithCards[]>(
    props.collections
  );

  const onSubmitCollections = async () => {
    // setLoading(true);
    try {
      await axios.put<NbaCollection>('/api/nba-collection', {
        collections: collections.map((collection, index) => ({
          id: collection.id,
          position: index
        }))
      });
    } finally {
      // setLoading(false);
    }
  };

  const findCollection = useCallback(
    (id: string) => {
      const card = collections.filter((c) => `${c.id}` === id)[0];
      return {
        card,
        index: collections.indexOf(card)
      };
    },
    [collections]
  );

  const moveCollection = useCallback(
    (id: string, atIndex: number) => {
      const { card, index } = findCollection(id);
      const res = update(collections, {
        $splice: [
          [index, 1],
          [atIndex, 0, card]
        ]
      });
      setCollections(res);
    },
    [findCollection, setCollections]
  );

  return (
    <Stack direction="column" py={2}>
      {collections.map((collection, index) => (
        <Box key={collection.id}>
          <CollectionListItem
            id={collection.id}
            title={collection.title}
            description={collection.description}
            cards={collection.cards}
            // @ts-ignore
            cardsCount={collection._count.cards}
            findCollection={findCollection}
            moveCollection={moveCollection}
            submitCollections={onSubmitCollections}
          />
          {collections.length !== index + 1 && <Divider />}
        </Box>
      ))}
    </Stack>
  );
}

export default CollectionList;
