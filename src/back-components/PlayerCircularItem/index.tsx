import { Box, Stack, Typography } from '@mui/material';
import { intervalToDuration } from 'date-fns';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const rarityLabels = {
  limited: 'Limited',
  rare: 'Rare',
  superRare: 'Super Rare',
  unique: 'Unique'
};

const quantities = {
  limited: 5000,
  rare: 1000,
  superRare: 100,
  unique: 1
};

interface CollectionListItemProps {
  children?: React.ReactNode;
  cardNumber?: number;
  date?: Date;
  rarity: string;
  src: string;
  title: string;
}

function PlayerCircularItem({
  children,
  cardNumber,
  date,
  rarity,
  src,
  title
}: CollectionListItemProps) {
  const randomD = randomDate(new Date(), tomorrow);
  const [duration, setDuration] = useState<any>();

  useEffect(() => {
    const res = setInterval(() => {
      const interval = intervalToDuration({
        start: new Date(),
        end: randomD
      });
      setDuration(interval);
    }, 1000);

    return () => clearInterval(res);
  }, []);

  return (
    <Stack direction="row" alignItems="center" spacing={1.5} px={3}>
      <Box
        sx={{
          overflow: 'hidden',
          // p: '2px',
          width: '48px',
          height: '52px',
          bgcolor: (theme) => theme.palette[rarity].main,
          borderRadius: '8px',
          img: {
            objectPosition: '0px 0px'
          }
        }}
      >
        <Image
          priority
          src={src}
          width={50}
          height={81}
          style={{
            maxWidth: '100%',
            height: 'auto'
          }}
          alt={title}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Stack direction="column" spacing={0.5}>
          <Typography variant="subtitle1" sx={{ lineHeight: 1 }} noWrap>
            {title}
          </Typography>
          <Stack direction="row" spacing={0.5} justifyContent="space-between">
            <Typography
              variant="subtitle2"
              sx={{
                lineHeight: 1
                // color: (theme) => theme.palette[rarity].main
              }}
            >{`${rarityLabels[rarity]} ${cardNumber || '*'}/${
              quantities[rarity]
            }`}</Typography>
            {date && (
              <Typography variant="subtitle2" sx={{ lineHeight: 1 }}>
                {duration && (
                  <>
                    {duration.days
                      ? duration.days < 10
                        ? '0' + duration.days
                        : duration.days
                      : null}
                    {duration.days ? 'd ' : null}
                    {duration.hours
                      ? duration.hours < 10
                        ? '0' + duration.hours
                        : duration.hours
                      : null}
                    {duration.hours ? 'h ' : null}
                    {duration.minutes < 10
                      ? '0' + duration.minutes
                      : duration.minutes}
                    {'m '}
                    {duration.seconds
                      ? duration.seconds < 10
                        ? '0' + duration.seconds
                        : duration.seconds
                      : null}
                    {duration.seconds && 's'}
                  </>
                )}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Box>
      {children}
      {/* <Stack direction="row" spacing={0.5} pt={0.5}>
        <Chip
            label={`${cardNumber || '*'}/${quantities[rarity]}`}
            color={rarity}
            variant="outlined"
            sx={{
              minWidth: '90px'
            }}
          />
      </Stack> */}
    </Stack>
  );
}

export default PlayerCircularItem;
