import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import { NbaTeam } from '@prisma/client';
import TeamAutocomplete from './TeamAutocomplete';

export interface FiltersProps {
  team: string;
  onlySerialNumber: boolean;
  sortedByOwner: boolean;
}

interface GallerySidebarProps {
  disabledSortedByOwner?: boolean;
  filters: FiltersProps;
  teams: NbaTeam[];
  onFilterChange: (key: string, value: string) => void;
}

export default function GallerySidebar({
  disabledSortedByOwner,
  filters,
  teams,
  onFilterChange
}: GallerySidebarProps) {
  return (
    <Box
      position="relative"
      p={3}
      bgcolor="#fff"
      borderRadius="8px"
      boxShadow="0 1px 3px rgb(25 25 25 / 10%)"
    >
      <Stack direction="column">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={!disabledSortedByOwner ? filters.sortedByOwner : false}
              />
            }
            disabled={disabledSortedByOwner}
            label="His top Sorare NBA cards"
            value={filters.sortedByOwner}
            onChange={(event: React.SyntheticEvent) =>
              // @ts-ignore
              onFilterChange('sortedByOwner', event.target.checked)
            }
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={filters.onlySerialNumber} />}
            value={filters.onlySerialNumber}
            label="Only special serial numbers"
            onChange={(event: React.SyntheticEvent) =>
              // @ts-ignore
              onFilterChange('onlySerialNumber', event.target.checked)
            }
          />
        </FormGroup>
        <Box pt={2}>
          <TeamAutocomplete
            value={filters.team}
            options={teams}
            onChange={(value: string) => onFilterChange('team', value)}
          />
        </Box>
      </Stack>
    </Box>
  );
}
