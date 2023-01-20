import { Stack } from '@mui/material';
import PlayerCircularItem from '../PlayerCircularItem';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

function WatchList() {
  return (
    <Stack direction="column" spacing={1.5} py={2}>
      <PlayerCircularItem
        cardNumber={1}
        date={tomorrow}
        rarity="superRare"
        src="https://assets.sorare.com/cdn-cgi/image/fit=scale-down,gravity=center,quality=90,width=320/card/38e5604f-8c0c-41a9-b34a-85085b58394f/picture/tinified-e3354c81955b38e616a8bec774a504df.png"
        title="Luka Doncic"
      />
      <PlayerCircularItem
        cardNumber={385}
        date={tomorrow}
        rarity="limited"
        src="https://assets.sorare.com/cdn-cgi/image/fit=scale-down,gravity=center,quality=90,width=320/card/31613bef-7d8a-48d5-97fe-b4c08261de31/picture/tinified-81b2902cf7487de1de5aaa78b255badb.png"
        title="Klay Thompson"
      />
      <PlayerCircularItem
        cardNumber={4}
        date={tomorrow}
        rarity="rare"
        src="https://assets.sorare.com/cdn-cgi/image/fit=scale-down,gravity=center,quality=90,width=320/card/4e01ee24-f778-479c-b49c-d451c34d721d/picture/tinified-a7247c90aa3337202af83ad2859f5917.png"
        title="Jaylen Brown"
      />
      <PlayerCircularItem
        cardNumber={1}
        date={tomorrow}
        rarity="unique"
        src="https://assets.sorare.com/cdn-cgi/image/fit=scale-down,gravity=center,quality=90,width=320/card/d90194ca-bafc-40b7-bf29-19e3bbfcde36/picture/tinified-84ef0667aeb39dc6a442c90a44271ff6.png"
        title="Juancho Hernangomez"
      />
    </Stack>
  );
}

export default WatchList;
