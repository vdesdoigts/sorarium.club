import {
  Box,
  Divider,
  Paper,
  Stack,
  SxProps,
  Typography,
  TypographyProps
} from '@mui/material';

interface MainPaperProps {
  children: React.ReactNode;
  contentSx?: SxProps;
  headerComponent?: React.ReactNode;
  icon?: any;
  title: string;
  component?: React.ElementType;
  withDivider?: boolean;
}

function MainPaper({
  children,
  contentSx,
  headerComponent,
  icon,
  title,
  variant = 'cardHeaderTitle',
  component = 'h3',
  withDivider = true,
  ...props
}: MainPaperProps & TypographyProps) {
  const Icon = icon;
  const itemIcon = icon && (
    <Icon
      sx={{
        fontSize: '1.5rem'
      }}
    />
  );

  return (
    <Paper
      variant="outlined"
      sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        pt={3}
        pb={2}
        px={3}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          {itemIcon}
          <Typography component={component} variant={variant} {...props}>
            {title}
          </Typography>
        </Stack>
        {headerComponent}
      </Stack>
      {withDivider && <Divider />}
      <Box sx={contentSx}>{children}</Box>
    </Paper>
  );
}

export default MainPaper;
