import Scrollbar from '@/back-components/Scrollbar';
import Searchbar from '@/back-components/Searchbar';
import type { NbaSorareCardWithPlayer } from '@/utils/types';
import { NbaPlayerWithTeam } from '@/utils/types';
import { Box, Stack } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import PlayerCardDialog from './PlayerCardDialog';
import PlayerItem from './PlayerItem';

interface PlayerListProps {
  players: NbaPlayerWithTeam[];
  handleSelectCard: (card: NbaSorareCardWithPlayer) => void;
}

function GalleryCardList({ players, handleSelectCard }: PlayerListProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<NbaPlayerWithTeam[]>(players);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [selectedPlayer, setSelectedPlayer] = useState<NbaPlayerWithTeam>();

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      axios.get(`/api/players?search=${debouncedSearchTerm}`).then((res) => {
        setIsSearching(false);
        setResults(res.data);
      });
    } else {
      setResults(players);
      setIsSearching(false);
    }
  }, [debouncedSearchTerm]);

  const handleSelectPlayer = (player: NbaPlayerWithTeam) => {
    setSelectedPlayer(player);
  };

  return (
    <>
      <Stack direction="column" py={2} px={3} spacing={1}>
        <Searchbar
          isSearching={isSearching}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
        />
      </Stack>
      <Box sx={{ flex: 1 }}>
        <Scrollbar>
          <Box>
            <Stack direction="column" py={2}>
              {results.map((player) => {
                return (
                  <PlayerItem
                    key={player.id}
                    player={player}
                    onSelectPlayer={() => handleSelectPlayer(player)}
                  />
                );
              })}
            </Stack>
          </Box>
        </Scrollbar>
      </Box>
      <PlayerCardDialog
        open={!!selectedPlayer}
        player={selectedPlayer}
        onClose={() => setSelectedPlayer(undefined)}
        onSelectPlayerCard={handleSelectCard}
      />
    </>
  );
}

export default GalleryCardList;
