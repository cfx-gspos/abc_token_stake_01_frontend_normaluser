import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import {
  Box,
  Button,
  Container, 
  Slide,
  SvgIcon,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import React, { useMemo, useState } from "react"; 
import { textCenterEllipsis } from "../utils/text-center-ellipsis";
import makeBlockie from "ethereum-blockies-base64";
import { Avatar, AvatarSize } from "../utils/Avatar";
import { BadgeSize, ExclamationBadge } from "../utils/ExclamationBadge";
import { AppHeadMenu } from "./AppHeadMenu";
import { AppLanguage } from "./AppLanguage";
import { Link } from "../components/primitives/Link";
import { NavItems } from "./NavItems";
import { useWeb3React } from "@web3-react/core";
import { useWeb3Store } from "../store/web3Slice";
import { useTranslation } from "react-i18next";

interface Props {
  children: React.ReactElement;
}

function HideOnScroll({ children }: Props) {
  const { breakpoints } = useTheme();
  const md = useMediaQuery(breakpoints.down("md"));
  const trigger = useScrollTrigger({ threshold: md ? 160 : 80 });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export const AppHeaderTop = () => {
  //  const { connector, chainId, account, isActive, provider } = useWeb3React()
  // const { disconnectWallet, chainId, connected, account } = useWeb3Store(
  //   (state) => ({
  //     disconnectWallet: state.disconnectWallet,
  //     chainId: state.chainId,
  //     connected: state.connected,
  //     account: state.account,
  //   })
  // );

  const { account:ethAccount } = useWeb3React()
  const { fluentWeb3Context,browserWeb3Context } = useWeb3Store()
  const app_connect_wallet = typeof window !== "undefined" && localStorage.getItem('app_connect_wallet');
  const account = app_connect_wallet == 'fluent' ? fluentWeb3Context?.account : app_connect_wallet == 'browser' ? browserWeb3Context?.account : ethAccount 
 // const chainId = app_connect_wallet == 'fluent' ? fluentWeb3Context?.chainId : app_connect_wallet == 'browser' ? browserWeb3Context?.chainId : ethChainId


  const { t} = useTranslation();

  const setWalletModalOpen = useWeb3Store((state) => state.setWalletModalOpen);
  // const disconnectWallet = useWeb3Store(state => state.disconnectWallet)

  // const { breakpoints, palette } = useTheme();
  // const md = useMediaQuery(breakpoints.down('md'));

  const fallbackImage = useMemo(
    () => (account ? makeBlockie(account) : undefined),
    [account]
  );

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [openLg, setOpenLg] = useState(false);
  const [openWallet, setOpenWallet] = useState(false);
  const [languageVal, setLanguageVal] = useState('English');
  const handleLanguageClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setOpenLg(true);
    setAnchorEl(event.currentTarget);
  };

  const handleWalletClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!account) {
      setWalletModalOpen(true);
    } else {
      setOpenWallet(true);
      setAnchorEl(event.currentTarget);
    }
  };

  const headerHeight = 80;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // const { breakpoints } = useTheme();
  // const downToSM = useMediaQuery(breakpoints.down(1024));
  // const md = useMediaQuery(breakpoints.down('md'));
  // const downToSM = useMediaQuery(breakpoints.down('sm'));
  const isMobile = useMediaQuery('(max-width:1204px)');

  return (
    <>
      {
        !isMobile && (
          <>
            {/* <HideOnScroll> */}
            <Box className="top-header"
              component="header"
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              sx={(theme) => ({
                height: headerHeight,
                // position: "sticky",
                top: 0,
                transition: theme.transitions.create("top"),
                zIndex: theme.zIndex.appBar,
                // bgcolor: theme.palette.background.header,
                padding: {
                  xs:
                    mobileMenuOpen
                      ? "8px 20px"
                      : "8px 8px 8px 20px",
                  xsm: "8px 20px",
                },
                display: "flex",
                alignItems: "center",
                flexDirection: "space-between",
                // boxShadow: "inset 0px -1px 0px rgba(242, 243, 247, 0.16)",
              })}
            >
              <Box
                component={Link}
                href="/"
                aria-label="Go to homepage"
                sx={{
                  lineHeight: 0,
                  mr: 3,
                  transition: "0.3s ease all",
                  "&:hover": { opacity: 0.7 },
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <img src={'/logo@2x.png'} alt="An SVG of an eye" height={36} />
              </Box>


              <Box sx={{
                // display: { xs: "none", md: "block" },
                display: { md: "block" },
                marginLeft: '30px',
              }}>
                <NavItems />
              </Box>

              <Box sx={{ flexGrow: 1 }} />

              <Container
                className="header-button"
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  flexDirection: "row",
                  paddingTop: "0",
                  paddingBottom: "0",
                  height: "80px",
                  gap: "12px",
                }}
              >
                {/* <Button sx={{
            width: '214px',
            height: '60px',
            color: '#ffffff',
            fontSize: '14px',
            backgroundImage: 'url(/icons/bg/claim-reward.png)',
            justifyContent: 'flex-start',
            paddingLeft: '20px'
        }}>
            Claim Your Reward
        </Button> */}

                {/* <Button
                  aria-label="language"
                  id="language-button"
                  aria-controls={openLg ? "language-button" : undefined}
                  aria-expanded={openLg ? "true" : undefined}
                  onClick={handleLanguageClick}
                  aria-haspopup="true"
                  sx={{
                    color: "#2C70F4",
                    borderRadius: "40px",
                    backgroundColor: "rgb(87,26,255,0.08)",
                    height: "40px",
                    width: "140px",
                    gap: "4px",
                    fontSize: "14px",
                    "&:hover": {
                      backgroundColor: "rgb(87,26,255,0.08)",
                    },
                  }}
                  startIcon={
                    <img
                      src="/icons/menu/language.svg"
                      height={"20px"}
                      width={"20px"}
                      alt=""
                    />
                  }
                  endIcon={
                    <img
                      src="/icons/menu/chevronDownIcon.svg"
                      height={"12px"}
                      width={"12px"}
                      alt=""
                    />
                  }
                >
                  {languageVal}
                </Button> */}

                <Button
                  aria-label="wallet"
                  id="wallet-button"
                  aria-controls={openWallet ? "wallet-button" : undefined}
                  aria-expanded={openWallet ? "true" : undefined}
                  onClick={handleWalletClick}
                  aria-haspopup="true"
                  sx={{
                    color: "#ffffff",
                    borderRadius: "40px",
                    backgroundColor: "rgb(44,112,244,0.8)",
                    height: "40px",
                    minWidth: "140px",
                    gap: "0px",
                    fontSize: "14px",
                    "&:hover": {
                      backgroundColor: "rgb(44,112,244,1)",
                    },
                  }}
                  startIcon={
                    !account ? (
                      <svg
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="7011"
                        width="20"
                        height="20"
                      >
                        <path
                          d="M864 896H160c-52.8 0-96-43.2-96-96V224c0-52.8 43.2-96 96-96h704c52.8 0 96 43.2 96 96v64c0 17.6-14.4 32-32 32s-32-14.4-32-32v-64c0-17.6-14.4-32-32-32H160c-17.6 0-32 14.4-32 32v576c0 17.6 14.4 32 32 32h704c17.6 0 32-14.4 32-32v-64c0-17.6 14.4-32 32-32s32 14.4 32 32v64c0 52.8-43.2 96-96 96z"
                          fill="#ffffff"
                          p-id="7012"
                        ></path>
                        <path
                          d="M768 544h-32c-17.6 0-32-14.4-32-32s14.4-32 32-32h32c17.6 0 32 14.4 32 32s-14.4 32-32 32z"
                          fill="#ffffff"
                          p-id="7013"
                        ></path>
                        <path
                          d="M928 640H672c-52.8 0-96-43.2-96-96v-64c0-52.8 43.2-96 96-96h256c17.6 0 32 14.4 32 32v192c0 17.6-14.4 32-32 32zM672 448c-17.6 0-32 14.4-32 32v64c0 17.6 14.4 32 32 32h224v-128H672z"
                          fill="#ffffff"
                          p-id="7014"
                        ></path>
                      </svg>
                    ) : (
                      <Avatar
                        fallbackImage={fallbackImage}
                        loading={false}
                        badge={<ExclamationBadge size={BadgeSize.SM} />}
                        invisibleBadge={true}
                        size={AvatarSize.SM}
                        sx={{
                          ".MuiAvatar-img": {
                            borderRadius: "50%",
                          },
                        }}
                      />
                    )
                  }
                  endIcon={
                    account && (
                      <SvgIcon
                        sx={{
                          display: { xs: "none", md: "block" },
                        }}
                      >
                        {openWallet ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      </SvgIcon>
                    )
                  }
                >
                  {account ? (
                    <>{textCenterEllipsis(account, 4, 4)}</>
                  ) : (
                    <>{t('Connect Wallet')}</>
                  )}
                </Button>
              </Container>
            </Box>
            {/* </HideOnScroll> */}

            <AppLanguage
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              openLg={openLg}
              setOpenLg={setOpenLg}
              setLanguageVal={setLanguageVal}
            />

            <AppHeadMenu
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              openWallet={openWallet}
              setOpenWallet={setOpenWallet}
              setWalletModalOpen={setWalletModalOpen}
            />
          </>
        )
      }
      {
        isMobile && (
          <div style={{}}>
            <Box className="top-header"
              component="header"
              sx={(theme) => ({
                height: headerHeight,
                top: 0,
                transition: theme.transitions.create("top"),
                zIndex: theme.zIndex.appBar,
                // bgcolor: theme.palette.background.header,
                padding: {
                  xs:
                    mobileMenuOpen
                      ? "8px 20px"
                      : "8px 8px 8px 16px",
                  xsm: "8px 16px",
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
                // boxShadow: "inset 0px -1px 0px rgba(242, 243, 247, 0.16)",
              })}
            >
              <Box
                component={Link}
                href="/"
                aria-label="Go to homepage"
                sx={{
                  lineHeight: 0,
                  mr: 3,
                  transition: "0.3s ease all",
                  "&:hover": { opacity: 0.7 },
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <img src={'/logo.png'} alt="An SVG of an eye" height={36} />
              </Box>


              <Box sx={{
                // display: { xs: "none", md: "block" }, 
                marginLeft: '0px',
              }}>
                <NavItems />
              </Box>
            </Box>



            <Container
              className="header-button"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                flexDirection: "row",
                paddingTop: "0",
                paddingBottom: "0",
                height: "80px",
                gap: "8px",
              }}
            >

              {/* <Button
                aria-label="language"
                id="language-button"
                aria-controls={openLg ? "language-button" : undefined}
                aria-expanded={openLg ? "true" : undefined}
                onClick={handleLanguageClick}
                aria-haspopup="true"
                sx={{
                  color: "#2C70F4",
                  borderRadius: "40px",
                  backgroundColor: "rgb(87,26,255,0.08)",
                  height: "40px",
                  width: "140px",
                  gap: "4px",
                  fontSize: "14px",
                  "&:hover": {
                    backgroundColor: "rgb(87,26,255,0.08)",
                  },
                }}
                startIcon={
                  <img
                    src="/icons/menu/language.svg"
                    height={"20px"}
                    width={"20px"}
                    alt=""
                  />
                }
                endIcon={
                  <img
                    src="/icons/menu/chevronDownIcon.svg"
                    height={"12px"}
                    width={"12px"}
                    alt=""
                  />
                }
              >
                {languageVal}
              </Button> */}

              <Button
                aria-label="wallet"
                id="wallet-button"
                aria-controls={openWallet ? "wallet-button" : undefined}
                aria-expanded={openWallet ? "true" : undefined}
                onClick={handleWalletClick}
                aria-haspopup="true"
                sx={{
                  color: "#ffffff",
                  borderRadius: "40px",
                  backgroundColor: "rgb(44,112,244,0.8)",
                  height: "40px",
                  minWidth: "140px",
                  gap: "0px",
                  fontSize: "14px",
                  "&:hover": {
                    backgroundColor: "rgb(44,112,244,1)",
                  },
                }}
                startIcon={
                  !account ? (
                    <svg
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="7011"
                      width="20"
                      height="20"
                    >
                      <path
                        d="M864 896H160c-52.8 0-96-43.2-96-96V224c0-52.8 43.2-96 96-96h704c52.8 0 96 43.2 96 96v64c0 17.6-14.4 32-32 32s-32-14.4-32-32v-64c0-17.6-14.4-32-32-32H160c-17.6 0-32 14.4-32 32v576c0 17.6 14.4 32 32 32h704c17.6 0 32-14.4 32-32v-64c0-17.6 14.4-32 32-32s32 14.4 32 32v64c0 52.8-43.2 96-96 96z"
                        fill="#ffffff"
                        p-id="7012"
                      ></path>
                      <path
                        d="M768 544h-32c-17.6 0-32-14.4-32-32s14.4-32 32-32h32c17.6 0 32 14.4 32 32s-14.4 32-32 32z"
                        fill="#ffffff"
                        p-id="7013"
                      ></path>
                      <path
                        d="M928 640H672c-52.8 0-96-43.2-96-96v-64c0-52.8 43.2-96 96-96h256c17.6 0 32 14.4 32 32v192c0 17.6-14.4 32-32 32zM672 448c-17.6 0-32 14.4-32 32v64c0 17.6 14.4 32 32 32h224v-128H672z"
                        fill="#ffffff"
                        p-id="7014"
                      ></path>
                    </svg>
                  ) : (
                    <Avatar
                      fallbackImage={fallbackImage}
                      loading={false}
                      badge={<ExclamationBadge size={BadgeSize.SM} />}
                      invisibleBadge={true}
                      size={AvatarSize.SM}
                      sx={{
                        ".MuiAvatar-img": {
                          borderRadius: "50%",
                        },
                      }}
                    />
                  )
                }
                endIcon={
                  account && (
                    <SvgIcon
                      sx={{
                        display: { xs: "none", md: "block" },
                      }}
                    >
                      {openWallet ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </SvgIcon>
                  )
                }
              >
                {account ? (
                  <>{textCenterEllipsis(account, 4, 4)}</>
                ) : (
                  <>{t('Connect Wallet')}</>
                )}
              </Button>
            </Container>

            <AppLanguage
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              openLg={openLg}
              setOpenLg={setOpenLg}
              setLanguageVal={setLanguageVal}
            />

            <AppHeadMenu
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              openWallet={openWallet}
              setOpenWallet={setOpenWallet}
              setWalletModalOpen={setWalletModalOpen}
            />
          </div>
        )
      }

    </>
  );
};
 