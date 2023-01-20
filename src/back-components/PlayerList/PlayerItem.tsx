import { NbaPlayerWithTeam } from '@/utils/types';
import { Avatar, Box, Stack, Typography } from '@mui/material';

interface CollectionListItemProps {
  player: NbaPlayerWithTeam;
  onSelectPlayer?: () => void;
}

function PlayerItem({ player, onSelectPlayer }: CollectionListItemProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={1.5}
      px={3}
      py={0.5}
      sx={{ cursor: 'pointer' }}
      onClick={onSelectPlayer}
    >
      <Avatar
        alt={player.fullName}
        src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.nbaId}.png`}
        sx={{
          width: '48px',
          height: '48px',
          borderRadius: '8px',
          bgcolor: (theme) => theme.sidebar.menuItemBgActive,
          img: {
            objectFit: 'cover',
            objectPosition: 'center'
          }
        }}
      />
      <Box sx={{ flex: 1 }}>
        <Stack direction="column" spacing={0.5}>
          <Typography variant="subtitle1" sx={{ lineHeight: 1.1 }} noWrap>
            {player.fullName}
          </Typography>
          <Stack direction="row" spacing={0.5} justifyContent="space-between">
            <Typography variant="subtitle2" sx={{ lineHeight: 1.1 }}>
              {player.teams[0]?.team.name}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}

export default PlayerItem;
