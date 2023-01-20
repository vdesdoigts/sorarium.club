import AlertSnackbar from '@/back-components/AlertSnackbar';
import CollectionList from '@/back-components/CollectionList';
import FormCollectionDialog from '@/back-components/FormCollectionDialog';
import MainPaper from '@/back-components/MainPaper';
import { NbaCollectionWithCards } from '@/utils/types';
import AddIcon from '@mui/icons-material/Add';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import { Box, Button, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';

const DEFAULT_LIMIT = 6;

interface CollectionsProps {
  collections: NbaCollectionWithCards[];
}

function DashboardCollections({ collections }: CollectionsProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  });
  const [open, setOpen] = useState<boolean>(false);
  const [openError, setOpenError] = useState<boolean>(false);

  const onOpen = () => {
    if (collections.length >= DEFAULT_LIMIT) {
      setOpenError(true);
    } else {
      setOpen(true);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MainPaper
        headerComponent={
          <Stack direction="row" spacing={2}>
            {matches ? (
              <Button onClick={onOpen}>Create a new collection</Button>
            ) : (
              <IconButton color="primary">
                <AddIcon />
              </IconButton>
            )}
          </Stack>
        }
        icon={StyleOutlinedIcon}
        title="Collections"
      >
        {collections.length === 0 ? (
          <Box textAlign="center" py={2}>
            No collections yet
          </Box>
        ) : (
          <CollectionList collections={collections} />
        )}
      </MainPaper>
      <FormCollectionDialog open={open} onClose={onClose} />
      <AlertSnackbar
        message={`You can only have ${DEFAULT_LIMIT} collections`}
        open={openError}
        onClose={() => setOpenError(false)}
      />
    </>
  );
}

export default DashboardCollections;
