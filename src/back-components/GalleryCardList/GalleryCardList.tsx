import Scrollbar from '@/back-components/Scrollbar';
import Searchbar from '@/back-components/Searchbar';
import type {
  NbaSorareCardWithPlayer,
  PartialNbaGalleryCardWithCard
} from '@/utils/types';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, IconButton, Stack } from '@mui/material';
import { NbaSorareCard } from '@prisma/client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import PlayerCircularItem from '../PlayerCircularItem';
interface GalleryCardListProps {
  nbaCards: NbaSorareCardWithPlayer[];
  nbaCardsCount: number;
  selectedCards: PartialNbaGalleryCardWithCard[];
  handleSelectCard: (card: NbaSorareCard) => void;
}

function GalleryCardList({
  nbaCards,
  nbaCardsCount,
  selectedCards,
  handleSelectCard
}: GalleryCardListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(nbaCards);
  const [isSearching, setIsSearching] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        axios
          .get(`/api/nba-sorare-card?search=${debouncedSearchTerm}`)
          .then((res) => {
            setIsSearching(false);
            setResults(res.data.galleryCards);
          });
      } else {
        setResults(nbaCards);
        setIsSearching(false);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  return (
    <>
      <Stack direction="column" py={2} px={3} spacing={1}>
        <Searchbar
          isSearching={isSearching}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          placeholder={`Search across your ${nbaCardsCount} cards`}
        />
      </Stack>
      <Box sx={{ flex: 1 }}>
        <Scrollbar>
          <Box>
            <Stack direction="column" py={2}>
              {results
                .filter((item) => item.rarity !== 'common')
                .map((item: any) => {
                  const selected = selectedCards.find(
                    (card) => card.cardId === item.id
                  );

                  return (
                    <Box
                      onClick={() => handleSelectCard(item)}
                      key={item.id}
                      py={0.5}
                      sx={{
                        cursor: 'pointer',
                        '&:hover .MuiIconButton-root': {
                          color: 'primary.main'
                        }
                      }}
                    >
                      <PlayerCircularItem
                        src={item.imageUrl}
                        title={item.player.fullName}
                        rarity={item.rarity}
                        cardNumber={item.serialNumber}
                      >
                        <IconButton
                          color="default"
                          size="small"
                          sx={{
                            transition: 'all 0.3s ease',
                            color: (theme) =>
                              selected
                                ? theme.palette.primary.main
                                : theme.colors.alpha.black[70],
                            bgcolor: 'transparent',
                            '&:hover': {
                              color: 'primary.main',
                              bgcolor: 'transparent'
                            }
                          }}
                        >
                          {selected ? (
                            <CheckCircleIcon />
                          ) : (
                            <AddCircleOutlineOutlinedIcon />
                          )}
                        </IconButton>
                      </PlayerCircularItem>
                    </Box>
                  );
                })}
            </Stack>
          </Box>
        </Scrollbar>
      </Box>
    </>
  );
}

export default GalleryCardList;
