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

          <Typography sx={{ color: '#8E92A3', maxWidth: '824px' }}> 
          {t('Stake is a common concept in the blockchain and cryptocurrency space. It refers to locking a certain amount of cryptocurrency assets in a specific smart contract in order to gain certain rights or rewards.')}
          </Typography>
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
