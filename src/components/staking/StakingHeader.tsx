import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { FormattedNumber } from '../primitives/FormattedNumber';
import { TopInfoPanel } from '../primitives/TopInfoPanel';
import { TopInfoPanelItem } from '../primitives/TopInfoPanelItem';
import { Trans } from '@lingui/react';
import { useTranslation } from 'react-i18next';

interface StakingHeaderProps {
  tvl: string;
  stkEmission: string;
  loading: boolean;
}

export const StakingHeader: React.FC<StakingHeaderProps> = ({ tvl, stkEmission, loading }) => {
  const theme = useTheme();
  // const upToLG = useMediaQuery(theme.breakpoints.up('lg'));
  const downToSM = useMediaQuery(theme.breakpoints.down('sm'));
  // const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));

  // const valueTypographyVariant = downToSM ? 'main16' : 'main21';
  // const symbolsTypographyVariant = downToSM ? 'secondary16' : 'secondary21';

  // const isMobile = useMediaQuery('(max-width:1204px)');
  const { t } = useTranslation();

  return (
    <TopInfoPanel
      titleComponent={
        <Box mb={4}>

          <Box sx={{ color: '#8E92A3', maxWidth: '824px',display:'flex',flexDirection:'column', gap:'6px'}}>
            <Typography>Rules Explanation:</Typography>
            <Typography>
              1. The input of ABC is completely lossless.
            </Typography>
            <Typography>
              2. The obtained returns need to be withdrawn together with ABC at the end of the lock-in period.
            </Typography>
            <Typography>
              3. If no manual exit is made within 24 hours after the lock-in period ends, it will automatically default to the next round.
            </Typography> 
          </Box>
          <Typography>

          </Typography>
        </Box>
      }
    >
      {/* <TopInfoPanelItem
        hideIcon
        title={<>Total market size</>}
        loading={loading}
      > 
        <FormattedNumber
          value={tvl || 0}
          symbol="USD"
          variant={valueTypographyVariant}
          symbolsVariant={symbolsTypographyVariant}
          symbolsColor="#A5A8B6"
          visibleDecimals={2}
        />
      </TopInfoPanelItem>

      <TopInfoPanelItem hideIcon title={<>Total emission per day</>} loading={loading}> 
        <FormattedNumber
          value={stkEmission || 0}
          symbol="ABC"
          variant={valueTypographyVariant}
          symbolsVariant={symbolsTypographyVariant}
          symbolsColor="#A5A8B6"
          visibleDecimals={2}
        />
      </TopInfoPanelItem> */}

    </TopInfoPanel>
  );
};
