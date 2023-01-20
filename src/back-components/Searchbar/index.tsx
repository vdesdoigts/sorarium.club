import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.04),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.06)
  },
  padding: theme.spacing(0.6, 1),
  width: '100%'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: '100%',
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%'
  }
}));

interface SearchbarProps {
  isSearching?: boolean;
  placeholder?: string;
  searchTerm?: string;
  setSearchTerm: (searchTerm: string) => void;
}

function Searchbar({
  isSearching,
  placeholder,
  searchTerm,
  setSearchTerm
}: SearchbarProps) {
  return (
    <Search>
      <Box
        sx={(theme) => ({
          padding: theme.spacing(0, 2),
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        })}
      >
        <SearchIcon />
      </Box>
      <StyledInputBase
        placeholder={placeholder || 'Search players'}
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      {isSearching && (
        <Box
          sx={(theme) => ({
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            top: 0,
            right: 0,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          })}
        >
          <CircularProgress size={16} />
        </Box>
      )}
    </Search>
  );
}

export default Searchbar;
