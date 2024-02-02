import {
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  SvgIcon,
  Typography,
} from "@mui/material";
import { CHAINS, ConnectChainID } from "@/src/libs/chains"; 
import { Avatar, AvatarSize } from "@/src/utils/Avatar";
import { textCenterEllipsis } from "../utils/text-center-ellipsis";
import makeBlockie from "ethereum-blockies-base64";
import { useMemo } from "react"; 
import { useWeb3React } from "@web3-react/core";
import { useWeb3Store } from "../store/web3Slice";
import { useTranslation } from "react-i18next";

interface HeadMenuProps {
  anchorEl: Element | null;
  setAnchorEl: (value: Element | null) => void;
  openWallet: boolean;
  setOpenWallet: (value: boolean) => void;
  setWalletModalOpen: (value: boolean) => void;
}

export const AppHeadMenu = ({
  anchorEl,
  setAnchorEl,
  openWallet,
  setOpenWallet,
  setWalletModalOpen,
}: HeadMenuProps) => {

  const { t} = useTranslation();
  
  const { disconnectWallet} =  useWeb3Store();

  const { chainId:ethChainId, account:ethAccount, provider, connector } = useWeb3React()
  const { fluentWeb3Context } = useWeb3Store()
  const app_connect_wallet = typeof window !== "undefined" && localStorage.getItem('app_connect_wallet');
  let account=app_connect_wallet == 'fluent'?fluentWeb3Context?.account:ethAccount
  let chainId=app_connect_wallet == 'fluent'?fluentWeb3Context?.chainId:ethChainId

  const handleWalletClose = () => {
    setOpenWallet(false);
  };

  const handleSwitchWallet = () => {
    setWalletModalOpen(true);
    handleDisconnect()
  };

  const handleDisconnect=()=>{
    disconnectWallet(connector);
    handleWalletClose();
  }

  const handleCopy = async () => {
    navigator.clipboard.writeText(account as string);
    handleWalletClose();
  };

  const fallbackImage = useMemo(
    () => (account ? makeBlockie(account) : undefined),
    [account]
  );

  return (
    <>
      <Menu
        id="wallet-menu"
        MenuListProps={{
          "aria-labelledby": "wallet-button",
          className: "abc-menulist",
        }}
        anchorEl={anchorEl}
        open={openWallet}
        onClose={handleWalletClose}
        keepMounted={true}
        sx={{
          ".abc-menulist": {
            ".MuiMenuItem-root.Mui-disabled": { opacity: 1 },
            backgroundColor: "#ffffff",
            padding: "10px",
          },
        }}
      >
        <>
          <Box   
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "100%",
              marginTop: "6px",
              fontSize:'0.875rem',
              letterSpacing:'0.009375rem',
              fontWeight:'600'
            }}
          >
            <Avatar
              fallbackImage={fallbackImage}
              loading={false}
              invisibleBadge={true}
              size={AvatarSize.LG}
              sx={{
                ".MuiAvatar-img": {
                  borderRadius: "50%",
                },
              }}
            />
            {account && <span>{textCenterEllipsis(account, 7, 4)}</span>}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              padding: "10px 0px 10px",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                padding: "0 5px",
                marginRight: "10px",
                backgroundColor: "rgba(56, 61, 81, 0.08)",
              }}
              size="small"
              onClick={handleSwitchWallet}
            >
             {t('Switch wallet')}
            </Button>
            <Button
              variant="outlined"
              sx={{
                padding: "0 5px",
                backgroundColor: "rgba(56, 61, 81, 0.08)",
              }}
              size="small"
              onClick={() => {
               handleDisconnect()
              }}
              data-cy={`disconnect-wallet`}
            >
              {t('Disconnect')}
            </Button>
          </Box>

          <Divider
            sx={{
              // borderColor: "#ffffff",
              padding: "5px 0 5px 0",
            }}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="caption">
              <>{t('Network')}</>
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyItems: "flex-end",
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  mr: 1,
                  borderRadius: "50%",
                  backgroundColor: "rgb(101, 201, 112)",
                  boxShadow:
                    "rgba(0, 0, 0, 0.05) 0px 2px 1px, rgba(0, 0, 0, 0.25) 0px 0px 1px",
                }}
              />

              <Typography variant="caption">
                {chainId && chainId == ConnectChainID ? (
                  <>{CHAINS[chainId].name}</>
                ) : (
                  <>unknown chainId: {chainId}</>
                )}
              </Typography>
            </Box>
          </Box>

          {/* <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: 1,
                }}
              >
                <Typography variant="caption" color={"#FFFFFFB2"}>
                  <>Assets</>
                </Typography>
              </Box>
              <Divider
                sx={{
                  borderColor: "#ffffff",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      gap: "10px",
                    }}
                  >
                    <TokenIcon
                      symbol={"eth"}
                      sx={{ width: "24px", height: "24px" }}
                    />
                    <Typography noWrap>ETH</Typography>
                  </Box>
                  <Box>
                    <Typography noWrap>0.0</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      gap: "10px",
                    }}
                  >
                    <TokenIcon
                      symbol={"ad"}
                      sx={{ width: "24px", height: "24px" }}
                    />
                    <Typography noWrap>AD</Typography>
                  </Box>
                  <Box>
                    <Typography noWrap>0.0</Typography>
                  </Box>
                </Box>
              </Box>
            </Box> */}

          <Divider
            sx={{
              // borderColor: "#ffffff",
              margin: "10px 0 10px 0",
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              marginTop:'10px'
            }}
            onClick={handleCopy}
          >
            <ListItemIcon
              sx={{
                minWidth: "22px",
              }}
            >
              <SvgIcon fontSize="small">
                <svg
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4666"
                  width="20"
                  height="20"
                >
                  <path
                    d="M761.088 715.3152a38.7072 38.7072 0 0 1 0-77.4144 37.4272 37.4272 0 0 0 37.4272-37.4272V265.0112a37.4272 37.4272 0 0 0-37.4272-37.4272H425.6256a37.4272 37.4272 0 0 0-37.4272 37.4272 38.7072 38.7072 0 1 1-77.4144 0 115.0976 115.0976 0 0 1 114.8416-114.8416h335.4624a115.0976 115.0976 0 0 1 114.8416 114.8416v335.4624a115.0976 115.0976 0 0 1-114.8416 114.8416z"
                    p-id="4667"
                    fill="#5F6A7F"
                  ></path>
                  <path
                    d="M589.4656 883.0976H268.1856a121.1392 121.1392 0 0 1-121.2928-121.2928v-322.56a121.1392 121.1392 0 0 1 121.2928-121.344h321.28a121.1392 121.1392 0 0 1 121.2928 121.2928v322.56c1.28 67.1232-54.1696 121.344-121.2928 121.344zM268.1856 395.3152a43.52 43.52 0 0 0-43.8784 43.8784v322.56a43.52 43.52 0 0 0 43.8784 43.8784h321.28a43.52 43.52 0 0 0 43.8784-43.8784v-322.56a43.52 43.52 0 0 0-43.8784-43.8784z"
                    p-id="4668"
                    fill="#5F6A7F"
                  ></path>
                </svg>
              </SvgIcon>
            </ListItemIcon>
            <ListItemText style={{color:'#5F6A7F'}}>
              <>{t('Copy address')}</>
            </ListItemText>
          </Box>

          {CHAINS[Number(chainId)] && (
            <a
              target={"_blank"}
              href={`${
                (CHAINS[Number(chainId)].blockExplorerUrls as string[])[0]
              }/address/${account as string}`}
            >
              <Box
                sx={{
                  alignItems: "center",
                  cursor: "pointer",
                  display: "flex",
                }}
                onClick={handleWalletClose}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "22px",
                  }}
                >
                  <SvgIcon fontSize="small">
                    <svg
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="8461"
                      width="20"
                      height="20"
                    >
                      <path
                        d="M762.38 19.59L430.31 351.68l65.82 65.82 266.25-266.28 127.5 127.5-266.27 266.25 65.82 65.82 332.09-332.07zM292.74 875.86l-127.47-127.5 266.25-266.25-65.82-65.82L33.63 748.36l259.11 259.14 332.07-332.09-65.82-65.82z"
                        p-id="8462"
                        fill="#5F6A7F"
                      ></path>
                      <path
                        d="M368.925 606.364L620.39 354.898l65.817 65.817-251.466 251.466z"
                        p-id="8463"
                        fill="#5F6A7F"
                      ></path>
                    </svg>
                  </SvgIcon>
                </ListItemIcon>
                <ListItemText  style={{color:'#5F6A7F'}}>
                <>{t('View on Explorer')}</>
                </ListItemText>
              </Box>
            </a>
          )}
        </>
      </Menu>
    </>
  );
};
