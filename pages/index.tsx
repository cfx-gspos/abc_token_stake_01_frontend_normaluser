import { ContentContainer } from "@/src/components/primitives/ContentContainer";
import { StakingHeader } from "@/src/components/staking/StakingHeader";
import { StakingPanel } from "@/src/components/staking/StakingPanel";
import { MainLayout } from "@/src/layouts/MainLayout";
import { Box, Grid, Typography } from "@mui/material";

export default function Pools() { 
  
  return <>
    <MainLayout>

      <StakingHeader tvl={'3000'} stkEmission={'1500'} loading={false} />

      <ContentContainer>
        <>

          <Grid className="abc-grid"
            item
            xs={12}
            lg={12}
            sx={{
              display: 'block',
            }}
          >

            <StakingPanel
              stakeTitle="ABC"
            />
          </Grid>

        </>

      </ContentContainer>


    </MainLayout>
  </>
}

