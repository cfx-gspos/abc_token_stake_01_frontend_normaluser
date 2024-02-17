import { useTheme, Box, useMediaQuery, Container } from '@mui/material';
import React, { ReactNode, useEffect, useState } from 'react'; 
import { AppHeaderTop } from './AppHeaderTop';
import { Footer } from './Footer';

export function MainLayout({ children }: { children: ReactNode }) {
  const theme = useTheme();
  // const [pathName, setPathName] = useState('');
  // useEffect(() => {
  //   var pathname = window.location.pathname;
  //   setPathName(pathname);
  // })
  const { breakpoints } = useTheme();
  const _sm = useMediaQuery(breakpoints.down('sm'));

  // useEffect(()=>{
  //   console.log('CommonABI--------',CommonABI)
  //   console.log('ReInvestPool--------',ReInvestPoolABI)
  // },[])

  const isMobile = useMediaQuery('(max-width:1204px)');
  return (
    <Box sx={(theme) => ({
      // height: headerHeight,
      // position: 'sticky',
      // top: 0,
      // transition: theme.transitions.create('top'),
      // zIndex: theme.zIndex.appBar,
      // bgcolor: theme.palette.background.header,
      // padding: {
      //   xs: mobileMenuOpen || walletWidgetOpen ? '8px 20px' : '8px 8px 8px 20px',
      //   xsm: '8px 20px',
      // },
      // gap:'12px',
      display: 'flex',
      justifyContent: 'space-between'
    })}>

      {/* <Box sx={{
        display: _sm ? 'none' : 'flex', 
        justifyContent: 'space-between',
        flexDirection: 'column',
        // mb: { xs: 3, xsm: 4 },
        width: '220px',
        height: '100vh',
        bgcolor: 'background.paper',
        position: 'fixed',
        top: '0',
        left: '0'
      }}>
        <AppHeaderLeft />
      </Box> */}

      <Box component="main" className='abc-main' sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 'calc(100% - 0px)',
        minHeight: '100%'
      }}>
        {!isMobile && (
          <>  <div className="right-bg-r"></div>
            <div className="right-bg-l"></div></>
        )}

        <AppHeaderTop />
        <Container className='abc-main-wrap'>{children}</Container>
        <Footer />
      </Box>
    </Box>
  );
}
