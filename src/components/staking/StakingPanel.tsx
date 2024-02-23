import {
  Box, 
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import { useDataContext } from '@/src/hooks/useDataContext';
import { PoolsList } from './PoolsList'; 
import { useTranslation } from 'react-i18next';

// function secondsToDHMS(seconds: number) {
//   const d = Math.floor(seconds / (3600 * 24));
//   const h = Math.floor((seconds % (3600 * 24)) / 3600);
//   const m = Math.floor((seconds % 3600) / 60);
//   const s = Math.floor(seconds % 60);
//   return { d, h, m, s };
// }

// function SecondsToString({ seconds }: { seconds: number }) {
//   const { d, h, m, s } = secondsToDHMS(seconds);
//   return (
//     <>
//       {d !== 0 && (
//         <span>
//           {d}d
//         </span>
//       )}
//       {h !== 0 && (
//         <span>
//           {h}h
//         </span>
//       )}
//       {m !== 0 && (
//         <span>
//           {m}m
//         </span>
//       )}
//       {s !== 0 && (
//         <span>
//           {s}s
//         </span>
//       )}
//     </>
//   );
// }

export interface StakingPanelProps {
  description?: React.ReactNode;
  headerAction?: React.ReactNode;
  stakeTitle: string;
}

export const StakingPanel: React.FC<StakingPanelProps> = ({
  stakeTitle,
}) => {
  const { currentTime } = useDataContext()

  // console.log({
  //   currentTime
  // })

  // const { breakpoints } = useTheme();
  // const xsm = useMediaQuery(breakpoints.up('xsm'));
  const { t} = useTranslation();
  
  return (
    <Paper sx={{ p: { xs: 4, xsm: 6 }, pt: 4, height: '100%', borderRadius: '8px' }}>
      <Box
        sx={{
          display: { xsm: 'flex' },
          alignItems: 'center',
          mb: 8,
        }}
      >
        <Typography variant="h3">
          {/* {t(`Stake`)}  */}
          Stake {stakeTitle}
        </Typography>
      </Box> 
      
      <PoolsList />


    </Paper>
  );
};
