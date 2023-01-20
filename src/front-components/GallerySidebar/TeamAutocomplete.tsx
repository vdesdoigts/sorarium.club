import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { NbaTeam } from '@prisma/client';

interface TeamAutocompleteProps {
  value: string;
  options: NbaTeam[];
  onChange: (value: string) => void;
}

export default function TeamAutocomplete({
  value,
  options,
  onChange
}: TeamAutocompleteProps) {
  return (
    <Autocomplete
      disablePortal
      id="team-autocomplete"
      options={options.map((option) => ({
        label: option.name,
        value: option.id
      }))}
      sx={{ width: '100%' }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            // inputProps={{ ...params.inputProps, value }}
            label="Teams"
          />
        );
      }}
      value={value ? value : null}
      inputValue={value ? options.find(({ id }) => value === id).name : ''}
      onChange={(_: any, values: { label: string; value: string } | null) => {
        onChange(values?.value);
      }}
      filterOptions={() =>
        options.map((option) => ({
          label: option.name,
          value: option.id
        }))
      }
    />
  );
}
