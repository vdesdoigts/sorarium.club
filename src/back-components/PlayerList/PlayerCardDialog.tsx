import { CardRarity, NbaCard } from '@/gql/sdk';
import { NbaPlayerWithTeam } from '@/utils/types';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel, {
  FormControlLabelProps
} from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { NbaSorareCard } from '@prisma/client';
import axios from 'axios';
import { useEffect, useState } from 'react';

const maxSerialNumberByRarity = {
  [CardRarity.Limited]: 5000,
  [CardRarity.Rare]: 1000,
  [CardRarity.SuperRare]: 100
};

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  '.MuiFormControlLabel-label': checked && {
    color: theme.palette.primary.main
  }
}));

function MyFormControlLabel(props: FormControlLabelProps) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

interface CollectionListItemProps {
  player?: NbaPlayerWithTeam;
  open: boolean;
  onClose: () => void;
  onSelectPlayerCard?: (player: NbaSorareCard) => void;
}

function PlayerCardDialog({
  player,
  open,
  onClose,
  onSelectPlayerCard
}: CollectionListItemProps) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [rarity, setRarity] = useState<CardRarity>(CardRarity.Limited);
  const [serialNumber, setSerialNumber] = useState<number>(1);
  const [withoutSerialNumber, setWithoutSerialNumber] =
    useState<boolean>(false);

  useEffect(() => {
    setSerialNumber(1);
  }, [rarity]);

  const getNbaSorareCard = async () => {
    setLoading(true);
    try {
      const res = await axios.get<{ card: NbaCard }>(
        `/api/sorare/nba-cards/${player.sorareSlug}-2022-${rarity}-${
          withoutSerialNumber ? 1 : serialNumber
        }`
      );

      if (res.data.card) {
        const nbaSorareCard = await axios.post<NbaSorareCard>(
          `/api/nba-sorare-card`,
          {
            card: {
              sorareId: res.data.card.id,
              player: player,
              rarity: res.data.card.rarity,
              serialNumber: withoutSerialNumber
                ? 0
                : res.data.card.serialNumber,
              slug: res.data.card.slug,
              imageUrl: res.data.card.fullImageUrl,
              season: res.data.card.season
            }
          }
        );

        onSelectPlayerCard && onSelectPlayerCard(nbaSorareCard.data);
      }
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const handleRarityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRarity((event.target as HTMLInputElement).value as CardRarity);
  };

  const handleSliderChange = (_: Event, newValue: number) => {
    setSerialNumber(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSerialNumber(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (serialNumber < 0) {
      setSerialNumber(0);
    } else if (serialNumber > maxSerialNumberByRarity[rarity]) {
      setSerialNumber(maxSerialNumberByRarity[rarity]);
    }
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Add {player?.fullName}'s card</DialogTitle>
      <DialogContent>
        <Box py={2}>
          <RadioGroup
            name="rarity"
            value={rarity}
            defaultValue={CardRarity.Limited}
            onChange={handleRarityChange}
          >
            <Grid container>
              <Grid item xs={12} md={6}>
                <MyFormControlLabel
                  value={CardRarity.Limited}
                  label="Limited"
                  control={<Radio />}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MyFormControlLabel
                  value={CardRarity.Rare}
                  label="Rare"
                  control={<Radio />}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MyFormControlLabel
                  value={CardRarity.SuperRare}
                  label="Super Rare"
                  control={<Radio />}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MyFormControlLabel
                  value={CardRarity.Unique}
                  label="Unique"
                  control={<Radio />}
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </Box>
        {rarity !== CardRarity.Unique && (
          <>
            <Box pb={2}>
              <MyFormControlLabel
                label="I'm not looking for a specific serial number"
                checked={withoutSerialNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setWithoutSerialNumber(e.target.checked)
                }
                control={<Checkbox />}
              />
            </Box>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <TextField
                  value={serialNumber}
                  size="small"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  disabled={withoutSerialNumber}
                  inputProps={{
                    step: 1,
                    min: 1,
                    max: maxSerialNumberByRarity[rarity],
                    type: 'number',
                    sx: {
                      width: '56px',
                      height: '38px'
                    },
                    'aria-labelledby': 'input-slider'
                  }}
                />
              </Grid>
              <Grid item xs>
                <Slider
                  min={1}
                  max={maxSerialNumberByRarity[rarity]}
                  disabled={withoutSerialNumber}
                  value={typeof serialNumber === 'number' ? serialNumber : 0}
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                />
              </Grid>
            </Grid>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton
          loading={isLoading}
          variant="contained"
          onClick={getNbaSorareCard}
        >
          Add
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default PlayerCardDialog;
